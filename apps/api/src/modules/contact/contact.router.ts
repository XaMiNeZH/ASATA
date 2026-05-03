import { Router, Request, Response } from 'express'
import { createContactSchema, updateContactStatusSchema } from './contact.schema'
import { createContact, listContacts, updateContactStatus } from './contact.service'
import { sendCreated, sendSuccess, sendError, sendNotFound, sendServerError } from '../../utils/response'

export const contactRouter = Router()

// ── POST /api/contact — submit a message ─────────────────────────────────────

contactRouter.post('/', async (req: Request, res: Response) => {
  const parsed = createContactSchema.safeParse(req.body)
  if (!parsed.success) {
    return sendError(res, 'Données invalides', 422, parsed.error.flatten().fieldErrors)
  }

  try {
    const message = await createContact(parsed.data)
    return sendCreated(res, {
      id:        message.id,
      createdAt: message.createdAt,
    }, 'Message envoyé avec succès !')
  } catch (err) {
    return sendServerError(res, err)
  }
})

// ── GET /api/contact — list messages (admin) ──────────────────────────────────

contactRouter.get('/', async (req: Request, res: Response) => {
  try {
    const { status } = req.query as { status?: string }
    const messages = await listContacts(status)
    return sendSuccess(res, messages)
  } catch (err) {
    return sendServerError(res, err)
  }
})

// ── PATCH /api/contact/:id/status — mark read/replied (admin) ─────────────────

contactRouter.patch('/:id/status', async (req: Request, res: Response) => {
  const parsed = updateContactStatusSchema.safeParse(req.body)
  if (!parsed.success) {
    return sendError(res, 'Données invalides', 422, parsed.error.flatten().fieldErrors)
  }

  try {
    const updated = await updateContactStatus(req.params.id, parsed.data.status)
    return sendSuccess(res, updated, 'Statut mis à jour')
  } catch (err: any) {
    if (err?.code === 'P2025') return sendNotFound(res, 'Message introuvable')
    return sendServerError(res, err)
  }
})
