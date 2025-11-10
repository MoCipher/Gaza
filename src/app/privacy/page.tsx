export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-3xl font-bold">Privacy Policy</h1>

      <div className="mt-6 rounded-lg border bg-card text-card-foreground p-6">
        <p className="text-sm text-muted-foreground">
          We collect testimonials you submit, including name, location (if provided), and content. We use this
          information to display and moderate testimonials. We do not sell your data.
        </p>

        <h2 className="mt-8 text-xl font-semibold">Data Retention</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          You may request removal of your testimonial at any time.
        </p>

        <h2 className="mt-8 text-xl font-semibold">Your Rights</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          You can request access, correction, or deletion of your data.
        </p>

        <h2 className="mt-8 text-xl font-semibold">Contact</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          For privacy inquiries, contact us at privacy@example.com.
        </p>
      </div>
    </div>
  );
}


