import { z } from 'zod'

export const registerSchema = z.object({
  nom: z.string().min(2).max(100),
  email: z.string().email(),
  motDePasse: z.string().min(6).max(100),
  telephone: z.string().optional(),
})

export const loginSchema = z.object({
  email: z.string().email(),
  motDePasse: z.string().min(1),
})

export type RegisterInput = z.infer<typeof registerSchema>
export type LoginInput = z.infer<typeof loginSchema>
