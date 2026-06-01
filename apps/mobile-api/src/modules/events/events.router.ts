import { NextFunction, Request, Response, Router } from 'express'
import { authenticate, AuthRequest, requireRole } from '../../middleware/auth.middleware'
import { badRequest, created, ok, unauthorized } from '../../utils/response'
import { createEventSchema, eventIdParamSchema, updateEventSchema } from './events.schema'
import {
  createEvent,
  deleteEvent,
  getEventById,
  isUserRegistered,
  listEvents,
  updateEvent,
} from './events.service'

export const eventsRouter = Router()

eventsRouter.post(
  '/',
  authenticate,
  requireRole('administrateur', 'coach'),
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const parsed = createEventSchema.safeParse(req.body)
      if (!parsed.success) {
        badRequest(res, parsed.error.issues[0]?.message ?? 'Données invalides')
        return
      }

      const event = await createEvent(parsed.data)
      created(res, event)
    } catch (error) {
      next(error)
    }
  }
)

eventsRouter.get('/', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const events = await listEvents()
    ok(res, events)
  } catch (error) {
    next(error)
  }
})

eventsRouter.put(
  '/:id',
  authenticate,
  requireRole('administrateur', 'coach'),
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const params = eventIdParamSchema.safeParse(req.params)
      if (!params.success) {
        badRequest(res, 'Paramètres invalides')
        return
      }

      const body = updateEventSchema.safeParse(req.body)
      if (!body.success) {
        badRequest(res, body.error.issues[0]?.message ?? 'Données invalides')
        return
      }

      const event = await updateEvent(params.data.id, body.data)
      ok(res, event)
    } catch (error) {
      next(error)
    }
  }
)

eventsRouter.delete(
  '/:id',
  authenticate,
  requireRole('administrateur', 'coach'),
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const parsed = eventIdParamSchema.safeParse(req.params)
      if (!parsed.success) {
        badRequest(res, 'Paramètres invalides')
        return
      }

      await deleteEvent(parsed.data.id)
      res.status(200).json({ success: true, message: 'Événement supprimé.' })
    } catch (error) {
      next(error)
    }
  }
)

eventsRouter.get('/:id/registered', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      unauthorized(res)
      return
    }

    const parsed = eventIdParamSchema.safeParse(req.params)
    if (!parsed.success) {
      badRequest(res, 'Paramètres invalides')
      return
    }

    const registered = await isUserRegistered(parsed.data.id, req.user.userId)
    ok(res, registered)
  } catch (error) {
    next(error)
  }
})

eventsRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = eventIdParamSchema.safeParse(req.params)
    if (!parsed.success) {
      badRequest(res, 'Paramètres invalides')
      return
    }

    const event = await getEventById(parsed.data.id)
    ok(res, event)
  } catch (error) {
    next(error)
  }
})
