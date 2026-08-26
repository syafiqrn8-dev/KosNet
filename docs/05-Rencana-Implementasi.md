# Rencana Implementasi Engineering — KosNet

**Versi:** 1.0 · **Tanggal:** 2026-08-26 · **Prasyarat:** PRD v0.2, Arsitektur §7 (keputusan final), Sistem Desain, Diagram Teknis — semua disetujui

Dokumen ini menjembatani dokumen perencanaan (01–04) dengan eksekusi build. Isinya: keputusan engineering yang sudah disepakati, workflow Git, CI/CD & static analysis, strategi pengujian, dan roadmap fase bertahap.

---

## 1. Keputusan Engineering (disetujui)

| Topik             | Keputusan                                                                                                                                                                                                                    |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Lokasi repo       | Folder `KosNet - Project` (OneDrive) — risiko sinkronisasi dimitigasi `.gitignore` ketat (`node_modules/`, `.next/`, coverage, cache). Jika muncul lock error OneDrive: hentikan sinkronisasi sesaat saat operasi git berat. |
| Remote            | `https://github.com/syafiqrn8-dev/KosNet.git` — push dilakukan manual oleh owner.                                                                                                                                            |
| Package manager   | **npm** (lockfile `package-lock.json` di-commit).                                                                                                                                                                            |
| Runtime           | Node.js 24 LTS (terpasang v24.14.0). CI memakai versi Node yang sama.                                                                                                                                                        |
| Framework         | Next.js versi stable terbaru saat scaffold (App Router, `src/`, TypeScript strict).                                                                                                                                          |
| UI                | Tailwind CSS + shadcn/ui. Token visual mengikuti dokumen 03 tanpa deviasi.                                                                                                                                                   |
| Static analysis   | ESLint (flat config) + `tsc --noEmit` + Prettier + **CodeQL** (GitHub Advanced Security, gratis untuk repo publik).                                                                                                          |
| Unit test         | Vitest + React Testing Library. E2E (Playwright) ditunda sampai alur inti stabil (fase 10).                                                                                                                                  |
| Git hooks         | Husky + lint-staged: pre-commit = prettier + eslint pada file yang berubah.                                                                                                                                                  |
| Layanan eksternal | Belum tersedia (Supabase/Vercel/R2/Resend) → fase awal _local-first_: scaffold, design system, skema migrasi, dan test berjalan tanpa akun eksternal. Env vars menyusul via `.env.example`.                                  |

### 1.1 Keputusan Desain Tambahan (melengkuki Arsitektur §7)

1. **Brand final: KosNet.** (PRD §1 menulis "KosConnect" — dianggap nama lama.)
2. **Dual role pencari+penyedia:** kemampuan penyedia ditentukan oleh keberadaan baris `provider_profiles` milik user; `users.role` hanya menyimpan `pencari` (default) / `admin` / `superadmin`. Tanpa perubahan skema ERD. _(Mengamendemen kontrak enum `user_role` di dokumen 04 Bagian 4 — nilai `penyedia` tidak lagi dipakai sebagai isi kolom.)_
3. **Boost berulang:** constraint unik pada `boosts.listing_id` dibuat sebagai **partial unique index** — unik hanya untuk status `menunggu_bukti | menunggu_validasi | aktif`; riwayat boost `selesai/ditolak` boleh banyak baris per listing.
4. **Mata uang:** semua nominal rupiah disimpan **integer** (tanpa desimal), termasuk `rooms.price_override` — konsisten dengan `listings.price_monthly`.

---

## 2. Workflow Git

### 2.1 Aturan

- Branch utama: `main` — selalu dalam kondisi hijau (CI lolos).
- **Setiap perubahan/fitur = branch sendiri**, dirilis ke `main` lewat merge `--no-ff` agar batas fitur terlihat di riwayat.
- Nama branch bahasa Inggris, kebab-case, berprefiks tipe:
  - `feat/<nama-fitur>` — fitur baru
  - `fix/<nama-bug>` — perbaikan
  - `chore/<pekerjaan>` — tooling, CI, deps
  - `docs/<topik>` — dokumentasi
- Commit message **Bahasa Indonesia**, format Conventional Commits:
  - `feat(pencarian): filter rentang harga dan gender`
  - `fix(listing): validasi jumlah foto minimal 3`
  - `chore(ci): tambahkan workflow lint dan typecheck`
- Tag milestone per fase: `v0.1.0`, `v0.2.0`, … (minor naik per fase selesai).
- Push ke GitHub dilakukan owner setelah fase (atau titik aman) disepakati.

### 2.2 Definition of Done per perubahan

1. Lulus lokal: `npm run lint && npm run typecheck && npm run test && npm run build`.
2. Pre-commit hook bersih; commit mengikuti konvensi.
3. Setelah push: CI + CodeQL hijau di GitHub.
4. Direview ringan bersama owner sebelum merge ke `main`.

---

## 3. CI/CD & Static Analysis (GitHub Actions)

### 3.1 `ci.yml` — Quality Gate

Pemicu: `push` ke `main` dan semua `pull_request`.

```
jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - checkout
      - setup-node (Node 24, cache npm)
      - npm ci
      - npm run lint
      - npm run typecheck
      - npm run test        # vitest run
      - npm run build       # next build
```

Semua step wajib hijau; PR tidak boleh merge dengan CI merah.

### 3.2 `codeql.yml` — Security Scan

Pemicu: `push` ke `main`, `pull_request`, dan jadwal mingguan (`cron: weekly`). Bahasa: `javascript-typescript`. Temuan muncul di tab Security repo.

### 3.3 CD (menyusul akun siap)

- Vercel dihubungkan ke repo GitHub: deploy produksi otomatis dari `main`, preview URL untuk setiap PR (Arsitektur §7.1).
- Tidak ada workflow deploy tambahan sampai ada kebutuhan khusus.

### 3.4 README

Badge status CI + CodeQL, panduan setup lokal (prereq, install, env, migrate, dev), struktur folder ringkas, penunjuk ke `docs/`.

---

## 4. Strategi Pengujian

| Level           | Alat                                  | Cakupan awal                                                                                                                    |
| --------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Unit & komponen | Vitest + React Testing Library        | Komponen inti (ListingCard, badge status, WAButton, FilterBar), helper modul (validasi Zod, formatter harga, template pesan WA) |
| Integrasi       | Vitest (+ test DB lokal mulai fase 2) | Service modul: duplikat check, transisi status listing/review/boost                                                             |
| E2E             | Playwright (fase 10)                  | Alur kritis: cari → detail → klik WA; submit listing → verifikasi admin                                                         |

Prinsip: logika bisnis di `src/modules/*` mudah dites karena murni fungsi; komponen dites perilaku terlihat, bukan implementasi.

---

## 5. Roadmap Fase Bertahap

> Setiap fase = 1+ branch, commit granular per langkah, direview bersama sebelum lanjut. Fase boleh dipecah lagi jika terasa besar.

| #   | Fase                      | Deliverable                                                                                                                                                                                                                                    | Verifikasi                                                           |
| --- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| 0   | Fondasi Repo              | git init rapi, `docs/`, scaffold Next.js+TS+Tailwind+shadcn, ESLint/Prettier/husky, scripts, `.env.example`, README, CI + CodeQL hijau                                                                                                         | Build & CI hijau; halaman placeholder tayang lokal                   |
| 1   | Design System             | Token warna/tipografi/spacing/breakpoint (dok. 03) di Tailwind config; komponen inti: ListingCard, FacilityBadge, SpecialNote, WAButton, FilterBar, RatingStars, EmptyState, Toast, Modal Konfirmasi, UploadGambar, SkeletonLoader + unit test | Test hijau; halaman preview komponen                                 |
| 2   | Skema Database            | Migrasi SQL lengkap sesuai ERD (enum, tabel, index, partial unique boost, RLS policy) + seed master (provinces, cities, facilities_ref); keputusan Docker Desktop vs Postgres installer diambil di sini                                        | Migrasi jalan bersih dari nol; seed terverifikasi                    |
| 3   | Auth & Profil             | Supabase Auth (email/password + Google OAuth), verifikasi email, profil, role guard + middleware proteksi area                                                                                                                                 | Register/login/logout lokal; akses area terproteksi tervalidasi test |
| 4   | Listing Penyedia          | Form 3 tahap, duplikat check koordinat, upload foto (storage lokal dulu, R2 presigned menyusul), status okupansi kamar + room_status_logs                                                                                                      | Submit → status `menunggu_verifikasi`; duplikat tertolak 409         |
| 5   | Pencarian & Detail Publik | SSR/SEO (`/cari`, `/kos/[id]`), filter/sort/pagination cursor, tombol WA + pesan template, tracking klik async, cache (fallback DB jika Redis belum ada)                                                                                       | Halaman publik ter-render server-side; meta/OG benar                 |
| 6   | Favorit & Review          | Simpan/hapus favorit, ajukan review + upload bukti → `menunggu_validasi`, UNIQUE 1 review/user/kos                                                                                                                                             | Alur review tervalidasi test; review tak tayang sebelum approve      |
| 7   | Panel Admin               | Antrian: verifikasi listing, validasi review, aktivasi boost, laporan abuse; audit log transaksional; suspend user/listing                                                                                                                     | Semua keputusan admin tercatat audit_logs; cache ter-invalidate      |
| 8   | Boost Manual              | Paket 7/14/30 hari, upload bukti transfer, aktivasi admin, section "Tersorot" + ranking                                                                                                                                                        | Siklus boost penuh tervalidasi test                                  |
| 9   | Notifikasi & SEO/PWA      | Email transaksional (Resend/Brevo), notifikasi in-app, sitemap, schema.org `Accommodation`, manifest PWA                                                                                                                                       | Email stub terkirim di dev; sitemap & structured data valid          |
| 10  | Hardening                 | Rate limit, Sentry, UptimeRobot, Playwright E2E alur kritis, audit keamanan & performa                                                                                                                                                         | Laporan audit; CI+E2E hijau                                          |

**Fase 0 adalah langkah berikutnya** setelah spec ini disetujui.

---

## 6. Risiko & Mitigasi Operasional

| Risiko                                                    | Mitigasi                                                                                                                                           |
| --------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| OneDrive mengunci `.git`/`node_modules` saat sinkronisasi | `.gitignore` ketat; hindari operasi git saat status OneDrive "memproses perubahan"; opsi darurat: pause sync sesaat                                |
| Skema DB tidak bisa diuji lokal sebelum akun Supabase     | Fase 2 memutuskan Docker Desktop vs Postgres installer; migrasi tetap bisa ditulis & direview lebih awal                                           |
| Drift antara dokumen 01–04 dan kode                       | Dokumen 01–04 tidak diubah tanpa sepakat; setiap deviasi implementasi dicatat sebagai amendemen bernomor di dokumen terkait atau di commit message |
| Scope creep antar fase                                    | Fitur baru dicatat ke backlog fase berikutnya, tidak diam-diam masuk branch berjalan                                                               |

---

_Spec ini menjadi acuan eksekusi. Perubahan material atas keputusan di dokumen ini wajib lewat revisi spec (commit baru), bukan perubahan diam-diam._
