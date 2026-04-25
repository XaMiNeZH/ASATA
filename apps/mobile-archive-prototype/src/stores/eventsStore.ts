import { create } from 'zustand'
import { Event, MOCK_EVENTS } from '../services/mockEvents'

interface EventsState {
  items: Event[]
  loading: boolean
  fetch: () => Promise<void>
}

export const useEventsStore = create<EventsState>((set) => ({
  items: [],
  loading: false,
  fetch: async () => {
    set({ loading: true })
    await new Promise(r => setTimeout(r, 500))
    set({ items: MOCK_EVENTS, loading: false })
  },
}))
