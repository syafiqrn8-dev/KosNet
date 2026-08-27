import { cn } from "@/lib/utils";
import { MessageCircle } from "lucide-react";

export interface WAButtonProps {
  phoneNumber: string;
  message?: string;
  className?: string;
  disabled?: boolean;
}

export function WAButton({ phoneNumber, message, className, disabled = false }: WAButtonProps) {
  const cleaned = phoneNumber.replace(/[^0-9]/g, "");
  // Konversi nomor lokal Indonesia (0xxx) ke format internasional (62xxx)
  const international = cleaned.startsWith("0") ? `62${cleaned.slice(1)}` : cleaned;
  const waUrl = `https://wa.me/${international}${
    message ? `?text=${encodeURIComponent(message)}` : ""
  }`;

  const classes = cn(
    "inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-[--color-wa] text-sm font-medium text-white whitespace-nowrap transition-all hover:bg-[--color-wa]/90 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[--color-wa]/50 disabled:pointer-events-none disabled:opacity-50 h-9 px-4",
    className,
  );

  if (disabled) {
    return (
      <span className={classes}>
        <MessageCircle className="size-5" />
        Chat WhatsApp Pemilik
      </span>
    );
  }

  return (
    <a href={waUrl} target="_blank" rel="noopener noreferrer" className={classes}>
      <MessageCircle className="size-5" />
      Chat WhatsApp Pemilik
    </a>
  );
}
