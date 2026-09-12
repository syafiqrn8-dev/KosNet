import type { LucideIcon } from "lucide-react";
import { Fan, Wifi, Bath, Car, CookingPot, Shirt, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { FACILITY_LABELS } from "@/types";

// Ikon fasilitas
const FACILITY_ICONS: Record<string, LucideIcon> = {
  ac: Fan,
  wifi: Wifi,
  km_dalam: Bath,
  parkir: Car,
  dapur: CookingPot,
  laundry: Shirt,
  listrik_include: Zap,
};

// Warna per kategori fasilitas sesuai dokumen 03 §1.1
const FACILITY_COLORS: Record<string, string> = {
  ac: "bg-primary/20 text-primary",
  wifi: "bg-primary/20 text-primary",
  km_dalam: "bg-muted/20 text-muted",
  parkir: "bg-warning/20 text-warning",
  dapur: "bg-info/20 text-info",
  laundry: "bg-warning/20 text-warning",
  listrik_include: "bg-danger/20 text-danger",
};

export interface FacilityBadgeProps {
  code: string;
  className?: string;
}

export function FacilityBadge({ code, className }: FacilityBadgeProps) {
  const label = FACILITY_LABELS[code] ?? code;
  const Icon = FACILITY_ICONS[code];
  const colorClass = FACILITY_COLORS[code] || "bg-muted/20 text-muted-foreground";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[12px] font-medium",
        colorClass,
        className,
      )}
    >
      {Icon && <Icon className="size-3" />}
      {label}
    </span>
  );
}
