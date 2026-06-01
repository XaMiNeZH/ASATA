import { z } from 'zod'

export const eventIdParamSchema = z.object({
  id: z.string().min(1),
})

export const createEventSchema = z.object({
  titre: z.string().min(2).max(200),
  description: z.string().min(10),
  date: z.string().datetime(),
  lieu: z.string().min(2).max(200),
  capacite: z.number().int().min(1).max(10000),
  statut: z.enum(['planifie', 'en_cours', 'termine', 'annule']).default('planifie'),
  coverImage: z.string().url().optional(),
})

export const updateEventSchema = createEventSchema.partial()

export type CreateEventInput = z.infer<typeof createEventSchema>
export type UpdateEventInput = z.infer<typeof updateEventSchema>
