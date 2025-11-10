"use client";

import { TestimonialCard } from "@/components/TestimonialCard";
import { useFilterItems } from "./HomeFilters";
import { Carousel } from "@/components/Carousel";

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

export function HomeGrid({ items }: { items: Testimonial[] }) {
  const { filtered } = useFilterItems(items);
  return (
    <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filtered.map((it: Testimonial) => (
        <TestimonialCard
          key={it._id}
          t={{
            id: it._id,
            name: it.name,
            location: it.location,
            rating: it.rating,
            text: it.text,
            verified: it.verified,
            isVideo: it.isVideo,
            imageUrl: it.imageUrl,
            videoUrl: it.videoUrl,
            ratingsSum: it.ratingsSum,
            ratingsCount: it.ratingsCount,
          }}
        />
      ))}
    </div>
  );
}

export function HomeCarousel({ items }: { items: Testimonial[] }) {
  // For mobile we don't filter for simplicity; advanced sync can be added later
  const mapped = (items.length ? items : Array.from({ length: 6 }).map((_, i) => ({
    _id: String(i),
    name: "Anonymous",
    location: "Gaza City",
    rating: 5,
    text: "We stand resilient. Our stories will be heard, our dignity unwavering.",
    verified: true,
    isVideo: i % 2 === 0,
  })) ).map((it: Testimonial) => ({
    id: it._id,
    content: (
      <TestimonialCard
        t={{
          id: it._id,
          name: it.name,
          location: it.location,
          rating: it.rating,
          text: it.text,
          verified: it.verified,
          isVideo: it.isVideo,
          imageUrl: it.imageUrl,
          videoUrl: it.videoUrl,
          ratingsSum: it.ratingsSum,
          ratingsCount: it.ratingsCount,
        }}
      />
    ),
  }));
  return (
    <div className="md:hidden">
      <Carousel items={mapped} />
    </div>
  );
}


