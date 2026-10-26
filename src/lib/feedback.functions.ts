import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  customerName: z.string().trim().min(1).max(100),
  customerEmail: z.string().trim().email().max(255),
  feedback: z.string().trim().min(1).max(5000),
});

export const submitFeedback = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => schema.parse(data))
  .handler(async ({ data }) => {
    const url = process.env.N8N_WEBHOOK_URL;
    if (!url) throw new Error("Webhook is not configured");
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        feedback: data.feedback,
      }),
    });
    if (!res.ok) throw new Error(`Webhook failed (${res.status})`);
    return { ok: true };
  });
