"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

type RatingProps = {
  value: number;
  outOf?: number;
  className?: string;
  size?: number;
};

export function Rating({ value, outOf = 5, className, size = 16 }: RatingProps) {
  const full = Math.floor(value);
  const hasHalf = value - full >= 0.5;
  const empty = Math.max(0, outOf - full - (hasHalf ? 1 : 0));

  return (
    <div className={cn("flex items-center gap-1 text-primary", className)} aria-label={`${value} out of ${outOf} stars`}>
      {Array.from({ length: full }).map((_, i) => (
        <Star key={`full-${i}`} size={size} fill="currentColor" />
      ))}
      {hasHalf && (
        <div className="relative" aria-hidden>
          <Star size={size} className="text-muted-foreground" />
          <Star size={size} className="absolute inset-0 clip-half" fill="currentColor" />
        </div>
      )}
      {Array.from({ length: empty }).map((_, i) => (
        <Star key={`empty-${i}`} size={size} className="text-muted-foreground" />
      ))}
      <style jsx>{`
        .clip-half { clip-path: inset(0 50% 0 0); }
      `}</style>
    </div>
  );
}


