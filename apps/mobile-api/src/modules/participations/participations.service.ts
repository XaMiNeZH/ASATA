import { Evenement, Participation } from '@prisma/client'
import { prisma } from '../../config/database'
import { AppError } from '../../middleware/error.middleware'
import { serializeEvent } from '../events/events.service'
import { CreateParticipationInput } from './participations.schema'

const CONFIRMED_STATUS = 'confirme'
const CANCELLED_STATUS = 'annule'
const FINISHED_EVENT_STATUS = 'termine'
const CANCELLED_EVENT_STATUS = 'annule'
const DEFAULT_PRESENCE = 'non_renseigne'

type ParticipationWithEvent = Participation & { evenement: Evenement }

interface ParticipationPayload {
  id: string
  userId: string
  evenementId: string
  evenement?: ReturnType<typeof serializeEvent>
  dateInscription: Date
  statut: string
  presence: string
}

const serializeParticipation = async (
  participation: ParticipationWithEvent
): Promise<ParticipationPayload> => {
  const inscrits = await prisma.participation.count({
    where: { evenementId: participation.evenementId, statut: CONFIRMED_STATUS },
  })

  return {
    id: participation.id,
    userId: participation.userId,
    evenementId: participation.evenementId,
    evenement: serializeEvent(participation.evenement, inscrits),
    dateInscription: participation.dateInscription,
    statut: participation.statut,
    presence: participation.presence,
  }
}

export const getMyParticipations = async (userId: string): Promise<ParticipationPayload[]> => {
  const participations = await prisma.participation.findMany({
    where: { userId },
    include: { evenement: true },
    orderBy: { dateInscription: 'desc' },
  })

  return Promise.all(participations.map(serializeParticipation))
}

export const registerForEvent = async (
  userId: string,
  input: CreateParticipationInput
): Promise<ParticipationPayload> => {
  const event = await prisma.evenement.findUnique({ where: { id: input.evenementId } })

  if (!event) {
    throw new AppError(404, 'Événement introuvable')
  }

  if ([CANCELLED_EVENT_STATUS, FINISHED_EVENT_STATUS].includes(event.statut)) {
    throw new AppError(409, 'Événement indisponible')
  }

  const existingParticipation = await prisma.participation.findUnique({
    where: {
      userId_evenementId: {
        userId,
        evenementId: input.evenementId,
      },
    },
  })

  if (existingParticipation) {
    throw new AppError(409, 'Déjà inscrit à cet événement')
  }

  const participation = await prisma.$transaction(async (tx) => {
    const inscrits = await tx.participation.count({
      where: { evenementId: event.id, statut: CONFIRMED_STATUS },
    })

    if (inscrits >= event.capacite) {
      throw new AppError(409, 'Événement complet')
    }

    const createdParticipation = await tx.participation.create({
      data: {
        userId,
        evenementId: event.id,
        statut: CONFIRMED_STATUS,
        presence: DEFAULT_PRESENCE,
      },
      include: { evenement: true },
    })

    await tx.notification.create({
      data: {
        userId,
        type: 'event_confirmation',
        message: `Votre inscription à ${event.titre} est confirmée.`,
      },
    })

    return createdParticipation
  })

  return serializeParticipation(participation)
}

export const cancelParticipation = async (
  userId: string,
  participationId: string
): Promise<ParticipationPayload> => {
  const participation = await prisma.participation.findFirst({
    where: { id: participationId, userId },
    include: { evenement: true },
  })

  if (!participation) {
    throw new AppError(404, 'Participation introuvable')
  }

  if (participation.statut === CANCELLED_STATUS) {
    throw new AppError(409, 'Participation déjà annulée')
  }

  const updatedParticipation = await prisma.$transaction(async (tx) => {
    const updated = await tx.participation.update({
      where: { id: participation.id },
      data: { statut: CANCELLED_STATUS },
      include: { evenement: true },
    })

    await tx.notification.create({
      data: {
        userId,
        type: 'event_cancelled',
        message: `Votre participation à ${participation.evenement.titre} a été annulée.`,
      },
    })

    return updated
  })

  return serializeParticipation(updatedParticipation)
}
