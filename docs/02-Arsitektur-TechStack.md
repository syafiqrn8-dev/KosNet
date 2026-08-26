# Arsitektur & Tech Stack — KosConnect
**Versi:** 0.1 · **Tanggal:** 2026-08-25 · **Prasyarat:** PRD v0.1 disetujui
**Kendala desain:** solo founder, budget minim (awal ≈ Rp0/bln + domain), harus siap scale tanpa rombak besar.

---

## 1. Gaya Arsitektur: Modular Monolith (stateless)

Satu aplikasi web (frontend + API dalam satu codebase), dipisah rapi per modul domain:

```
apps/web/
├── modules/
│   ├── auth/        # registrasi, login, OAuth Google, OTP nomor HP, role
│   ├── profile/     # profil user, verifikasi WA penyedia
│   ├── listing/     # CRUD kos: foto, badge fasilitas, catatan khusus, status kamar
│   ├── search/      # pencarian + filter + sort + boost ranking
│   ├── review/      # rating & ulasan (dengan mekanisme undangan/validasi)
│   ├── favorite/    # simpan/like kos
│   ├── boost/       # paket boost, bukti transfer, aktivasi manual admin
│   ├── report/      # lapor listing/review, moderasi
│   ├── notification/# email transaksional + notifikasi in-app
│   └── admin/       # panel verifikasi, monitoring, manajemen staff
├── shared/          # util, validasi, akses DB, konfigurasi
└── (framework routing)
```

**Kenapa monolith:** satu deploy, satu log, biaya minimal, cepat dikembangkan solo. Batas antar-modul jelas → kalau nanti ada modul yang butuh scale sendiri, tinggal dipecah.

**Stateless** = server tidak menyimpan sesi/data di memori → bisa dijalankan 2+ instance di belakang load balancer kapan saja TANPA ubah kode.

---

## 2. Diagram Sistem (fase awal)

```
 [User: HP/Laptop]
        │ HTTPS
        ▼
 ┌──────────────────┐
 │ Cloudflare (DNS) │  ← CDN cache asset statis, proteksi DDoS dasar (GRATIS)
 └────────┬─────────┘
          ▼
 ┌─────────────────────────────────────┐
 │ Vercel / Railway (hosting app)      │  ← auto reverse-proxy & scaling dasar
 │  Next.js App (React SSR/API routes) │     = "load balancer" bawaan fase awal
 └───┬──────────┬──────────┬───────────┘
     ▼          ▼          ▼
 ┌────────┐ ┌────────┐ ┌──────────────┐
 │Supabase│ │ Upstash│ │Cloudflare R2 │
 │Postgres│ │ Redis  │ │(foto kos)    │
 │+ Auth  │ │(cache) │ │via CDN       │
 └────────┘ └────────┘ └──────────────┘
     │
     ▼
 Resend/Brevo (email verifikasi & notifikasi)
```

### Fase ekspansi (traffic naik) — TANPA rombak kode:
```
 Cloudflare ──► Load Balancer ──► App instance #1
                              ├─► App instance #2   (stateless: tinggal gandakan)
                              └─► App instance #N
 Database: Supabase Pro → baca berat? tambah read replica.
 Cache: Redis naik paket ($5–10/bln).
```

---

## 3. Tech Stack

| Layer | Pilihan | Alasan | Biaya awal |
|---|---|---|---|
| Bahasa | TypeScript | Satu bahasa front+back, aman dari bug tipe | Rp0 |
| Framework | Next.js (App Router) | SSR untuk SEO (penting! halaman kos harus ter-index Google), API route built-in, deploy mudah | Rp0 |
| UI | Tailwind CSS + shadcn/ui | Cepat styling responsive, komponen siap pakai | Rp0 |
| Database | PostgreSQL via **Supabase** | Free tier murah hati, managed backup, Auth included, row-level security | Rp0 |
| Auth | **Supabase Auth** (+ Google OAuth) | Email/password + OAuth gratis; OTP WA via provider SMS murah (atau ditunda ke fase 2) | Rp0 |
| Cache | **Upstash Redis** | Serverless, free tier cukup | Rp0 |
| Storage foto | **Cloudflare R2** | Gratis egress — foto banyak pun bandwidth tidak membakar biaya | Rp0 |
| Hosting | **Vercel** (alternatif: Railway/Fly.io) | Deploy otomatis dari GitHub, HTTPS, scaling dasar | Rp0 |
| Peta | Leaflet + OpenStreetMap | Gratis 100%, embed pin lokasi kos | Rp0 |
| Email | Resend atau Brevo | Free ~3rb email/bln | Rp0 |
| Domain | .id / .com | Wajib | ±Rp150–200rb/thn |
| Monitoring | Sentry (free tier) + UptimeRobot | Tahu error & downtime sebelum user komplain | Rp0 |

**Catatan SEO:** karena ini marketplace, calon user datang lewat Google ("kos murah dekat UGM" dst.) → Next.js SSR + sitemap + structured data (schema.org `Accommodation`) adalah keputusan arsitektur, bukan fitur bonus.

---

## 4. Strategi Anti-Down saat Traffic Serentak

Skenario yang kamu khawatirkan: ribuan user bersamaan membuka fitur yang sama. Pertahanannya berlapis:

1. **CDN menyerang statis dulu** — foto, JS, CSS dilayani edge Cloudflare, tidak pernah menyentuh server app.
2. **Cache hot reads di Redis** — halaman detail kos & hasil pencarian populer disimpan cache 1–5 menit. 1000 user buka kos yang sama = hanya 1 query DB.
3. **Pagination + index database** — semua endpoint list wajib paginasi (cursor-based), kolom filter (kota, gender, harga, status) di-index.
4. **Rate limiting di backend** — per IP & per user (mis. 60 req/menit), memblokir spam bot sebelum menghabiskan resource.
5. **Stateless instances** — butuh lebih banyak kapasitas? Jalankan instance kedua. Selesai.
6. **Query tulis (chat→WA click tracking, view counter)** masuk antrian ringan / async agar tidak memblokir request baca.
7. **Graceful degradation** — jika Redis down, app fallback langsung ke DB (lebih lambat tapi hidup); jika R2 lambat, gambar lazy-load dengan placeholder.

**Target kapasitas fase awal:** free tier stack ini nyaman sampai ~50–100 rb pageview/bulan dan lonjakan serentak ratusan–ribuan user membaca (berkat cache). Setelah itu biaya bertahap: Supabase $25/bln → LB + multi-instance (~$20/bln).

---

## 5. Rencana Keamanan

| Ancaman | Pertahanan |
|---|---|
| SQL injection | ORM/query builder parameterized (Drizzle/Prisma) — jangan raw query string |
| XSS | React escaping default + sanitasi input rich-text (deskripsi kos) |
| CSRF | SameSite cookies + token pada mutasi |
| Brute force login | Rate limit per IP+email, lockout progresif |
| Akun take-over | Password hashing bcrypt/argon2 (bawaan Supabase Auth), verifikasi email wajib, OTP WA penyedia *(ditunda fase awal — lihat §7)* |
| Spam listing/review bot | Verifikasi listing oleh admin sebelum tayang, review wajib bukti + validasi admin (PRD §7), rate limit, deteksi duplikat koordinat |
| DDoS | Cloudflare proxy + rate limit edge (free tier sudah termasuk) |
| Kebocoran data | Row-Level Security Postgres (user hanya bisa edit miliknya), secrets di environment variables, backup DB harian otomatis (Supabase), least-privilege API keys |
| Upload file berbahaya | Validasi tipe & ukuran gambar, re-generate gambar saat proses, nama file acak |
| Penipuan transfer luar platform | Disclaimer edukasi di UI, badge "Nomor WA terverifikasi", laporan abuse → moderasi admin |
| Admin panel | Role-based access control ketat (staff ≠ superadmin), audit log aksi admin |

Aturan praktis: **jangan pernah simpan secret di kode**, semua via env vars; dependency di-update rutin (`npm audit`); error message tidak membocorkan detail internal.

---

## 6. Estimasi Biaya per Fase Pertumbuhan

| Fase | User/listing | Infrastruktur | Biaya/bln |
|---|---|---|---|
| Build & beta | < 1rb user, < 200 listing | Semua free tier + domain | ≈ Rp0 (+domain/tahun) |
| Launch pilot | 1–10rb user | + email naik paket, mungkin Supabase Pro | Rp0 – Rp400rb |
| Tumbuh | 10–100rb user | + Redis paid, storage paid, 2nd instance | Rp500rb – 1,5jt |
| Besar | > 100rb user | LB + multi-instance, read replica, tim | Sesuai revenue boost |

Prinsip: **biaya infrastruktur selalu tertinggal di belakang pendapatan boost.**

---

## 7. Keputusan Desain (FINAL — sudah diputuskan)
1. **Hosting: Vercel** — gratis terbaik untuk frontend Next.js, cepat, auto-deploy dari GitHub.
2. **OTP nomor WA penyedia: DITUNDA** — layanan OTP berbiaya per kiriman & butuh waktu integrasi; di traffic awal belum perlu. Pengganti sementara: verifikasi listing manual oleh admin + nomor WA terlihat publik di listing.
3. **Mekanisme review: Validasi Admin dengan upload bukti** — user yang ingin me-review mengunggah bukti (foto survey/kwitansi/tanda bukti menempati) → admin validasi → review tayang. Kode undangan dari pemilik DITOLAK karena rentan curang (pemilik bisa membuat kode fiktif untuk review palsu bintang 5 → merusak trust). Alternatif lain: fitur review DITUNDA sampai ada penyewa pertama nyata.
4. **Nama produk final: KosNet**, domain awal `kosnet.vercel.app` (subdomain gratis Vercel) — upgrade ke `.com`/`.id` berbayar setelah platform mulai ramai.

---
*Langkah berikutnya (tahap 3): Sistem Desain — design tokens (warna, tipografi, spacing), komponen inti, wireframe halaman utama/pencarian/detail/dashboard.*
