import { NextFunction, Response, Router } from 'express'
import { authenticate, AuthRequest } from '../../middleware/auth.middleware'
import { badRequest, created, ok, unauthorized } from '../../utils/response'
import {
  cancelParticipation,
  getMyParticipations,
  registerForEvent,
} from './participations.service'
import {
  createParticipationSchema,
  participationIdParamSchema,
} from './participations.schema'

export const participationsRouter = Router()

participationsRouter.get('/me', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      unauthorized(res)
      return
    }

    const participations = await getMyParticipations(req.user.userId)
    ok(res, participations)
  } catch (error) {
    next(error)
  }
})

participationsRouter.post('/', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      unauthorized(res)
      return
    }

    const parsed = createParticipationSchema.safeParse(req.body)
    if (!parsed.success) {
      badRequest(res, 'Données invalides')
      return
    }

    const participation = await registerForEvent(req.user.userId, parsed.data)
    created(res, participation, 'Inscription confirmée')
  } catch (error) {
    next(error)
  }
})

participationsRouter.patch('/:id/cancel', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      unauthorized(res)
      return
    }

    const parsed = participationIdParamSchema.safeParse(req.params)
    if (!parsed.success) {
      badRequest(res, 'Paramètres invalides')
      return
    }

    const participation = await cancelParticipation(req.user.userId, parsed.data.id)
    ok(res, participation, 'Participation annulée')
  } catch (error) {
    next(error)
  }
})
