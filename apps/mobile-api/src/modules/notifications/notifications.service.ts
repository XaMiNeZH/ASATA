import { Notification } from '@prisma/client'
import { prisma } from '../../config/database'
import { AppError } from '../../middleware/error.middleware'

interface NotificationPayload {
  id: string
  userId: string
  message: string
  dateEnvoi: Date
  type: string
  lu: boolean
}

const serializeNotification = (notification: Notification): NotificationPayload => ({
  id: notification.id,
  userId: notification.userId,
  message: notification.message,
  dateEnvoi: notification.dateEnvoi,
  type: notification.type,
  lu: notification.lu,
})

export const getMyNotifications = async (userId: string): Promise<NotificationPayload[]> => {
  const notifications = await prisma.notification.findMany({
    where: { userId },
    orderBy: { dateEnvoi: 'desc' },
  })

  return notifications.map(serializeNotification)
}

export const markNotificationAsRead = async (
  userId: string,
  notificationId: string
): Promise<NotificationPayload> => {
  const notification = await prisma.notification.findFirst({
    where: { id: notificationId, userId },
  })

  if (!notification) {
    throw new AppError(404, 'Notification introuvable')
  }

  const updatedNotification = await prisma.notification.update({
    where: { id: notification.id },
    data: { lu: true },
  })

  return serializeNotification(updatedNotification)
}

export const markAllNotificationsAsRead = async (userId: string): Promise<{ count: number }> => {
  const result = await prisma.notification.updateMany({
    where: { userId, lu: false },
    data: { lu: true },
  })

  return { count: result.count }
}
