import { z } from 'zod'

// ── Create donation (public) ──────────────────────────────────────────────────

export const createDonationSchema = z.object({
  amount: z
    .number({ required_error: 'Le montant est requis' })
    .positive('Le montant doit être positif')
    .max(100_000, 'Le montant dépasse la limite autorisée'),

  currency: z.string().default('MAD'),

  method: z.enum(['CARD', 'VIREMENT'], {
    required_error: 'La méthode de paiement est requise',
  }),

  donorName:  z.string().min(2).max(100).optional(),
  donorEmail: z.string().email('Email invalide').optional(),
  donorPhone: z.string().max(20).optional(),
  message:    z.string().max(500).optional(),
})

// ── Update donation status (admin) ───────────────────────────────────────────

export const updateStatusSchema = z.object({
  status:    z.enum(['PENDING', 'CONFIRMED', 'FAILED']),
  adminNote: z.string().max(500).optional(),
})

// ── Query filters ─────────────────────────────────────────────────────────────

export const listDonationsQuerySchema = z.object({
  status:   z.enum(['PENDING', 'CONFIRMED', 'FAILED']).optional(),
  method:   z.enum(['CARD', 'VIREMENT']).optional(),
  page:     z.coerce.number().default(1),
  limit:    z.coerce.number().max(100).default(20),
})

// ── Types ─────────────────────────────────────────────────────────────────────

export type CreateDonationInput  = z.infer<typeof createDonationSchema>
export type UpdateStatusInput    = z.infer<typeof updateStatusSchema>
export type ListDonationsQuery   = z.infer<typeof listDonationsQuerySchema>
