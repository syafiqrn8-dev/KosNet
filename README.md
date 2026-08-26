# KosNet

Temukan kos dalam hitungan menit, bukan hari.

## Status

🚧 Fase 0 — Fondasi Repo (dalam pembangunan)

## Tech Stack

- [Next.js](https://nextjs.org) 16 (App Router, Turbopack) + React 19
- TypeScript strict
- Tailwind CSS v4 + shadcn/ui
- Vitest + Testing Library
- ESLint flat config + Prettier
- Husky + lint-staged (pre-commit)
- GitHub Actions CI + CodeQL

## Setup Lokal

```bash
npm install
cp .env.example .env.local   # isi variabel saat fasenya aktif
npm run dev
```

## Scripts

| Perintah             | Fungsi                       |
| -------------------- | ---------------------------- |
| `npm run dev`        | Jalankan dev server          |
| `npm run build`      | Build produksi               |
| `npm run lint`       | Lint dengan ESLint           |
| `npm run format`     | Format dengan Prettier       |
| `npm run typecheck`  | Cek tipe (`tsc --noEmit`)    |
| `npm run test`       | Jalankan semua test (Vitest) |
| `npm run test:watch` | Test dalam mode watch        |

## Dokumentasi

Spesifikasi proyek ada di folder [`docs/`](docs/):

1. PRD — kebutuhan produk
2. Arsitektur & tech stack
3. Sistem desain
4. Diagram teknis
5. Rencana implementasi (fase 0–4)

## Konvensi

- Commit mengikuti [Conventional Commits](https://www.conventionalcommits.org), pesan berbahasa Indonesia
- Branch per perubahan (chore/feat/...), merge `--no-ff` ke `main`
- Line ending: LF (lihat `.gitattributes`)
