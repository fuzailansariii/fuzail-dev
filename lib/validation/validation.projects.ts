import { z } from "zod";

export const projectSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(100, "Title too long"),
  description: z
    .string()
    .trim()
    .min(1, "Description is required")
    .max(500, "Description too long"),
  tags: z
    .array(z.string().trim())
    .min(1, "At least one tag required")
    .max(10, "Too many tags"),
  status: z.enum(["live", "in_progress", "archived"]),
  type: z.enum(["client", "personal"]),
  githubUrl: z.url("Invalid URL").optional(),
  liveUrl: z.url("Invalid URL").optional(),
  featured: z.boolean().default(false),
  order: z.number().int().min(0).default(0),
});

export const updateProjectSchema = projectSchema.partial();
export type UpdateProjectSchema = z.infer<typeof updateProjectSchema>;

export type ProjectFormData = z.infer<typeof projectSchema>;
