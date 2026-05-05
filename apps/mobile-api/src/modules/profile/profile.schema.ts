import { z } from 'zod'

export const updateProfilSchema = z.object({
  nom: z.string().min(2).max(100).optional(),
  telephone: z.string().optional(),
  adresse: z.string().optional(),
  age: z.number().int().min(10).max(100).optional(),
  photo: z.string().url().optional(),
})

export type UpdateProfilInput = z.infer<typeof updateProfilSchema>
