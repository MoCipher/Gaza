"use client";

import Image from "next/image";
import { Badge } from "@/components/Badge";
import { Rating } from "@/components/Rating";
import { useState, useTransition } from "react";
import { VideoPlayer } from "@/components/VideoPlayer";

function normalizeEmbed(url?: string): { type: "youtube" | "vimeo" | "other" | null; embedUrl?: string } {
  if (!url) return { type: null };
  try {
    const u = new URL(url);
    const host = u.hostname.replace("www.", "");
    if (host.includes("youtube.com") || host.includes("youtu.be")) {
      let id = "";
      if (host === "youtu.be") id = u.pathname.slice(1);
      if (host.includes("youtube.com")) id = u.searchParams.get("v") || "";
      if (id) return { type: "youtube", embedUrl: `https://www.youtube.com/embed/${id}` };
    }
    if (host.includes("vimeo.com")) {
      const id = u.pathname.split("/").filter(Boolean)[0];
      if (id) return { type: "vimeo", embedUrl: `https://player.vimeo.com/video/${id}` };
    }
  } catch {}
  return { type: "other" };
}

type Testimonial = {
  id: string;
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

export function TestimonialCard({ t }: { t: Testimonial }) {
  const [avg, setAvg] = useState<number | undefined>(
    t && t.ratingsCount ? t.ratingsSum! / t.ratingsCount : t.rating
  );
  const [isPending, startTransition] = useTransition();

  const handleRate = (value: number) => {
    startTransition(async () => {
      try {
        const res = await fetch(`/api/testimonials/${t.id}/rate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ rating: value }),
        });
        if (res.ok) {
          const data = await res.json();
          setAvg(data.avg);
        }
      } catch {}
    });
  };
  return (
    <article className="rounded-lg border bg-card text-card-foreground overflow-hidden">
      {(() => {
        const em = normalizeEmbed(t.videoUrl);
        if (em.type === "youtube" || em.type === "vimeo") {
          return (
            <div className="relative aspect-video w-full">
              <iframe
                src={em.embedUrl}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded video"
              />
            </div>
          );
        }
        return null;
      })()}
      {!normalizeEmbed(t.videoUrl).embedUrl && t.videoUrl ? (
        <div className="p-0">
          <VideoPlayer src={t.videoUrl} className="rounded-none" />
        </div>
      ) : t.imageUrl ? (
        <div className="relative aspect-video w-full">
          <Image src={t.imageUrl} alt={t.name} fill className="object-cover" />
        </div>
      ) : null}

      <div className="p-4">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-[oklch(0.71_0.17_149_/_.15)] grid place-items-center text-primary font-semibold">
          {t.name?.[0]?.toUpperCase() || "A"}
        </div>
        <div>
          <div className="text-sm font-medium">{t.name || "Anonymous"}</div>
          <div className="text-xs text-muted-foreground">{t.location || ""}</div>
        </div>
      </div>
        {typeof avg === "number" && <Rating className="mt-2" value={avg} />}
      <p className="mt-3 text-sm">
        {t.text}
      </p>
      <div className="mt-4 flex items-center gap-2">
        {t.verified && <Badge color="red">Verified</Badge>}
          {(t.isVideo || t.videoUrl) && <Badge color="green">Video</Badge>}
        </div>

        <div className="mt-3 flex items-center gap-2 text-xs">
          <span>Rate:</span>
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              onClick={() => handleRate(n)}
              className="rounded border px-2 py-0.5 hover:bg-muted"
              disabled={isPending}
            >
              {n}
            </button>
          ))}
        </div>
      </div>
    </article>
  );
}


