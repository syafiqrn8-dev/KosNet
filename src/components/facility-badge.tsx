"use client";

import { cn } from "@/lib/utils";
import { FACILITY_LABELS, FACILITY_BADGE_COLORS } from "@/types";

const FACILITY_ICONS: Record<string, React.ReactElement> = {
  ac: <i className="fi-fi-ac" />,
  wifi: <i className="fi-fi-wifi" />,
  km_dalam: <i className="fi-fi-bath" />,
  parkir: <i className="fi-fi-car" />,
  dapur: <i className="fi-fi-cooking-pot" />,
  laundry: <i className="fi-fi-shirt" />,
  listrik_include: <i className="fi-fi-zap" />,
};

// Warna fasilitas per dokumen 03 §1.1 — langsung dari FACILITY_BADGE_COLORS
const facilityColorsClasses = {
  ac: "bg-[#16a34a]/20 text-[#16a34a]",
  wifi: "bg-[#3b82f6]/20 text-[#3b82f6]",
  km_dalam: "bg-[#f59e0b]/20 text-[#f59e0b]",
  parkir: "bg-[#f59e0b]/20 text-[#f59e0b]",
  dapur: "bg-[#3b82f6]/20 text-[#3b82f6]",
  laundry: "bg-[#f59e0b]/20 text-[#f59e0b]",
  listrik_include: "bg-[#dc2626]/20 text-[#dc2626]",
};

export interface FacilityBadgeProps {
  code: string;
  className?: string;
}

export function FacilityBadge({ code, className }: FacilityBadgeProps) {
  const label = FACILITY_LABELS[code] ?? code;
  const colorClass = FACILITY_BADGE_COLORS[code] || "bg-muted/20 text-muted-foreground";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[12px] font-medium",
        colorClass,
        className,
      )}
    >
      {FACILITY_ICONS[code]}
      {label}
    </span>
  );
}
