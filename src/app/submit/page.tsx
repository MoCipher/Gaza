"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const FormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  location: z.string().optional(),
  text: z.string().min(10, "Please share at least 10 characters"),
  isVideo: z.boolean().optional(),
  imageUrl: z.string().url().optional(),
  videoUrl: z.string().url().optional(),
});

type FormValues = z.infer<typeof FormSchema>;

export default function SubmitPage() {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<FormValues>({ resolver: zodResolver(FormSchema) });

  useEffect(() => {
    if (sessionStatus === "loading") return;
    
    if (!session) {
      router.push("/auth/signin?callbackUrl=/submit");
    }
  }, [session, sessionStatus, router]);

  if (sessionStatus === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>Please sign in to submit a testimonial</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Link href="/auth/signin">
              <Button>Sign In</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const onSubmit = async (values: FormValues) => {
    try {
      setStatus("submitting");
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Failed to submit");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  // Toolbar helpers for simple formatting
  const insertAroundSelection = (before: string, after: string = before) => {
    const el = document.getElementById("testimonial-textarea") as HTMLTextAreaElement | null;
    if (!el) return;
    const start = el.selectionStart || 0;
    const end = el.selectionEnd || 0;
    const value = el.value || "";
    const selected = value.slice(start, end) || "text";
    const next = value.slice(0, start) + before + selected + after + value.slice(end);
    setValue("text", next, { shouldValidate: true });
    queueMicrotask(() => {
      el.focus();
      el.setSelectionRange(start + before.length, end + before.length);
    });
  };

  const insertAtCursor = (snippet: string) => {
    const el = document.getElementById("testimonial-textarea") as HTMLTextAreaElement | null;
    if (!el) return;
    const pos = el.selectionStart || 0;
    const value = el.value || "";
    const next = value.slice(0, pos) + snippet + value.slice(pos);
    setValue("text", next, { shouldValidate: true });
    queueMicrotask(() => {
      el.focus();
      const newPos = pos + snippet.length;
      el.setSelectionRange(newPos, newPos);
    });
  };

  const emojis = ["🇵🇸", "❤️", "🙏", "🌿", "🕊️", "🌍", "⭐️"];

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-3xl font-bold">Share your testimonial</h1>
      <p className="mt-2 text-muted-foreground">
        Your story helps amplify Palestinian voices. Submissions may be reviewed and verified.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid gap-6">
        <div className="rounded-lg border p-4 bg-muted/20">
          <div className="text-sm font-medium">Upload media (optional)</div>
          <p className="mt-1 text-xs text-muted-foreground">Upload an image or a short video. Max ~10MB in dev.</p>
          <div className="mt-3 flex flex-wrap gap-3">
            <label className="rounded-md border px-3 py-2 text-sm cursor-pointer">
              <input type="file" accept="image/*,video/*" className="hidden" onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const fd = new FormData();
                fd.append("file", file);
                const up = await fetch("/api/upload", { method: "POST", body: fd });
                if (up.ok) {
                  const { url } = await up.json();
                  if (file.type.startsWith("image/")) setValue("imageUrl", url, { shouldValidate: true });
                  else if (file.type.startsWith("video/")) setValue("videoUrl", url, { shouldValidate: true });
                }
              }} />
              Choose file…
            </label>
            <button type="button" className="rounded-md border px-3 py-2 text-sm" onClick={() => insertAtCursor("\n![alt](https://.../image.jpg)\n")}>
              Insert image markdown
            </button>
            <button type="button" className="rounded-md border px-3 py-2 text-sm" onClick={() => insertAtCursor("\nhttps://youtu.be/VIDEO_ID\n")}>
              Insert YouTube link
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            className="mt-1 w-full rounded-md border bg-background px-3 py-2"
            placeholder="Your name"
            {...register("name")}
          />
          {errors.name && <p className="mt-1 text-xs text-[oklch(0.65_0.27_29)]">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Location</label>
          <input
            className="mt-1 w-full rounded-md border bg-background px-3 py-2"
            placeholder="City, Country"
            {...register("location")}
          />
        </div>

        

        <div>
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium">Testimonial</label>
            <div className="flex flex-wrap gap-1.5 text-xs">
              <button type="button" className="rounded border px-2 py-1" onClick={() => insertAroundSelection("**")}>Bold</button>
              <button type="button" className="rounded border px-2 py-1" onClick={() => insertAroundSelection("_")}>Italic</button>
              <button type="button" className="rounded border px-2 py-1" onClick={() => insertAtCursor("\n- ")}>List</button>
              <button type="button" className="rounded border px-2 py-1" onClick={() => insertAtCursor("[link](https://)")}>Link</button>
              <div className="relative">
                <details className="inline-block">
                  <summary className="rounded border px-2 py-1 cursor-pointer select-none">Emoji</summary>
                  <div className="absolute z-10 mt-1 rounded-md border bg-background p-1 shadow-sm">
                    <div className="flex gap-1">
                      {emojis.map((e) => (
                        <button key={e} type="button" className="px-2 py-1 hover:bg-muted rounded" onClick={() => insertAtCursor(e)}>
                          {e}
                        </button>
                      ))}
                    </div>
                  </div>
                </details>
              </div>
            </div>
          </div>
          <textarea
            id="testimonial-textarea"
            rows={8}
            className="mt-2 w-full rounded-md border bg-background px-3 py-2"
            placeholder={'Share your story… You can include emojis like 🇵🇸 and simple Markdown (e.g., **bold**, _italic_, lists).'}
            {...register("text")}
          />
          {errors.text && <p className="mt-1 text-xs text-[oklch(0.65_0.27_29)]">{errors.text.message}</p>}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium">Image URL (optional)</label>
            <input
              className="mt-1 w-full rounded-md border bg-background px-3 py-2"
              placeholder="https://.../photo.jpg"
              {...register("imageUrl")}
            />
            {watch("imageUrl") && (
              <div className="mt-2 relative aspect-video w-full rounded-md overflow-hidden border">
                {/* preview via native img to avoid domain config */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={watch("imageUrl") || ""} alt="Preview" className="h-full w-full object-cover" />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Video URL (optional)</label>
            <input
              className="mt-1 w-full rounded-md border bg-background px-3 py-2"
              placeholder="https://.../video.mp4"
              {...register("videoUrl")}
            />
            <p className="mt-1 text-xs text-muted-foreground">Paste a direct link to your video file (mp4/webm) or a hosted URL.</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input id="isVideo" type="checkbox" className="h-4 w-4" {...register("isVideo")} />
          <label htmlFor="isVideo" className="text-sm">This is a video testimonial</label>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="inline-flex items-center rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90"
            disabled={status === "submitting"}
          >
            {status === "submitting" ? "Submitting..." : "Submit"}
          </button>
          {status === "success" && <span className="text-sm text-primary">Submitted successfully!</span>}
          {status === "error" && <span className="text-sm text-[oklch(0.65_0.27_29)]">Something went wrong. Try again.</span>}
        </div>
      </form>
    </div>
  );
}


