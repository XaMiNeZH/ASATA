import { Router, Request, Response } from 'express'
import { z } from 'zod'
import { prisma } from '../../config/database'
import { requireAdmin, AuthRequest } from '../auth/auth.middleware'
import { sendSuccess, sendCreated, sendError, sendNotFound, sendServerError } from '../../utils/response'

export const galleryRouter = Router()

const CATEGORIES = ['ski', 'football', 'athletisme', 'general'] as const

const createPhotoSchema = z.object({
  src:      z.string().min(1).max(500),
  caption:  z.string().max(200).nullish(),
  category: z.enum(CATEGORIES).default('general'),
})

// GET /api/gallery — public
galleryRouter.get('/', async (req: Request, res: Response) => {
  try {
    const category = req.query.category as string | undefined
    const photos = await prisma.galleryPhoto.findMany({
      where: category && category !== 'all' ? { category } : undefined,
      orderBy: { createdAt: 'desc' },
    })
    return sendSuccess(res, photos)
  } catch (err) {
    return sendServerError(res, err)
  }
})

// POST /api/gallery — admin only
galleryRouter.post('/', requireAdmin, async (req: AuthRequest, res: Response) => {
  const parsed = createPhotoSchema.safeParse(req.body)
  if (!parsed.success) return sendError(res, 'Données invalides', 422, parsed.error.flatten().fieldErrors)

  try {
    const photo = await prisma.galleryPhoto.create({ data: parsed.data })
    return sendCreated(res, photo, 'Photo ajoutée')
  } catch (err) {
    return sendServerError(res, err)
  }
})

// DELETE /api/gallery/:id — admin only
galleryRouter.delete('/:id', requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const exists = await prisma.galleryPhoto.findUnique({ where: { id: req.params.id } })
    if (!exists) return sendNotFound(res, 'Photo')
    await prisma.galleryPhoto.delete({ where: { id: req.params.id } })
    return sendSuccess(res, null, 'Photo supprimée')
  } catch (err) {
    return sendServerError(res, err)
  }
})
