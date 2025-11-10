import { Suspense } from "react";

async function getData() {
  // Placeholder analytics from API or DB in future
  return {
    totalTestimonials: 128,
    views: 15234,
    ctr: 3.8,
    topTags: ["video", "verified", "5star"],
  };
}

export default async function AnalyticsPage() {
  const data = await getData();
  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="text-3xl font-bold">Analytics</h1>
      <p className="mt-2 text-muted-foreground">Overview of testimonial performance.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card label="Testimonials" value={data.totalTestimonials} />
        <Card label="Views" value={data.views} />
        <Card label="CTR" value={`${data.ctr}%`} />
        <Card label="Top tag" value={data.topTags[0]} />
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold">Recent activity</h2>
        <Suspense fallback={<div className="mt-4 text-sm">Loading…</div>}>
          <div className="mt-4 rounded-md border p-4 text-sm text-muted-foreground">Coming soon</div>
        </Suspense>
      </div>
    </div>
  );
}

function Card({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-md border p-4">
      <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="mt-2 text-2xl font-semibold">{value}</div>
    </div>
  );
}


