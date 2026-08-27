import { cn } from "@/lib/utils";
import { SearchX } from "lucide-react";

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn("flex flex-col items-center justify-center gap-3 py-16 text-center", className)}
    >
      <div className="bg-muted/20 text-muted flex size-16 items-center justify-center rounded-full">
        {icon ?? <SearchX className="size-8" />}
      </div>
      <h3 className="text-secondary text-[17px] font-semibold">{title}</h3>
      <p className="text-muted max-w-xs text-[13px]">{description}</p>
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
