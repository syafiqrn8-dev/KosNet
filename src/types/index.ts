// ───────────────────────────────────────────
// KosNet — Enum & Tipe Global
// Dokumen 04 — Diagram Teknis Bagian 4
// ───────────────────────────────────────────

export type GenderType = "pria" | "wanita" | "campur";

export type ListingStatus =
  "draft" | "menunggu_verifikasi" | "revisi" | "tayang" | "ditolak" | "nonaktif" | "suspend";

export type RoomStatus = "tersedia" | "dikunci" | "terisi";

export type ReviewStatus = "menunggu_validasi" | "tayang" | "ditolak";

export type BoostStatus = "menunggu_bukti" | "menunggu_validasi" | "aktif" | "selesai" | "ditolak";

export type ProofKind = "foto_survey" | "kwitansi" | "bukti_menempati";

export type ReportTargetType = "listing" | "review" | "user";

// ─── Type helpers ───

export type RoomStatusColor = "info" | "warning" | "danger";

export const ROOM_STATUS_MAP: Record<RoomStatus, { label: string; color: RoomStatusColor }> = {
  tersedia: { label: "Tersedia", color: "info" },
  dikunci: { label: "Dikunci", color: "warning" },
  terisi: { label: "Terisi", color: "danger" },
};

export const FACILITY_LABELS: Record<string, string> = {
  ac: "AC",
  wifi: "WiFi",
  km_dalam: "KM Dalam",
  parkir: "Parkir",
  dapur: "Dapur",
  laundry: "Laundry",
  listrik_include: "Listrik Include",
};

// Warna fasilitas per dokumen 03 §1.1 — hex langsung untuk badge konsisten
export const FACILITY_COLORS: Record<string, string> = {
  ac: "#16a34a",
  wifi: "#3b82f6",
  km_dalam: "#f59e0b",
  parkir: "#f59e0b",
  dapur: "#3b82f6",
  laundry: "#f59e0b",
  listrik_include: "#dc2626",
};

// ─── Label helper ───

export const GENDER_LABEL: Record<GenderType, string> = {
  pria: "Pria",
  wanita: "Wanita",
  campur: "Campur",
};

export const FACILITY_BADGE_COLORS: Record<string, string> = {
  ac: "bg-[#16a34a]/20 text-[#16a34a]",
  wifi: "bg-[#3b82f6]/20 text-[#3b82f6]",
  km_dalam: "bg-[#f59e0b]/20 text-[#f59e0b]",
  parkir: "bg-[#f59e0b]/20 text-[#f59e0b]",
  dapur: "bg-[#3b82f6]/20 text-[#3b82f6]",
  laundry: "bg-[#f59e0b]/20 text-[#f59e0b]",
  listrik_include: "bg-[#dc2626]/20 text-[#dc2626]",
};
