import { create } from 'zustand'
import { User } from '../models/types'
import { login as apiLogin } from '../services/api'

interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null })
    try {
      const user = await apiLogin(email, password)
      set({ user, loading: false })
    } catch (e: any) {
      set({ error: e.message, loading: false })
    }
  },

  logout: () => set({ user: null, error: null }),
}))
