import { NextFunction, Response, Router } from 'express'
import { z } from 'zod'
import { authenticate, AuthRequest } from '../../middleware/auth.middleware'
import { badRequest, ok, unauthorized } from '../../utils/response'
import {
  getMyNotifications,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from './notifications.service'

export const notificationsRouter = Router()

const notificationIdParamSchema = z.object({
  id: z.string().min(1),
})

notificationsRouter.get('/me', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      unauthorized(res)
      return
    }

    const notifications = await getMyNotifications(req.user.userId)
    ok(res, notifications)
  } catch (error) {
    next(error)
  }
})

notificationsRouter.patch('/me/read-all', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      unauthorized(res)
      return
    }

    const result = await markAllNotificationsAsRead(req.user.userId)
    ok(res, result, 'Notifications marquées comme lues')
  } catch (error) {
    next(error)
  }
})

notificationsRouter.patch('/:id/read', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      unauthorized(res)
      return
    }

    const parsed = notificationIdParamSchema.safeParse(req.params)
    if (!parsed.success) {
      badRequest(res, 'Paramètres invalides')
      return
    }

    const notification = await markNotificationAsRead(req.user.userId, parsed.data.id)
    ok(res, notification, 'Notification marquée comme lue')
  } catch (error) {
    next(error)
  }
})
