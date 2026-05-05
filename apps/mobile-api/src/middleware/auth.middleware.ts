import { NextFunction, Request, Response } from 'express'
import { verifyToken, JwtPayload } from '../utils/jwt'
import { forbidden, unauthorized } from '../utils/response'

export interface AuthRequest extends Request {
  user?: JwtPayload
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const header = req.headers.authorization
  if (!header?.startsWith('Bearer ')) {
    unauthorized(res)
    return
  }

  const token = header.split(' ')[1]
  try {
    req.user = verifyToken(token)
    next()
  } catch {
    unauthorized(res, 'Token invalide ou expiré')
  }
}

export const requireRole = (...roles: string[]) =>
  (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      forbidden(res)
      return
    }

    next()
  }
