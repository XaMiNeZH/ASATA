import { NextFunction, Response, Router } from 'express'
import { authenticate, AuthRequest } from '../../middleware/auth.middleware'
import { badRequest, ok, unauthorized } from '../../utils/response'
import { updateMyProfile } from './profile.service'
import { updateProfilSchema } from './profile.schema'

export const profileRouter = Router()

profileRouter.patch('/me', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      unauthorized(res)
      return
    }

    const parsed = updateProfilSchema.safeParse(req.body)
    if (!parsed.success) {
      badRequest(res, 'Données invalides')
      return
    }

    const user = await updateMyProfile(req.user.userId, parsed.data)
    ok(res, user, 'Profil mis à jour')
  } catch (error) {
    next(error)
  }
})
