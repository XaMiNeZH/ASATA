import { NextFunction, Request, Response, Router } from 'express'
import { authenticate, AuthRequest } from '../../middleware/auth.middleware'
import { badRequest, created, ok, unauthorized } from '../../utils/response'
import { getMe, login, register } from './auth.service'
import { loginSchema, registerSchema } from './auth.schema'

export const authRouter = Router()

authRouter.post('/register', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = registerSchema.safeParse(req.body)
    if (!parsed.success) {
      badRequest(res, 'Données invalides')
      return
    }

    const result = await register(parsed.data)
    created(res, result, 'Inscription réussie')
  } catch (error) {
    next(error)
  }
})

authRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = loginSchema.safeParse(req.body)
    if (!parsed.success) {
      badRequest(res, 'Données invalides')
      return
    }

    const result = await login(parsed.data)
    ok(res, result, 'Connexion réussie')
  } catch (error) {
    next(error)
  }
})

authRouter.get('/me', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      unauthorized(res)
      return
    }

    const user = await getMe(req.user.userId)
    ok(res, user)
  } catch (error) {
    next(error)
  }
})

authRouter.post('/logout', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      unauthorized(res)
      return
    }

    ok(res, null, 'Déconnexion confirmée')
  } catch (error) {
    next(error)
  }
})
