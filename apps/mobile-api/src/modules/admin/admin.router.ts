import { NextFunction, Response, Router } from 'express'
import { prisma } from '../../config/database'
import { authenticate, AuthRequest, requireRole } from '../../middleware/auth.middleware'
import { ok } from '../../utils/response'

export const adminRouter = Router()

adminRouter.get(
  '/members',
  authenticate,
  requireRole('administrateur'),
  async (_req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const members = await prisma.user.findMany({
        orderBy: { dateCreation: 'desc' },
        select: {
          id: true,
          nom: true,
          email: true,
          role: true,
          dateCreation: true,
          statut: true,
          profil: {
            select: {
              age: true,
              telephone: true,
              adresse: true,
              photo: true,
            },
          },
        },
      })

      ok(res, members)
    } catch (error) {
      next(error)
    }
  }
)

adminRouter.get(
  '/stats',
  authenticate,
  requireRole('administrateur', 'coach'),
  async (_req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const [
        totalMembers,
        totalEvents,
        upcomingEvents,
        totalParticipations,
        totalAnnouncements,
      ] = await Promise.all([
        prisma.user.count(),
        prisma.evenement.count(),
        prisma.evenement.count({ where: { statut: 'planifie' } }),
        prisma.participation.count({ where: { statut: 'confirme' } }),
        prisma.annonce.count({ where: { visible: true } }),
      ])

      ok(res, {
        totalMembers,
        totalEvents,
        upcomingEvents,
        totalParticipations,
        totalAnnouncements,
      })
    } catch (error) {
      next(error)
    }
  }
)
