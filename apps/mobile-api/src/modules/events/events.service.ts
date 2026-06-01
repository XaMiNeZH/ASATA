import { Evenement } from '@prisma/client'
import { prisma } from '../../config/database'
import { AppError } from '../../middleware/error.middleware'
import { CreateEventInput, UpdateEventInput } from './events.schema'

export interface EventWithInscrits {
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

export const serializeEvent = (event: Evenement, inscrits: number): EventWithInscrits => ({
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

export const withInscrits = async (event: Evenement): Promise<EventWithInscrits> => {
  const inscrits = await countConfirmedParticipations(event.id)
  return serializeEvent(event, inscrits)
}

export const listEvents = async (): Promise<EventWithInscrits[]> => {
  const events = await prisma.evenement.findMany({
    orderBy: { date: 'asc' },
  })

  return Promise.all(events.map(withInscrits))
}

export const getEventById = async (id: string): Promise<EventWithInscrits> => {
  const event = await prisma.evenement.findUnique({ where: { id } })

  if (!event) {
    throw new AppError(404, 'Événement introuvable')
  }

  return withInscrits(event)
}

export const createEvent = async (data: CreateEventInput): Promise<EventWithInscrits> => {
  const event = await prisma.evenement.create({
    data: {
      titre: data.titre,
      description: data.description,
      date: new Date(data.date),
      lieu: data.lieu,
      capacite: data.capacite,
      statut: data.statut,
      coverImage: data.coverImage,
    },
  })

  return serializeEvent(event, 0)
}

export const updateEvent = async (id: string, data: UpdateEventInput): Promise<EventWithInscrits> => {
  const event = await prisma.evenement.findUnique({
    where: { id },
    select: { id: true },
  })

  if (!event) {
    throw new AppError(404, 'Événement introuvable')
  }

  const updated = await prisma.evenement.update({
    where: { id },
    data: {
      ...(data.titre !== undefined ? { titre: data.titre } : {}),
      ...(data.description !== undefined ? { description: data.description } : {}),
      ...(data.date !== undefined ? { date: new Date(data.date) } : {}),
      ...(data.lieu !== undefined ? { lieu: data.lieu } : {}),
      ...(data.capacite !== undefined ? { capacite: data.capacite } : {}),
      ...(data.statut !== undefined ? { statut: data.statut } : {}),
      ...(data.coverImage !== undefined ? { coverImage: data.coverImage } : {}),
    },
  })

  return withInscrits(updated)
}

export const deleteEvent = async (id: string): Promise<void> => {
  const event = await prisma.evenement.findUnique({
    where: { id },
    select: { id: true },
  })

  if (!event) {
    throw new AppError(404, 'Événement introuvable')
  }

  await prisma.evenement.delete({ where: { id } })
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
