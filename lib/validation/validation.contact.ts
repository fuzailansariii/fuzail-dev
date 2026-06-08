import { z } from "zod";

export const emailSchema = z.email("Invalid email address");

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(50, "Name too long"),
  email: z.email("Invalid email address"),
  subject: z
    .string()
    .trim()
    .min(1, "Subject is required")
    .max(100, "Subject too long"),
  message: z
    .string()
    .trim()
    .min(20, "Message too short")
    .max(2000, "Message too long"),
});

export type ContactFormData = z.infer<typeof contactSchema>;
