import { NextFunction, Request, Response, Router } from 'express'
import { authenticate, AuthRequest } from '../../middleware/auth.middleware'
import { badRequest, ok, unauthorized } from '../../utils/response'
import { eventIdParamSchema } from './events.schema'
import { getEventById, isUserRegistered, listEvents } from './events.service'

export const eventsRouter = Router()

eventsRouter.get('/', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const events = await listEvents()
    ok(res, events)
  } catch (error) {
    next(error)
  }
})

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
