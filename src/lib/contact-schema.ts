/**
 * @fileoverview Contact Enquiry Validation Schema & Types
 * Zod validation schema, budget ranges, and TypeScript types for client enquiry form and backend verification.
 * Used in: src/components/sections/contact.tsx and src/app/api/contact/route.ts.
 */

import { z } from "zod";

export const budgetOptions = [
  "Under $500",
  "$500 - $2,000",
  "$2,000 - $5,000",
  "$5,000+",
  "Not sure yet",
] as const;

export const projectTypes = [
  "Full stack web app",
  "E-commerce store",
  "WordPress / Shopify",
  "SEO & performance",
  "Something else",
] as const;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(80, "That name is a little too long."),
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Enter a valid email address.")
    .max(254, "Email address is too long."),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  projectType: z
    .union([z.enum(projectTypes), z.literal("")])
    .optional()
    .transform((v) => v ?? ""),
  budget: z
    .union([z.enum(budgetOptions), z.literal("")])
    .optional()
    .transform((v) => v ?? ""),
  message: z
    .string()
    .trim()
    .min(20, "A little more detail helps - 20 characters minimum.")
    .max(4000, "Please keep it under 4000 characters."),
  website: z.string().max(500).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactResponse =
  | { ok: true; message: string }
  | { ok: false; message: string; errors?: Record<string, string[]> };

