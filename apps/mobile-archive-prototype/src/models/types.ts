export type Club = 'ski' | 'football' | 'athletisme'
export type Role = 'admin' | 'member'
export type AnnouncementCategory = 'general' | 'evenement' | 'competition' | 'entrainement' | 'urgent'

export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  phone?: string
  club: Club
  role: Role
  avatar?: string
  joinedAt: string
}

export interface Announcement {
  id: number
  title: string
  body: string
  category: AnnouncementCategory
  club?: Club | 'all'
  author: Pick<User, 'id' | 'firstName' | 'lastName'>
  pinned: boolean
  createdAt: string
  updatedAt: string
}

export interface Member {
  id: number
  firstName: string
  lastName: string
  email: string
  phone?: string
  club: Club
  role: Role
  active: boolean
  joinedAt: string
  avatar?: string
}
