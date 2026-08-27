import { cn } from "@/lib/utils";
import { Info } from "lucide-react";

export interface SpecialNoteProps {
  note: string;
  className?: string;
}

export function SpecialNote({ note, className }: SpecialNoteProps) {
  return (
    <div
      className={cn(
        "flex items-start gap-2 rounded-[--radius-md] bg-[#fef9c3] p-3 text-[13px] text-[#92400e] ring-1 ring-[--warning]/20",
        className,
      )}
    >
      <Info className="mt-0.5 size-4 shrink-0 text-[--warning]" />
      <p className="leading-relaxed">{note}</p>
    </div>
  );
}

export function SpecialNoteSkeleton() {
  return (
    <div className="bg-muted/20 flex animate-pulse items-start gap-2 rounded-[--radius-md] p-3">
      <div className="bg-muted/40 size-4 rounded-full" />
      <div className="flex-1 space-y-1.5">
        <div className="bg-muted/40 h-3 w-full rounded" />
        <div className="bg-muted/40 h-3 w-3/4 rounded" />
      </div>
    </div>
  );
}
