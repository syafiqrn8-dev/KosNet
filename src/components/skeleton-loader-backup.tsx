"use client";

import { cn } from "@/lib/utils";

export interface SkeletonLoaderProps {
  className?: string;
  variant?: "default" | "card" | "avatar";
}

// Custom animation yang lebih cepat dari default Tailwind pulse (2s)
// Animasi ini memiliki durasi 1.5s dengan kilauan yang lebih tajam
const pulseFast = "pulseFast 1.5s ease-in-out infinite";

const pulseFastKeyframes = `
  @keyframes pulseFast {
    0%, 80%, 100% {
      opacity: 1;
    }
    40% {
      opacity: 0.6;
      transform: scale(0.95);
    }
  }
`;

export function SkeletonLoader({ className, variant = "default" }: SkeletonLoaderProps) {
  // Inject keyframes custom hanya sekali per komponen
  if (variant !== "default") {
    // We'll just use the inline style approach
  }

  if (variant === "card") {
    return (
      <div
        className={cn(
          "h-48 animate-[pulseFast] rounded-lg border-2 border-gray-700 bg-gray-800 sm:h-64",
          className,
        )}
      >
        <div className="h-1/4 animate-[pulseFast] rounded-t-lg bg-gray-700" />
        <div className="p-4">
          <div className="h-4 w-3/4 animate-[pulseFast] rounded bg-gray-600" />
          <div className="h-2 w-1/2 animate-[pulseFast] rounded bg-gray-600" />
          <div className="h-4 w-1/3 animate-[pulseFast] rounded bg-gray-600" />
          <div className="flex gap-2">
            <div className="h-5 w-10 animate-[pulseFast] rounded bg-gray-600" />
            <div className="h-5 w-10 animate-[pulseFast] rounded bg-gray-600" />
          </div>
        </div>
      </div>
    );
  }

  if (variant === "avatar") {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <div className="size-8 animate-[pulseFast] rounded-full bg-gray-800" />
        <div className="flex-1 space-y-1">
          <div className="h-2 w-2/3 animate-[pulseFast] rounded bg-gray-600" />
          <div className="h-2 w-1/2 animate-[pulseFast] rounded bg-gray-600" />
        </div>
      </div>
    );
  }

  // default variant — skeleton teks dengan warna lebih padat
  return <div className={cn("h-6 animate-[pulseFast] rounded bg-gray-800", className)} />;
}
