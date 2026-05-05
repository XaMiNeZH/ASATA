import { Prisma } from '@prisma/client'
import { prisma } from '../../config/database'
import { AppError } from '../../middleware/error.middleware'
import { serializeUser } from '../auth/auth.service'
import { UpdateProfilInput } from './profile.schema'

export const updateMyProfile = async (userId: string, input: UpdateProfilInput) => {
  const existingUser = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true },
  })

  if (!existingUser) {
    throw new AppError(404, 'Utilisateur introuvable')
  }

  const userData: Prisma.UserUpdateInput = {}
  if (input.nom !== undefined) {
    userData.nom = input.nom.trim()
  }

  const profilData: Prisma.ProfilUpdateInput = {
    ...(input.telephone !== undefined ? { telephone: input.telephone } : {}),
    ...(input.adresse !== undefined ? { adresse: input.adresse } : {}),
    ...(input.age !== undefined ? { age: input.age } : {}),
    ...(input.photo !== undefined ? { photo: input.photo } : {}),
  }

  const updatedUser = await prisma.$transaction(async (tx) => {
    if (Object.keys(userData).length > 0) {
      await tx.user.update({
        where: { id: userId },
        data: userData,
      })
    }

    await tx.profil.upsert({
      where: { userId },
      update: profilData,
      create: {
        userId,
        ...(input.telephone !== undefined ? { telephone: input.telephone } : {}),
        ...(input.adresse !== undefined ? { adresse: input.adresse } : {}),
        ...(input.age !== undefined ? { age: input.age } : {}),
        ...(input.photo !== undefined ? { photo: input.photo } : {}),
      },
    })

    return tx.user.findUnique({
      where: { id: userId },
      include: { profil: true },
    })
  })

  if (!updatedUser) {
    throw new AppError(404, 'Utilisateur introuvable')
  }

  return serializeUser(updatedUser)
}
