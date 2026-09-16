"use client";

import { cn } from "@/lib/utils";

export interface SkeletonLoaderProps {
  className?: string;
  variant?: "text" | "card" | "avatar";
}

export function SkeletonLoader({ className, variant = "text" }: SkeletonLoaderProps) {
  if (variant === "card") {
    return (
      <div className={cn("h-48 animate-pulse rounded-lg bg-gray-100 sm:h-64", className)}>
        <div className="h-1/4 animate-pulse rounded-t-lg bg-gray-100" />
        <div className="p-4">
          <div className="h-4 w-3/4 animate-pulse rounded bg-gray-100" />
          <div className="h-2 w-1/2 animate-pulse rounded bg-gray-100" />
          <div className="h-4 w-1/3 animate-pulse rounded bg-gray-100" />
          <div className="flex gap-2">
            <div className="h-5 w-10 animate-pulse rounded bg-gray-100" />
            <div className="h-5 w-10 animate-pulse rounded bg-gray-100" />
          </div>
        </div>
      </div>
    );
  }

  if (variant === "avatar") {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <div className="size-8 animate-pulse rounded-full bg-gray-100" />
        <div className="flex-1 space-y-1">
          <div className="h-2 w-2/3 animate-pulse rounded bg-gray-100" />
          <div className="h-2 w-1/2 animate-pulse rounded bg-gray-100" />
        </div>
      </div>
    );
  }

  // default variant — skeleton teks
  return <div className={cn("h-6 animate-pulse rounded bg-gray-100", className)} />;
}
