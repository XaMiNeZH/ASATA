import { create } from 'zustand'
import { Member } from '../models/types'
import * as api from '../services/api'

interface MembersState {
  items: Member[]
  loading: boolean
  error: string | null
  fetch: () => Promise<void>
}

export const useMembersStore = create<MembersState>((set) => ({
  items: [],
  loading: false,
  error: null,

  fetch: async () => {
    set({ loading: true, error: null })
    try {
      const items = await api.getMembers()
      set({ items, loading: false })
    } catch (e: any) {
      set({ error: e.message, loading: false })
    }
  },
}))
