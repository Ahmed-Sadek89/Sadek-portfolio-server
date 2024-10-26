import { z } from "zod";

export const ProjectVaidate = z.object({
    title: z.string().min(3, "Title must be 3 characters or higher").max(20, "Title must be 20 characters or less"),
    description: z.string(),
    live_url: z.string().url("Invalid URL"),
    repo_url: z.string().url("Invalid URL"),
    status: z.string(),
    created_at: z.string(),
    ended_at: z.string(),
    attachment: z.string(),
    category_project_id: z.number().int(),
    awner_id: z.number().int(),
    category_skills_ids: z.array(z.string()),
    skills_ids: z.array(z.string())
});