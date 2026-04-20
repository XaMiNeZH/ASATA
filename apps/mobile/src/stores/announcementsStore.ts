import { create } from 'zustand'
import { Announcement, User } from '../models/types'
import * as api from '../services/api'

interface AnnouncementsState {
  items: Announcement[]
  loading: boolean
  error: string | null
  fetch: () => Promise<void>
  create: (
    data: Pick<Announcement, 'title' | 'body' | 'category' | 'club' | 'pinned'>,
    author: Pick<User, 'id' | 'firstName' | 'lastName'>
  ) => Promise<void>
}

export const useAnnouncementsStore = create<AnnouncementsState>((set, get) => ({
  items: [],
  loading: false,
  error: null,

  fetch: async () => {
    set({ loading: true, error: null })
    try {
      const items = await api.getAnnouncements()
      set({ items, loading: false })
    } catch (e: any) {
      set({ error: e.message, loading: false })
    }
  },

  create: async (data, author) => {
    set({ loading: true, error: null })
    try {
      const newAnn = await api.createAnnouncement(data, author)
      set({ items: [newAnn, ...get().items], loading: false })
    } catch (e: any) {
      set({ error: e.message, loading: false })
    }
  },
}))
