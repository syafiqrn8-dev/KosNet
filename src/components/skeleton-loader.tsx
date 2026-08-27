import { cn } from "@/lib/utils";

export interface SkeletonLoaderProps {
  className?: string;
  variant?: "card" | "text" | "avatar";
}

export function SkeletonLoader({ className, variant = "text" }: SkeletonLoaderProps) {
  if (variant === "card") {
    return (
      <div className="bg-card animate-pulse rounded-[--radius-lg] ring-1 ring-[--border]">
        <div className="bg-muted/30 aspect-[4/3] rounded-t-[--radius-lg]" />
        <div className="space-y-2.5 p-3">
          <div className="bg-muted/30 h-4 w-3/4 rounded" />
          <div className="bg-muted/20 h-3 w-1/2 rounded" />
          <div className="bg-muted/30 h-4 w-1/3 rounded" />
          <div className="flex gap-1.5">
            <div className="bg-muted/20 h-5 w-10 rounded-full" />
            <div className="bg-muted/20 h-5 w-10 rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  if (variant === "avatar") {
    return (
      <div className={cn("flex items-center gap-3", className)}>
        <div className="bg-muted/30 size-10 animate-pulse rounded-full" />
        <div className="flex-1 space-y-1.5">
          <div className="bg-muted/30 h-3 w-1/3 rounded" />
          <div className="bg-muted/20 h-3 w-1/2 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className={cn("bg-muted/30 animate-pulse rounded", className)} style={{ height: "1em" }} />
  );
}
