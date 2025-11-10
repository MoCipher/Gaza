"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type VideoPlayerProps = {
  src: string;
  poster?: string;
  className?: string;
};

export function VideoPlayer({ src, poster, className }: VideoPlayerProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className={cn("relative aspect-video rounded-md overflow-hidden border", className)}>
      {!playing ? (
        <button className="group absolute inset-0 w-full h-full" onClick={() => setPlaying(true)} aria-label="Play video">
          {poster ? (
            <Image src={poster} alt="Video poster" fill className="object-cover" />
          ) : (
            <div className="w-full h-full bg-muted" />
          )}
          <div className="absolute inset-0 grid place-items-center">
            <div className="h-14 w-14 rounded-full bg-primary text-primary-foreground grid place-items-center shadow-lg group-hover:scale-105 transition">
              ▶
            </div>
          </div>
        </button>
      ) : (
        <video src={src} className="w-full h-full" controls autoPlay playsInline />
      )}
    </div>
  );
}


