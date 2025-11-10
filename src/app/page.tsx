import Image from "next/image";
import Link from "next/link";
import { HomeFilters } from "./(components)/HomeFilters";
import { HomeGrid, HomeCarousel } from "./(components)/HomeGrid";
import { t } from "@/i18n/config";

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

export default async function Home() {
  const lang = "en";
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/testimonials`, { cache: "no-store" });
  let items: Testimonial[] = [];
  if (res.ok) {
    const data = await res.json();
    items = data.items ?? [];
  }
  return (
    <div className="min-h-screen">
      <main>
        <section className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                {t(lang, "hero")}
              </h1>
              <p className="mt-4 text-muted-foreground max-w-prose">
                Share and discover testimonials amplifying Palestinian voices. Real people, real stories, verified and searchable.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/submit" className="inline-flex items-center rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90">
                  Share a testimonial
                </Link>
                <Link href="/testimonials" className="inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium">
                  Browse testimonials
                </Link>
              </div>
            </div>
            <div className="relative aspect-video rounded-lg border overflow-hidden">
              <Image src="/window.svg" alt="Hero" fill className="object-cover dark:invert" />
            </div>
          </div>
        </section>

        <section id="testimonials" className="mx-auto max-w-6xl px-6 pb-20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">{t(lang, "latest")}</h2>
            <HomeFilters />
          </div>
          <HomeGrid
            items={(items.length ? items : Array.from({ length: 6 }).map((_, i) => ({
              _id: String(i),
              name: "Anonymous",
              location: "Gaza City",
              rating: 5,
              text: "We stand resilient. Our stories will be heard, our dignity unwavering.",
              verified: true,
              isVideo: i % 2 === 0,
            })) )}
          />
          <HomeCarousel items={items} />
        </section>
      </main>
    </div>
  );
}
