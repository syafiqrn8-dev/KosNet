"use client";

import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

export interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  onChange?: (rating: number) => void;
}

const SIZE_CLASSES = {
  sm: "size-3.5",
  md: "size-5",
  lg: "size-6",
};

export function RatingStars({
  rating,
  maxRating = 5,
  size = "md",
  interactive = false,
  onChange,
}: RatingStarsProps) {
  const stars = Array.from({ length: maxRating }, (_, i) => i + 1);

  return (
    <div className="inline-flex items-center gap-0.5">
      {stars.map((star) => {
        const filled = star <= Math.floor(rating);
        const half = !filled && star === Math.ceil(rating) && rating % 1 >= 0.5;
        const StarIcon = interactive ? "button" : "span";

        return (
          <span
            key={star}
            className={cn("relative", interactive && "cursor-pointer")}
            onClick={() => interactive && onChange?.(star)}
            role={interactive ? "radio" : undefined}
            aria-checked={interactive ? star <= rating : undefined}
            aria-label={interactive ? `${star} bintang` : undefined}
          >
            <Star
              className={cn(
                SIZE_CLASSES[size],
                "transition-colors",
                filled
                  ? "fill-yellow-400 text-yellow-400"
                  : half
                    ? "fill-yellow-400/30 text-yellow-400"
                    : "text-muted/40 fill-none",
              )}
            />
          </span>
        );
      })}
    </div>
  );
}
