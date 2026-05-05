import { NextFunction, Request, Response, Router } from 'express'
import { z } from 'zod'
import { badRequest, ok } from '../../utils/response'
import { getAnnouncementById, listAnnouncements } from './announcements.service'

export const announcementsRouter = Router()

const announcementIdParamSchema = z.object({
  id: z.string().min(1),
})

announcementsRouter.get('/', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const announcements = await listAnnouncements()
    ok(res, announcements)
  } catch (error) {
    next(error)
  }
})

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
