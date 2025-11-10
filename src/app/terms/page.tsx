export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-3xl font-bold">Terms of Service</h1>

      <div className="mt-6 rounded-lg border bg-card text-card-foreground p-6">
        <p className="text-sm text-muted-foreground">
          By submitting a testimonial, you confirm you have the right to share its content and grant us permission
          to display it on this website and in embeds. We may remove submissions that violate our guidelines.
        </p>
        <h2 className="mt-8 text-xl font-semibold">Acceptable Use</h2>
        <p className="mt-2 text-sm text-muted-foreground">No illegal, hateful, or harassing content.</p>
        <h2 className="mt-8 text-xl font-semibold">Changes</h2>
        <p className="mt-2 text-sm text-muted-foreground">We may update these terms. Continued use constitutes acceptance.</p>
      </div>
    </div>
  );
}


