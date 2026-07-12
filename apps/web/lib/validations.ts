import { z } from "zod";

export const ProfileSchema = z.object({
  displayName: z.string().min(1).max(50),
  biography: z.string().max(500).optional(),
  location: z.string().max(100).optional(),
});

export const ProjectSchema = z.object({
  title: z.string().min(1).max(100),
  slug: z.string().min(1).max(100),
  status: z.enum(["Active", "Completed", "Archived"]).optional(),
  visibility: z.enum(["public", "private"]).optional(),
});

// Additional schemas for other entities would go here...
