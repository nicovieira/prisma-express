import { z } from "zod";

export const opportunitySchema = z.object({
  id: z.number().positive(),
  title: z.string().min(1),
  description: z.string().min(1),
  userId: z.number().positive(),
});

export const opportunityCreateSchema = opportunitySchema.omit({ id: true, userId: true });

export const opportunityUpdateSchema = opportunityCreateSchema.partial();

export type tOpportunity = z.infer<typeof opportunitySchema>;

export type tOpportunityCreate = z.infer<typeof opportunityCreateSchema>;

export type tOpportunityUpdate = z.infer<typeof opportunityUpdateSchema>;
