import bcrypt from 'bcryptjs'
import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const PASSWORD = 'asata2026'
const CONFIRMED_STATUS = 'confirme'
const eventTargetCounts: Record<string, number> = { e1: 22, e2: 17, e3: 30, e4: 18, e5: 15, e6: 37, e7: 12 }

const userData = (passwordHash: string): Prisma.UserCreateInput[] => [
  { id: 'u1', nom: 'Youssef Benali', email: 'youssef@asata.ma', motDePasseHash: passwordHash, role: 'membre', dateCreation: new Date('2024-09-01T09:00:00.000Z'), dateInscription: new Date('2024-09-01T00:00:00.000Z'), statut: 'actif', profil: { create: { id: 'p1', age: 22, telephone: '0661234567', adresse: 'Casablanca, Maroc' } } },
  { id: 'u2', nom: 'Samira El Idrissi', email: 'coach@asata.ma', motDePasseHash: passwordHash, role: 'coach', dateCreation: new Date('2023-10-15T10:30:00.000Z'), specialite: 'Athletisme', experience: 8, profil: { create: { id: 'p2', age: 34, telephone: '0667654321', adresse: 'Marrakech, Maroc' } } },
  { id: 'u3', nom: 'Omar Ait Lahcen', email: 'admin@asata.ma', motDePasseHash: passwordHash, role: 'administrateur', dateCreation: new Date('2023-05-20T08:00:00.000Z'), niveau: 2, profil: { create: { id: 'p3', age: 41, telephone: '0677001122', adresse: 'Asni, Maroc' } } },
]

const events: Prisma.EvenementCreateManyInput[] = [
  { id: 'e1', titre: 'Tournoi de Football Regional', description: 'Rencontre regionale ouverte aux membres ASATA et aux clubs partenaires.', date: new Date('2026-05-10T09:00:00.000Z'), lieu: 'Stade municipal de Tahannaout', capacite: 40, statut: 'planifie' },
  { id: 'e2', titre: 'Stage de Natation Estival', description: 'Stage encadre pour ameliorer l endurance, la respiration et la securite aquatique.', date: new Date('2026-06-18T08:30:00.000Z'), lieu: 'Piscine semi-olympique de Marrakech', capacite: 24, statut: 'planifie' },
  { id: 'e3', titre: "Competition d'Athletisme Atlas", description: 'Courses, sauts et relais avec classement par categorie.', date: new Date('2026-05-24T07:45:00.000Z'), lieu: 'Piste Atlas, Marrakech', capacite: 30, statut: 'planifie' },
  { id: 'e4', titre: 'Journee Sportive ASATA', description: 'Journee associative reportee suite aux conditions meteorologiques.', date: new Date('2026-04-30T10:00:00.000Z'), lieu: 'Complexe sportif Al Haouz', capacite: 60, statut: 'annule' },
  { id: 'e5', titre: 'Seance de Yoga en Plein Air', description: 'Seance de recuperation et mobilite pour les adherents.', date: new Date('2026-03-12T08:00:00.000Z'), lieu: 'Parc Lalla Hasna, Marrakech', capacite: 20, statut: 'termine' },
  { id: 'e6', titre: "Marathon de l'Atlas", description: 'Sortie endurance en montagne avec encadrement et points de ravitaillement.', date: new Date('2026-04-25T08:00:00.000Z'), lieu: 'Vallee d Asni', capacite: 50, statut: 'en_cours' },
  { id: 'e7', titre: 'Randonee Sportive Toubkal', description: 'Parcours de preparation physique avec sensibilisation au respect de la montagne.', date: new Date('2026-07-04T06:30:00.000Z'), lieu: 'Imlil, Haut Atlas', capacite: 35, statut: 'planifie' },
]

const participations: Prisma.ParticipationCreateManyInput[] = [
  { id: 'p1', userId: 'u1', evenementId: 'e1', dateInscription: new Date('2026-04-12T11:00:00.000Z'), statut: 'confirme', presence: 'non_renseigne' },
  { id: 'p2', userId: 'u1', evenementId: 'e4', dateInscription: new Date('2026-04-05T14:15:00.000Z'), statut: 'annule', presence: 'absent' },
  { id: 'p3', userId: 'u1', evenementId: 'e2', dateInscription: new Date('2026-04-20T16:30:00.000Z'), statut: 'en_attente', presence: 'non_renseigne' },
  { id: 'p4', userId: 'u1', evenementId: 'e5', dateInscription: new Date('2026-03-01T09:45:00.000Z'), statut: 'confirme', presence: 'present' },
]

const announcements: Prisma.AnnonceCreateManyInput[] = [
  { id: 'a1', titre: 'Ouverture des inscriptions estivales', contenu: 'Les inscriptions pour les activites de natation et de preparation physique sont ouvertes.', datePublication: new Date('2026-04-21T09:00:00.000Z'), visible: true },
  { id: 'a2', titre: 'Reunion des membres ASATA', contenu: 'Une reunion d information aura lieu au siege de l association pour presenter le programme.', datePublication: new Date('2026-04-18T18:30:00.000Z'), visible: true },
  { id: 'a3', titre: 'Collecte du materiel sportif', contenu: 'Les membres peuvent deposer les dons de materiel sportif chaque samedi matin.', datePublication: new Date('2026-04-10T10:15:00.000Z'), visible: true },
  { id: 'a4', titre: 'Planning des entrainements de mai', contenu: 'Le planning des entrainements de football, athletisme et montagne est disponible.', datePublication: new Date('2026-04-02T08:45:00.000Z'), visible: true },
]

const notifications: Prisma.NotificationCreateManyInput[] = [
  { id: 'n1', userId: 'u1', message: 'Votre inscription au Tournoi de Football Regional est confirmee.', dateEnvoi: new Date('2026-04-24T12:00:00.000Z'), type: 'event_confirmation', lu: false },
  { id: 'n2', userId: 'u1', message: 'La Journee Sportive ASATA a ete annulee.', dateEnvoi: new Date('2026-04-23T15:15:00.000Z'), type: 'event_cancelled', lu: false },
  { id: 'n3', userId: 'u1', message: 'Nouvelle annonce: Ouverture des inscriptions estivales.', dateEnvoi: new Date('2026-04-21T09:05:00.000Z'), type: 'announcement', lu: true },
  { id: 'n4', userId: 'u1', message: 'Rappel: Marathon de l Atlas demain matin.', dateEnvoi: new Date('2026-04-24T08:00:00.000Z'), type: 'reminder', lu: false },
  { id: 'n5', userId: 'u1', message: 'Votre participation au stage de natation est en attente.', dateEnvoi: new Date('2026-04-20T17:00:00.000Z'), type: 'event_confirmation', lu: true },
]

async function deleteAllData(): Promise<void> {
  await prisma.notification.deleteMany()
  await prisma.participation.deleteMany()
  await prisma.profil.deleteMany()
  await prisma.user.deleteMany()
  await prisma.annonce.deleteMany()
  await prisma.evenement.deleteMany()
  console.log('✅ Existing data deleted')
}

async function createCountUsers(passwordHash: string) {
  return Promise.all(Array.from({ length: 37 }, (_, index) => {
    const padded = (index + 1).toString().padStart(2, '0')
    return prisma.user.create({ data: { id: `seed-member-${padded}`, nom: `Seed Member ${padded}`, email: `seed.member.${padded}@asata.ma`, motDePasseHash: passwordHash, role: 'membre', dateCreation: new Date('2026-04-01T08:00:00.000Z'), dateInscription: new Date('2026-04-01T08:00:00.000Z'), statut: 'actif' } })
  }))
}

async function createMockUsers(passwordHash: string): Promise<void> {
  for (const user of userData(passwordHash)) {
    await prisma.user.create({ data: user })
  }
  console.log('✅ Users created')
}

async function createParticipations(passwordHash: string): Promise<void> {
  const countUsers = await createCountUsers(passwordHash)
  await prisma.participation.createMany({ data: participations })

  for (const [eventId, targetCount] of Object.entries(eventTargetCounts)) {
    const currentCount = await prisma.participation.count({ where: { evenementId: eventId, statut: CONFIRMED_STATUS } })
    for (let index = currentCount; index < targetCount; index += 1) {
      await prisma.participation.create({ data: { id: `pc-${eventId}-${index + 1}`, userId: countUsers[index].id, evenementId: eventId, dateInscription: new Date('2026-04-01T09:00:00.000Z'), statut: CONFIRMED_STATUS, presence: 'non_renseigne' } })
    }
  }

  console.log('✅ Participations created')
}

async function main(): Promise<void> {
  const passwordHash = await bcrypt.hash(PASSWORD, 12)
  await deleteAllData()
  await createMockUsers(passwordHash)
  await prisma.evenement.createMany({ data: events })
  console.log('✅ Events created')
  await createParticipations(passwordHash)
  await prisma.annonce.createMany({ data: announcements })
  console.log('✅ Announcements created')
  await prisma.notification.createMany({ data: notifications })
  console.log('✅ Notifications created')
  console.log('✅ Seed completed')
}

main()
  .catch((error) => {
    console.error('❌ Seed failed', error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
