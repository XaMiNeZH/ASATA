import { Evenement } from '@prisma/client'
import { prisma } from '../../config/database'
import { AppError } from '../../middleware/error.middleware'

interface EventPayload {
  id: string
  titre: string
  description: string
  date: Date
  lieu: string
  capacite: number
  inscrits: number
  statut: string
  coverImage?: string
}

export const serializeEvent = (event: Evenement, inscrits: number): EventPayload => ({
  id: event.id,
  titre: event.titre,
  description: event.description,
  date: event.date,
  lieu: event.lieu,
  capacite: event.capacite,
  inscrits,
  statut: event.statut,
  ...(event.coverImage ? { coverImage: event.coverImage } : {}),
})

export const countConfirmedParticipations = async (eventId: string): Promise<number> =>
  prisma.participation.count({
    where: { evenementId: eventId, statut: 'confirme' },
  })

export const withInscrits = async (event: Evenement): Promise<EventPayload> => {
  const inscrits = await countConfirmedParticipations(event.id)
  return serializeEvent(event, inscrits)
}

export const listEvents = async (): Promise<EventPayload[]> => {
  const events = await prisma.evenement.findMany({
    orderBy: { date: 'asc' },
  })

  return Promise.all(events.map(withInscrits))
}

export const getEventById = async (id: string): Promise<EventPayload> => {
  const event = await prisma.evenement.findUnique({ where: { id } })

  if (!event) {
    throw new AppError(404, 'Événement introuvable')
  }

  return withInscrits(event)
}

export const isUserRegistered = async (eventId: string, userId: string): Promise<boolean> => {
  const event = await prisma.evenement.findUnique({
    where: { id: eventId },
    select: { id: true },
  })

  if (!event) {
    throw new AppError(404, 'Événement introuvable')
  }

  const participation = await prisma.participation.findFirst({
    where: {
      evenementId: eventId,
      userId,
      statut: { not: 'annule' },
    },
    select: { id: true },
  })

  return participation !== null
}
