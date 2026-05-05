import { z } from 'zod'

export const createParticipationSchema = z.object({
  evenementId: z.string().min(1),
})

export const participationIdParamSchema = z.object({
  id: z.string().min(1),
})

export type CreateParticipationInput = z.infer<typeof createParticipationSchema>
