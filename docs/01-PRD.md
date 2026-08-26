# KosNet — PRD
**Versi:** 0.2 · **Tanggal:** 2026-08-25 · **Status:** Tahap 1 disetujui

---

## 1. Ringkasan Produk
KosConnect adalah platform web responsive (PWA) yang menghubungkan **pencari kos** dengan **penyedia kos** di Indonesia. Pencari kos menemukan tempat tinggal sementara sesuai kriteria (harga, lokasi, gender, fasilitas) dalam hitungan menit; penyedia kos mempromosikan kosnya secara gratis dan bisa meningkatkan visibilitas lewat boost berbayar; admin menjaga kualitas & kepercayaan platform.

### Masalah yang diselesaikan
| Pihak | Masalah | Solusi |
|---|---|---|
| Pencari kos | Info kos tersebar (grup WA, spanduk, mulut ke mulut), susah membandingkan | Pencarian terstruktur: filter harga/lokasi/gender/fasilitas, foto, rating ulasan asli |
| Penyedia kos | Kamar lama terisi, promosi mahal | Listing gratis, dashboard kelola kos, boost berbayar untuk prioritas tampil |
| Admin | Listing spam/palsu merusak kepercayaan | Verifikasi listing, moderasi konten, panel monitoring |

### Visi
"Temukan kos dalam hitungan menit, bukan hari." Fase 2 berkembang menjadi ekosistem sewa end-to-end (booking online, pembayaran DP, kontrak digital).

---

## 2. Target Pengguna & Persona
1. **Rina, 19 — Mahasiswi baru (Pencari Kos).** Baru pindah kota, budget sempit, HP mid-range, internet terbatas. Butuh: filter harga maksimal, kategori khusus wanita, foto jelas, info biaya total (listrik terpisah dll).
2. **Pak Budi, 45 — Pemilik kos 10–30 kamar (Penyedia).** Tidak melek teknologi. Butuh: input listing semudah isi formulir WhatsApp, notifikasi chat, laporan kunjungan.
3. **Admin Operasional (1–3 orang awal).** Butuh: antrian verifikasi listing, moderasi review, statistik platform.

---

## 3. Ruang Lingkup MVP (Fase 1)

### 3.1 Fitur Inti — Semua User
- **Registrasi & login akun**: email/password + Google OAuth. Verifikasi email wajib.
- **Profil**: nama, foto, nomor HP (terverifikasi OTP), bio singkat.
- **Role**: `pencari` (default), `penyedia`, `admin`. Satu akun bisa punya role pencari + penyedia sekaligus.

### 3.2 Fitur Pencari Kos
- **Pencarian & discovery**: search bar (nama/nama jalan), filter (rentang harga, gender kos [pria/wanita/campur], provinsi/kota/area, fasilitas badge, tersedia/tidak), sort (termurah, terdekat, rating tertinggi, terbaru).
- **Halaman detail kos**: galeri foto, harga/bulan, deskripsi, badge fasilitas (AC, WiFi, kamar mandi dalam/dalam, parkir, dapur, dst.), catatan khusus (mis. "biaya listrik terpisah"), lokasi peta (embed map), rating & ulasan, **tombol WhatsApp ke pemilik kos** (membuka wa.me dengan pesan template otomatis), tombol simpan (like/bookmark).
- **Alur deal manual (TANPA pembayaran di platform)**: pencari klik tombol WhatsApp → survey/negosiasi langsung dengan pemilik → jika deal, PEMILIK mengubah status kos/kamar menjadi **"Terisi / Dikunci / Sudah dibooking"** dari dashboard-nya sehingga listing tidak lagi muncul sebagai tersedia.
- **Dashboard pencari**: profil, daftar kos tersimpan, riwayat ulasan yang ditulis.
- **Rating & ulasan**: bintang 1–5 + komentar teks. **Hanya untuk orang yang pernah menempati kos tersebut atau pernah survey di tempatnya** (lihat §7).
- **Notifikasi**: in-app + email (status verifikasi listing, konfirmasi boost).

### 3.3 Fitur Penyedia Kos
- **Kelola listing**: tambah/edit/nonaktifkan kos — form terstruktur: nama, alamat + pin peta, gender, jumlah kamar & kamar tersedia, harga, fasilitas (badge checklist), catatan khusus (free text), foto (min 3, max 15), aturan kos, **nomor WhatsApp aktif**, dan opsional **nomor rekening** (ditampilkan di halaman kos agar calon penghuni bisa transfer DP langsung lalu konfirmasi via WhatsApp).
- **Status okupansi manual**: ubah status kamar/kos → Tersedia / Dikunci (sudah dibooking) / Terisi, dari dashboard.
- **Dashboard penyedia**: daftar kos miliknya, statistik views & klik-WA per kos, status verifikasi, beli/kelola boost.
- **Boost/promosi**: paket durasi (mis. 7/14/30 hari) yang menaikkan posisi listing di hasil pencarian ("Tersorot"). Pembayaran **manual**: penyedia transfer ke rekening platform → konfirmasi bukti transfer (upload/chat admin) → admin aktivasi boost. Tanpa payment gateway.

### 3.4 Fitur Admin
- **Verifikasi listing**: antrian approve/reject (+alasan) sebelum listing tayang publik.
- **Moderasi**: kelola review & laporan (report abuse), suspend user/listing pelanggar.
- **Monitoring**: metrik harian (user baru, listing baru, klik-WA, revenue boost), manajemen role admin/staff, **aktivasi manual paket boost** setelah verifikasi bukti transfer.

### 3.5 Yang EKSPLISIT di luar MVP (Fase 2+, hanya jika pertumbuhan/keluhan user memintanya)
Booking online + pembayaran digital (payment gateway seperti Midtrans — butuh legalitas, ditunda), chat in-app (awal pakai WhatsApp), kontrak digital, e-KTP verification KYC penuh, mobile app native, rekomendasi AI/bot tanya-jawab, multi-bahasa (awal: **Bahasa Indonesia saja**), iklan pihak ketiga (dipasang saat platform sudah ramai).

### 3.6 Prinsip desain MVP
- Semua transaksi & negosiasi terjadi **di luar platform via WhatsApp**; platform = katalog + pencarian + reputasi + boost.
- Tidak ada integrasi AI/bot di fase awal — tambahkan nanti hanya jika keluhan user menunjukkan kebutuhan nyata.

---

## 4. Model Monetisasi (Freemium, tanpa payment gateway)
| Alur | Gratis | Berbayar |
|---|---|---|
| Listing kos | ✅ unlimited | — |
| Boost posisi pencarian ("Tersorot") | — | ✅ 7/14/30 hari |
| Badge "Terverifikasi" | manual oleh admin | ✅ otomatis via verifikasi dokumen (nanti) |
| Statistik lanjutan penyedia | dasar (views / klik-WA) | ✅ insight kompetitor, tren harga area (nanti) |

**Pembayaran boost 100% manual** (tanpa Midtrans/Xendit dulu): penyedia transfer ke rekening resmi platform → upload bukti transfer / chat admin → admin verifikasi & aktivasi boost dari panel admin. Payment gateway baru dipertimbangkan di fase berikutnya jika volume sudah besar dan badan usaha/legalitas sudah siap.

Catatan: karena calon penghuni juga bisa transfer DP langsung ke rekening milik pemilik kos (dicantumkan opsional di halaman listing), platform tidak pernah memegang uang user → menghindari kebutuhan legalitas escrow/payment.

---

## 5. KPI / Metrik Kesuksesan (6 bulan pertama)
- 500+ listing aktif terverifikasi di kota-kota pilot.
- 5.000+ MAU pencari; ≥30% listing mendapat ≥1 klik-WA.
- Median waktu dari buka app → klik tombol WhatsApp < 3 menit.
- Rating rata-rata listing ≥ 4,0; < 2% listing spam yang lolos verifikasi.

**Kota pilot**: dipilih berdasarkan kepadatan universitas (banyak mahasiswa = permintaan kos tinggi). Kandidat awal: **Yogyakarta, Bandung, Malang, Depok/Jakarta selatan, Semarang** — pilih 1–2 dulu, ekspansi hanya jika kota tersebut sudah ramai aktif.

---

## 6. Persaingan & Diferensiasi
Kompetitor: Mamikos, Rukita, Cendekia, grup FB/WA. Diferensiasi realistis untuk pemain baru: **fokus pada kota-kota universitas sampai didominasi** (density > breadth), onboarding penyedia super-sederhana (input listing seperti isi formulir biasa), informasi biaya transparan (total biaya bulanan termasuk listrik/air terpisah — fitur yang sering jadi komplain user kompetitor).

---

## 7. Aturan Anti-Spam / Anti-Abuse (kebijakan produk)
1. Listing baru masuk antrian verifikasi admin sebelum publik.
2. Rate limit aksi per user (klik-WA tracking, review, upload) di level backend.
3. **Review & rating hanya boleh dari user yang pernah menempati kos tersebut ATAU pernah survey ke kos tersebut.** Mekanisme (FINAL): user mengajukan review + **upload bukti** (foto survey/kwitansi/bukti menempati) → **admin memvalidasi** → review tayang. Kode undangan dari pemilik ditolak karena rentan manipulasi review palsu.
4. Deteksi duplikat listing (alamat + koordinat sama) saat submit.
5. Lapor (report) tersedia di setiap listing & review; antrian moderasi admin.
6. Nomor HP/WhatsApp penyedia diverifikasi OTP sebelum listing tayang. *(DITUNDA di fase awal — pengganti: verifikasi listing manual oleh admin; OTP baru diaktifkan saat traffic membutuhkannya.)*
7. Peringatan jelas di UI: semua pembayaran dilakukan langsung antara penghuni & pemilik di luar platform; platform tidak bertanggung jawab atas transaksi tersebut (disclaimer + edukasi anti-penipuan).

---

## 8. Risiko Utama
| Risiko | Mitigasi |
|---|---|
| Chicken-and-egg (kosong dua sisi) | Mulai 1–2 kota pilot, tim founder datangi kos manual untuk seeding data awal (concierge onboarding) |
| Listing palsu/spam | Verifikasi manual awal + aturan §7 |
| Penipuan transfer di luar platform | Disclaimer anti-penipuan di UI, edukasi, nomor WA pemilik terverifikasi OTP |
| Budget minim | Tech stack managed-services free-tier (lihat dokumen Arsitektur, tahap 2) |
| Kompetitor besar | Niching kota + fitur transparansi biaya |

---

## 9. Roadmap Kasar
- **Bulan 0–1:** desain UI utama + setup repo & infra dasar.
- **Bulan 1–3:** build MVP (auth, listing CRUD, search/filter, tombol WA, dashboard, admin panel, boost manual).
- **Bulan 3:** closed beta di 1 kota (seeding 50–100 kos).
- **Bulan 4–6:** public launch kota pilot, aktivasi boost manual berjalan, iterasi dari feedback.

---
*Catatan proses: dokumen ini adalah RANCANGAN saja — implementasi/build akan dilakukan terpisah di VS Code dengan bantuan AI agent lain, memakai rancangan-rancangan dari folder ini sebagai acuan.*

*Langkah berikutnya (tahap 2): Dokumen Arsitektur & Tech Stack — diagram sistem, pilihan database, strategi scalability (cache, CDN) dan rencana security.*
