import { NextFunction, Request, Response, Router } from 'express'
import { z } from 'zod'
import { authenticate, AuthRequest, requireRole } from '../../middleware/auth.middleware'
import { badRequest, created, ok } from '../../utils/response'
import {
  createAnnouncement,
  deleteAnnouncement,
  getAnnouncementById,
  listAnnouncements,
  updateAnnouncement,
} from './announcements.service'

export const announcementsRouter = Router()

const announcementIdParamSchema = z.object({
  id: z.string().min(1),
})

const createAnnouncementSchema = z.object({
  titre: z.string().min(2).max(200),
  contenu: z.string().min(10),
  visible: z.boolean().default(true),
})

const updateAnnouncementSchema = createAnnouncementSchema.partial()

announcementsRouter.post(
  '/',
  authenticate,
  requireRole('administrateur'),
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const parsed = createAnnouncementSchema.safeParse(req.body)
      if (!parsed.success) {
        badRequest(res, parsed.error.issues[0]?.message ?? 'Données invalides')
        return
      }

      const announcement = await createAnnouncement(parsed.data)
      created(res, announcement)
    } catch (error) {
      next(error)
    }
  }
)

announcementsRouter.get('/', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const announcements = await listAnnouncements()
    ok(res, announcements)
  } catch (error) {
    next(error)
  }
})

announcementsRouter.put(
  '/:id',
  authenticate,
  requireRole('administrateur'),
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const params = announcementIdParamSchema.safeParse(req.params)
      if (!params.success) {
        badRequest(res, 'Paramètres invalides')
        return
      }

      const body = updateAnnouncementSchema.safeParse(req.body)
      if (!body.success) {
        badRequest(res, body.error.issues[0]?.message ?? 'Données invalides')
        return
      }

      const announcement = await updateAnnouncement(params.data.id, body.data)
      ok(res, announcement)
    } catch (error) {
      next(error)
    }
  }
)

announcementsRouter.delete(
  '/:id',
  authenticate,
  requireRole('administrateur'),
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const parsed = announcementIdParamSchema.safeParse(req.params)
      if (!parsed.success) {
        badRequest(res, 'Paramètres invalides')
        return
      }

      await deleteAnnouncement(parsed.data.id)
      res.status(200).json({ success: true, message: 'Annonce supprimée.' })
    } catch (error) {
      next(error)
    }
  }
)

announcementsRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = announcementIdParamSchema.safeParse(req.params)
    if (!parsed.success) {
      badRequest(res, 'Paramètres invalides')
      return
    }

    const announcement = await getAnnouncementById(parsed.data.id)
    ok(res, announcement)
  } catch (error) {
    next(error)
  }
})
