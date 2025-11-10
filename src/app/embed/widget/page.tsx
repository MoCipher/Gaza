import { TestimonialCard } from "@/components/TestimonialCard";

export default function WidgetPage() {
  const items = Array.from({ length: 3 }).map((_, i) => ({
    id: String(i),
    name: "Anonymous",
    location: "Gaza",
    rating: 5,
    text: "Enduring, united, and unbroken. Our voices carry hope.",
    verified: true,
    isVideo: i === 0,
  }));

  return (
    <div className="p-4 bg-background text-foreground">
      <div className="grid gap-3">
        {items.map((t) => (
          <TestimonialCard key={t.id} t={t} />
        ))}
      </div>
      <div className="mt-3 text-center text-xs text-muted-foreground">
        Powered by Voices of Palestine
      </div>
    </div>
  );
}


