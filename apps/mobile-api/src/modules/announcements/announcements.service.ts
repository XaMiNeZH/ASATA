import { Annonce } from '@prisma/client'
import { prisma } from '../../config/database'
import { AppError } from '../../middleware/error.middleware'

interface AnnouncementPayload {
  id: string
  titre: string
  contenu: string
  datePublication: Date
  visible: boolean
}

const serializeAnnouncement = (announcement: Annonce): AnnouncementPayload => ({
  id: announcement.id,
  titre: announcement.titre,
  contenu: announcement.contenu,
  datePublication: announcement.datePublication,
  visible: announcement.visible,
})

export const listAnnouncements = async (): Promise<AnnouncementPayload[]> => {
  const announcements = await prisma.annonce.findMany({
    where: { visible: true },
    orderBy: { datePublication: 'desc' },
  })

  return announcements.map(serializeAnnouncement)
}

export const getAnnouncementById = async (id: string): Promise<AnnouncementPayload> => {
  const announcement = await prisma.annonce.findFirst({
    where: { id, visible: true },
  })

  if (!announcement) {
    throw new AppError(404, 'Annonce introuvable')
  }

  return serializeAnnouncement(announcement)
}
