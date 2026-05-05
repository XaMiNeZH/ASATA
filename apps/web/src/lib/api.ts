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

// ── gallery ───────────────────────────────────────────────────────────────────

export interface ApiPhoto {
  id: string
  src: string
  caption?: string | null
  category: string
  createdAt: string
}

export const galleryApi = {
  list: (category?: string) => {
    const qs = category && category !== 'all' ? `?category=${category}` : ''
    return request<ApiPhoto[]>(`/api/gallery${qs}`)
  },
  create: (data: { src: string; caption?: string | null; category: string }) =>
    request<ApiPhoto>('/api/gallery', { method: 'POST', body: JSON.stringify(data) }),
  delete: (id: string) =>
    request<null>(`/api/gallery/${id}`, { method: 'DELETE' }),
}

// ── donations (admin) ─────────────────────────────────────────────────────────

export interface ApiDonation {
  id: string
  reference: string
  amount: number
  currency: string
  method: string
  status: string
  donorName: string
  donorEmail: string
  createdAt: string
}

export interface DonationStats {
  totalDonations: number
  confirmedCount: number
  confirmedTotal: number
  byMethod: { method: string; count: number; total: number }[]
}

export const donationsAdminApi = {
  list: (params?: { status?: string; method?: string; page?: number }) => {
    const q = new URLSearchParams()
    if (params?.status) q.set('status', params.status)
    if (params?.method) q.set('method', params.method)
    if (params?.page)   q.set('page',   String(params.page))
    const qs = q.toString() ? `?${q}` : ''
    return request<{ donations: ApiDonation[]; pagination: { total: number; page: number; totalPages: number } }>(`/api/donations${qs}`)
  },
  stats: () => request<DonationStats>('/api/donations/stats'),
  updateStatus: (id: string, status: string) =>
    request<ApiDonation>(`/api/donations/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
}
