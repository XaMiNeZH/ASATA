import bcrypt from 'bcryptjs'
import { Profil, User } from '@prisma/client'
import { prisma } from '../../config/database'
import { AppError } from '../../middleware/error.middleware'
import { signToken } from '../../utils/jwt'
import { LoginInput, RegisterInput } from './auth.schema'

const MEMBER_ROLE = 'membre'
const ACTIVE_STATUS = 'actif'

type UserWithProfil = User & { profil: Profil | null }

interface ProfilPayload {
  id: string
  userId: string
  age?: number
  telephone?: string
  adresse?: string
  photo?: string
}

interface UserPayload {
  id: string
  nom: string
  email: string
  role: string
  dateCreation: Date
  dateInscription?: Date
  statut?: string
  specialite?: string
  experience?: number
  niveau?: number
  profil: ProfilPayload | null
}

export interface AuthResult {
  token: string
  user: UserPayload
}

const serializeProfil = (profil: Profil | null): ProfilPayload | null => {
  if (!profil) return null

  return {
    id: profil.id,
    userId: profil.userId,
    ...(profil.age !== null ? { age: profil.age } : {}),
    ...(profil.telephone !== null ? { telephone: profil.telephone } : {}),
    ...(profil.adresse !== null ? { adresse: profil.adresse } : {}),
    ...(profil.photo !== null ? { photo: profil.photo } : {}),
  }
}

export const serializeUser = (user: UserWithProfil): UserPayload => {
  const { motDePasseHash: _motDePasseHash } = user

  return {
    id: user.id,
    nom: user.nom,
    email: user.email,
    role: user.role,
    dateCreation: user.dateCreation,
    ...(user.role === MEMBER_ROLE && user.dateInscription ? { dateInscription: user.dateInscription } : {}),
    ...(user.role === MEMBER_ROLE && user.statut ? { statut: user.statut } : {}),
    ...(user.specialite ? { specialite: user.specialite } : {}),
    ...(user.experience !== null ? { experience: user.experience } : {}),
    ...(user.niveau !== null ? { niveau: user.niveau } : {}),
    profil: serializeProfil(user.profil),
  }
}

const buildAuthResult = (user: UserWithProfil): AuthResult => ({
  token: signToken({ userId: user.id, role: user.role, email: user.email }),
  user: serializeUser(user),
})

export const register = async (input: RegisterInput): Promise<AuthResult> => {
  const email = input.email.trim().toLowerCase()
  const existingUser = await prisma.user.findUnique({ where: { email } })

  if (existingUser) {
    throw new AppError(409, 'Cet email est déjà utilisé')
  }

  const motDePasseHash = await bcrypt.hash(input.motDePasse, 12)
  const now = new Date()

  const user = await prisma.$transaction((tx) =>
    tx.user.create({
      data: {
        nom: input.nom.trim(),
        email,
        motDePasseHash,
        role: MEMBER_ROLE,
        dateInscription: now,
        statut: ACTIVE_STATUS,
        profil: {
          create: {
            ...(input.telephone ? { telephone: input.telephone } : {}),
          },
        },
      },
      include: { profil: true },
    })
  )

  return buildAuthResult(user)
}

export const login = async (input: LoginInput): Promise<AuthResult> => {
  const email = input.email.trim().toLowerCase()
  const user = await prisma.user.findUnique({
    where: { email },
    include: { profil: true },
  })

  if (!user) {
    throw new AppError(401, 'Identifiants incorrects')
  }

  const isValidPassword = await bcrypt.compare(input.motDePasse, user.motDePasseHash)
  if (!isValidPassword) {
    throw new AppError(401, 'Identifiants incorrects')
  }

  return buildAuthResult(user)
}

export const getMe = async (userId: string): Promise<UserPayload> => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { profil: true },
  })

  if (!user) {
    throw new AppError(404, 'Utilisateur introuvable')
  }

  return serializeUser(user)
}
