import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { authApi } from '../lib/api'

interface Admin { id: string; email: string }

interface AdminAuthCtx {
  admin:   Admin | null
  loading: boolean
  login:   (email: string, password: string) => Promise<void>
  logout:  () => void
}

const Ctx = createContext<AdminAuthCtx | null>(null)

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [admin,   setAdmin]   = useState<Admin | null>(null)
  const [loading, setLoading] = useState(true)

  // Restore session on mount
  useEffect(() => {
    const token = localStorage.getItem('asata_admin_token')
    if (!token) { setLoading(false); return }

    authApi.me()
      .then(a => setAdmin(a))
      .catch(() => localStorage.removeItem('asata_admin_token'))
      .finally(() => setLoading(false))
  }, [])

  async function login(email: string, password: string) {
    const { token, email: adminEmail } = await authApi.login(email, password)
    localStorage.setItem('asata_admin_token', token)
    const me = await authApi.me()
    setAdmin(me)
  }

  function logout() {
    localStorage.removeItem('asata_admin_token')
    setAdmin(null)
  }

  return (
    <Ctx.Provider value={{ admin, loading, login, logout }}>
      {children}
    </Ctx.Provider>
  )
}

export function useAdminAuth() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useAdminAuth must be used inside AdminAuthProvider')
  return ctx
}
