import { z } from 'zod'

// ── Submit contact message (public) ──────────────────────────────────────────

export const createContactSchema = z.object({
  firstName: z.string().min(2, 'Prénom requis').max(60),
  lastName:  z.string().min(2, 'Nom requis').max(60),
  email:     z.string().email('Email invalide'),
  phone:     z.string().max(20).optional(),
  subject:   z.enum(
    ['adhesion', 'partenariat', 'evenement', 'information', 'presse', 'autre'],
    { required_error: 'Sujet requis' }
  ),
  message:   z.string().min(10, 'Message trop court').max(2000),
})

// ── Update message status (admin) ─────────────────────────────────────────────

export const updateContactStatusSchema = z.object({
  status: z.enum(['unread', 'read', 'replied']),
})

// ── Types ──────────────────────────────────────────────────────────────────────

export type CreateContactInput       = z.infer<typeof createContactSchema>
export type UpdateContactStatusInput = z.infer<typeof updateContactStatusSchema>
