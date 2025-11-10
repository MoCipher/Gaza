import { TestimonialCard } from "@/components/TestimonialCard";

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

export const dynamic = "force-dynamic";

export default async function TestimonialsPage() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/testimonials`, { cache: "no-store" });
  const data = res.ok ? await res.json() : { items: [] };
  const items: Testimonial[] = data.items ?? [];

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="text-3xl font-bold">Browse testimonials</h1>
      <p className="mt-2 text-muted-foreground">Latest community submissions.</p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <input
          className="w-full sm:w-64 rounded-md border bg-background px-3 py-2 text-sm"
          placeholder="Search keywords…"
          aria-label="Search testimonials"
        />
        <select className="rounded-md border bg-background px-3 py-2 text-sm">
          <option>All ratings</option>
          <option>5★</option>
          <option>4★+</option>
          <option>3★+</option>
        </select>
        <select className="rounded-md border bg-background px-3 py-2 text-sm">
          <option>All types</option>
          <option>Video</option>
          <option>Text</option>
        </select>
      </div>

      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {(items.length ? items : Array.from({ length: 6 }).map((_, i) => ({
          _id: String(i),
          name: "Anonymous",
          location: "Gaza City",
          rating: 5,
          text: "We stand resilient. Our stories will be heard, our dignity unwavering.",
          verified: true,
          isVideo: i % 2 === 0,
        }))).map((it: Testimonial) => (
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
            }}
          />
        ))}
      </div>
    </div>
  );
}


