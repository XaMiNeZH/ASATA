import { Announcement, Member, User } from '../models/types'
import { MOCK_ANNOUNCEMENTS, MOCK_MEMBERS } from './mockData'

const delay = (ms = 600) => new Promise(r => setTimeout(r, ms))

// ── Auth ─────────────────────────────────────────────────
export async function login(email: string, password: string): Promise<User> {
  await delay()
  const member = MOCK_MEMBERS.find(m => m.email === email)
  if (!member || password !== 'asata2026') {
    throw new Error('Email ou mot de passe incorrect.')
  }
  return { ...member }
}

// ── Announcements ────────────────────────────────────────
export async function getAnnouncements(): Promise<Announcement[]> {
  await delay()
  return [...MOCK_ANNOUNCEMENTS].sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })
}

export async function getAnnouncement(id: number): Promise<Announcement> {
  await delay(300)
  const ann = MOCK_ANNOUNCEMENTS.find(a => a.id === id)
  if (!ann) throw new Error('Annonce introuvable.')
  return ann
}

export async function createAnnouncement(
  data: Pick<Announcement, 'title' | 'body' | 'category' | 'club' | 'pinned'>,
  author: Pick<User, 'id' | 'firstName' | 'lastName'>
): Promise<Announcement> {
  await delay(800)
  const newAnn: Announcement = {
    ...data,
    id: Date.now(),
    author,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  MOCK_ANNOUNCEMENTS.unshift(newAnn)
  return newAnn
}

// ── Members ──────────────────────────────────────────────
export async function getMembers(): Promise<Member[]> {
  await delay()
  return [...MOCK_MEMBERS]
}

export async function getMember(id: number): Promise<Member> {
  await delay(300)
  const member = MOCK_MEMBERS.find(m => m.id === id)
  if (!member) throw new Error('Membre introuvable.')
  return member
}
