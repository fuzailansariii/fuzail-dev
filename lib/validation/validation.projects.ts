import { z } from "zod";

export const projectSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(100, "Title too long"),
  subHeading: z
    .string()
    .min(1, "Sub Heading is required")
    .max(50, "Sub Heading is too long."),
  description: z
    .string()
    .trim()
    .min(1, "Description is required")
    .max(500, "Description too long"),
  tags: z
    .array(z.string().trim())
    .min(1, "At least one tag required")
    .max(10, "Too many tags"),
  status: z.enum(["live", "in_progress"]),
  type: z.enum(["client", "personal"]),
  category: z
    .string()
    .min(1, "Category is required")
    .max(50, "Category is too long"),
  githubUrl: z.url("Invalid URL").optional(),
  liveUrl: z.url("Invalid URL").optional(),
  featured: z.boolean(),
});

export const updateProjectSchema = projectSchema
  .omit({ featured: true })
  .partial();
export type UpdateProjectSchema = z.infer<typeof updateProjectSchema>;

export type ProjectFormData = z.output<typeof projectSchema>;
