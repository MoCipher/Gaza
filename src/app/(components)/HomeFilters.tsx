"use client";

import { useMemo, useState } from "react";

type Testimonial = {
  _id: string;
  name: string;
  location?: string;
  rating?: number;
  text: string;
  isVideo?: boolean;
  verified?: boolean;
  imageUrl?: string;
  videoUrl?: string;
  ratingsSum?: number;
  ratingsCount?: number;
};

export function HomeFilters() {
  const [filter, setFilter] = useState<"all" | "5" | "video">("all");
  return (
    <div className="flex gap-2">
      {(
        [
          { key: "all", label: "All" },
          { key: "5", label: "5★" },
          { key: "video", label: "Video" },
        ] as const
      ).map((b) => (
        <button
          key={b.key}
          onClick={() => setFilter(b.key)}
          className={`rounded-md border px-3 py-1.5 text-sm ${
            filter === b.key ? "bg-primary text-primary-foreground" : ""
          }`}
        >
          {b.label}
        </button>
      ))}
    </div>
  );
}

export function useFilterItems(items: Testimonial[]) {
  const [filter, setFilter] = useState<"all" | "5" | "video">("all");
  const filtered = useMemo(() => {
    if (filter === "all") return items;
    if (filter === "5") return items.filter((i) => i.rating === 5);
    if (filter === "video") return items.filter((i) => i.isVideo || i.videoUrl);
    return items;
  }, [items, filter]);
  return { filtered, filter, setFilter };
}


