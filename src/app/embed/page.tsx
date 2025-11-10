export default function EmbedPage() {
  return (
    <div className="min-h-[50vh] grid place-items-center p-6">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">Embeddable Testimonials Widget</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Use the following script to embed the widget on any website.
        </p>
        <pre className="mt-4 rounded-md border bg-muted p-3 text-xs overflow-auto">
{`<div id="gaza-testimonials"></div>
<script async src="${process.env.NEXT_PUBLIC_SITE_URL || ""}/api/embed.js" data-target="gaza-testimonials"></script>`}
        </pre>
      </div>
    </div>
  );
}


