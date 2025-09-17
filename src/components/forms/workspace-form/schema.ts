import { z } from "zod";

export const workspaceFormSchema = z.object({
  name: z.string().min(1, "Workspace name cannot be empty"),
});