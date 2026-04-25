import { create } from 'zustand'

interface UnreadState {
  count: number
  readIds: Set<number>
  markRead: (id: number) => void
  setTotal: (total: number) => void
}

export const useUnreadStore = create<UnreadState>((set, get) => ({
  count: 0,
  readIds: new Set(),
  setTotal: (total: number) => {
    const unread = total - get().readIds.size
    set({ count: Math.max(0, unread) })
  },
  markRead: (id: number) => {
    const readIds = new Set(get().readIds)
    readIds.add(id)
    set({ readIds, count: Math.max(0, get().count - 1) })
  },
}))
