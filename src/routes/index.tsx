import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { submitFeedback } from "@/lib/feedback.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Neem Restaurant — Customer Feedback" },
      { name: "description", content: "Share your dining experience with Neem Restaurant — we'd love to hear from you." },
      { property: "og:title", content: "Neem Restaurant — Customer Feedback" },
      { property: "og:description", content: "Share your dining experience with Neem Restaurant — we'd love to hear from you." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

function Index() {
  const send = useServerFn(submitFeedback);
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setStatus("loading");
    setError("");
    try {
      await send({
        data: {
          customerName: String(fd.get("name") ?? ""),
          customerEmail: String(fd.get("email") ?? ""),
          feedback: String(fd.get("feedback") ?? ""),
        },
      });
      setStatus("done");
    } catch {
      setStatus("idle");
      setError("Sorry, something went wrong. Please try again.");
    }
  }

  return (
    <main className="support-bg flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg overflow-hidden rounded-3xl bg-card shadow-soft">
        <div className="card-top-band h-2" />
        <div className="p-8 sm:p-10">
        {status === "done" ? (
          <div className="py-8 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-accent text-3xl text-accent-foreground">✓</div>
            <h1 className="font-display text-3xl text-foreground">Thank you!</h1>
            <p className="mt-3 text-muted-foreground">We've received your message and will get back to you soon.</p>
            <button onClick={() => setStatus("idle")} className="mt-8 rounded-full px-5 py-2 text-sm font-medium text-primary hover:bg-secondary">
              Send another message
            </button>
          </div>
        ) : (
          <>
            <h1 className="font-display text-4xl text-foreground">Neem Restaurant</h1>
            <p className="mt-2 text-muted-foreground">How was your visit? Share your feedback — we'd love to hear from you.</p>
            <form onSubmit={onSubmit} className="mt-8 space-y-5">
              <Field label="Your Name"><input name="name" required maxLength={100} className="field" /></Field>
              <Field label="Your Email"><input name="email" type="email" required maxLength={255} className="field" /></Field>
              <Field label="Your feedback — tell us about your experience">
                <textarea name="feedback" required rows={6} maxLength={5000} className="field resize-none" />
              </Field>
              {error && <p className="text-sm text-destructive">{error}</p>}
              <button type="submit" disabled={status === "loading"} className="w-full rounded-2xl bg-primary py-3.5 font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-60">
                {status === "loading" ? "Sending…" : "Submit"}
              </button>
            </form>
          </>
        )}
      </div>
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-foreground">{label}</span>
      {children}
    </label>
  );
}
