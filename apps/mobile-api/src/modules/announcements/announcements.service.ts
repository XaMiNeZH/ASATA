import { Annonce } from '@prisma/client'
import { prisma } from '../../config/database'
import { AppError } from '../../middleware/error.middleware'

export interface AnnouncementPayload {
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

export interface CreateAnnouncementInput {
  titre: string
  contenu: string
  visible: boolean
}

export type UpdateAnnouncementInput = Partial<CreateAnnouncementInput>

export const createAnnouncement = async (data: CreateAnnouncementInput): Promise<AnnouncementPayload> => {
  const announcement = await prisma.annonce.create({
    data: {
      titre: data.titre,
      contenu: data.contenu,
      visible: data.visible,
      datePublication: new Date(),
    },
  })

  return serializeAnnouncement(announcement)
}

export const updateAnnouncement = async (
  id: string,
  data: UpdateAnnouncementInput
): Promise<AnnouncementPayload> => {
  const announcement = await prisma.annonce.findUnique({
    where: { id },
    select: { id: true },
  })

  if (!announcement) {
    throw new AppError(404, 'Annonce introuvable')
  }

  const updated = await prisma.annonce.update({
    where: { id },
    data,
  })

  return serializeAnnouncement(updated)
}

export const deleteAnnouncement = async (id: string): Promise<void> => {
  const announcement = await prisma.annonce.findUnique({
    where: { id },
    select: { id: true },
  })

  if (!announcement) {
    throw new AppError(404, 'Annonce introuvable')
  }

  await prisma.annonce.delete({ where: { id } })
}
