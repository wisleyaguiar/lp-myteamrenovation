// Schema compartilhado cliente/servidor (CT-01). Só zod: sem imports "@/".
import { z } from "zod";

export const SERVICE_OPTIONS = [
  "Bathroom Remodeling",
  "Flooring Installation",
  "Kitchen Remodeling",
  "Custom Carpentry & Finish Woodwork",
  "General Repairs & Interior Painting",
] as const;

export const leadSchema = z
  .object({
    name: z.string().trim().min(2, "Please enter your full name").max(100),
    email: z.string().trim().email("Please enter a valid email").max(255),
    phone: z.string().trim().min(7, "Please enter a valid phone number").max(30),
    service: z.enum(SERVICE_OPTIONS, {
      errorMap: () => ({ message: "Please select a remodeling service" }),
    }),
    zip: z
      .string()
      .trim()
      .regex(/^\d{5}$/, "Please enter a valid 5-digit ZIP code"),
    event_id: z.string().min(8).max(100),
    event_source_url: z.string().url(),
    fbp: z.string().max(255).optional(),
    fbc: z.string().max(255).optional(),
    consent: z.boolean().optional(),
    // Honeypot (RF-43): o servidor responde 200 sem encaminhar quando preenchido.
    company: z.string().max(255).optional(),
  })
  .strict();

export type LeadInput = z.infer<typeof leadSchema>;
