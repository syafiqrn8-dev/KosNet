import type { LucideIcon } from "lucide-react";
import { Fan, Wifi, Bath, Car, CookingPot, Shirt, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { FACILITY_LABELS } from "@/types";

const FACILITY_ICONS: Record<string, LucideIcon> = {
  ac: Fan,
  wifi: Wifi,
  km_dalam: Bath,
  parkir: Car,
  dapur: CookingPot,
  laundry: Shirt,
  listrik_include: Zap,
};

export interface FacilityBadgeProps {
  code: string;
  className?: string;
}

export function FacilityBadge({ code, className }: FacilityBadgeProps) {
  const label = FACILITY_LABELS[code] ?? code;
  const Icon = FACILITY_ICONS[code];

  return (
    <span
      className={cn(
        "bg-muted/30 text-muted-foreground inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[12px] font-medium",
        className,
      )}
    >
      {Icon && <Icon className="size-3" />}
      {label}
    </span>
  );
}
