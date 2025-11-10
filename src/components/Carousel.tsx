"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type CarouselItem = {
  id: string;
  content: React.ReactNode;
};

export function Carousel({
  items,
  className,
}: {
  items: CarouselItem[];
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [index, setIndex] = useState(0);
  const [drag, setDrag] = useState<{ x: number; startX: number; isDown: boolean } | null>(null);

  const goTo = useCallback((next: number) => {
    setIndex(() => {
      const total = items.length;
      return ((next % total) + total) % total;
    });
  }, [items.length]);

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture(e.pointerId);
    setDrag({ x: e.clientX, startX: e.clientX, isDown: true });
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag?.isDown) return;
    setDrag((d) => (d ? { ...d, x: e.clientX } : d));
  };

  const onPointerUp = () => {
    if (!drag) return;
    const delta = drag.x - drag.startX;
    if (Math.abs(delta) > 50) {
      goTo(index + (delta < 0 ? 1 : -1));
    }
    setDrag(null);
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goTo(index + 1);
      if (e.key === "ArrowLeft") goTo(index - 1);
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [index, items.length, goTo]);

  return (
    <div
      ref={containerRef}
      className={cn("relative select-none", className)}
      role="region"
      aria-roledescription="carousel"
      tabIndex={0}
    >
      <div className="overflow-hidden rounded-md border">
        <div
          className="flex transition-transform duration-300"
          style={{ transform: `translateX(-${index * 100}%)` }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
        >
          {items.map((item) => (
            <div key={item.id} className="shrink-0 grow-0 basis-full p-4">
              {item.content}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-2 flex items-center justify-center gap-2" aria-label="carousel pagination">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={cn(
              "h-2 w-2 rounded-full border",
              i === index ? "bg-primary border-primary" : "bg-transparent"
            )}
          />
        ))}
      </div>
    </div>
  );
}
