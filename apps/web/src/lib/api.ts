const BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3001'

// ── helpers ───────────────────────────────────────────────────────────────────

function authHeaders(): HeadersInit {
  const token = localStorage.getItem('asata_admin_token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...authHeaders(), ...init.headers },
    ...init,
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.message ?? `HTTP ${res.status}`)
  return json.data as T
}

// ── auth ─────────────────────────────────────────────────────────────────────

export const authApi = {
  login: (email: string, password: string) =>
    request<{ token: string; email: string }>('/api/admin/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  me: () =>
    request<{ id: string; email: string }>('/api/admin/me'),
}

// ── events ────────────────────────────────────────────────────────────────────

export interface ApiEvent {
  id: string
  title: string
  subtitle?: string | null
  date: string
  endDate?: string | null
  location: string
  locationDetail?: string | null
  sport: string
  category: string
  status: string
  description: string
  result?: string | null
  highlight: boolean
  image?: string | null
  createdAt: string
  updatedAt: string
}

export type EventPayload = Omit<ApiEvent, 'id' | 'createdAt' | 'updatedAt'>

export const eventsApi = {
  list: (params?: { status?: string; sport?: string }) => {
    const q = new URLSearchParams()
    if (params?.status) q.set('status', params.status)
    if (params?.sport)  q.set('sport',  params.sport)
    const qs = q.toString() ? `?${q}` : ''
    return request<ApiEvent[]>(`/api/events${qs}`)
  },

  get: (id: string) =>
    request<ApiEvent>(`/api/events/${id}`),

  create: (data: EventPayload) =>
    request<ApiEvent>('/api/events', { method: 'POST', body: JSON.stringify(data) }),

  update: (id: string, data: Partial<EventPayload>) =>
    request<ApiEvent>(`/api/events/${id}`, { method: 'PUT', body: JSON.stringify(data) }),

  delete: (id: string) =>
    request<null>(`/api/events/${id}`, { method: 'DELETE' }),
}
