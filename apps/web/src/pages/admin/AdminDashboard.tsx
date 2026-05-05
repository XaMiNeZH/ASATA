import { useState, useEffect, FormEvent } from 'react'
import { useAdminAuth } from '../../context/AdminAuthContext'
import { eventsApi, ApiEvent, EventPayload } from '../../lib/api'

// ── helpers ───────────────────────────────────────────────────────────────────

const SPORTS = [
  { value: 'football',   label: 'Football',    icon: 'fas fa-futbol' },
  { value: 'ski',        label: 'Ski',         icon: 'fas fa-skiing' },
  { value: 'athletisme', label: 'Athlétisme',  icon: 'fas fa-running' },
  { value: 'general',    label: 'Général',     icon: 'fas fa-star' },
]

const CATEGORIES = ['tournoi', 'competition', 'stage', 'rencontre', 'ceremonie', 'autre']
const STATUSES   = ['upcoming', 'past', 'cancelled']

const SPORT_COLORS: Record<string, string> = {
  football:   'bg-emerald-100 text-emerald-700',
  ski:        'bg-sky-100 text-sky-700',
  athletisme: 'bg-orange-100 text-orange-700',
  general:    'bg-purple-100 text-purple-700',
}

const STATUS_LABELS: Record<string, { label: string; cls: string }> = {
  upcoming:  { label: 'À venir',   cls: 'bg-blue-100 text-blue-700' },
  past:      { label: 'Passé',     cls: 'bg-gray-100 text-gray-600' },
  cancelled: { label: 'Annulé',    cls: 'bg-red-100 text-red-600' },
}

function emptyForm(): EventPayload {
  return {
    title: '', subtitle: null, date: '', endDate: null,
    location: '', locationDetail: null,
    sport: 'football', category: 'tournoi', status: 'upcoming',
    description: '', result: null, highlight: false, image: null,
  }
}

// ── sub-components ────────────────────────────────────────────────────────────

function Badge({ cls, text }: { cls: string; text: string }) {
  return <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold ${cls}`}>{text}</span>
}

// ── main component ────────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const { admin, logout } = useAdminAuth()

  const [events,  setEvents]  = useState<ApiEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState('')

  // filter bar
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterSport,  setFilterSport]  = useState('all')
  const [search,       setSearch]       = useState('')

  // modal
  const [modalOpen,  setModalOpen]  = useState(false)
  const [editEvent,  setEditEvent]  = useState<ApiEvent | null>(null)
  const [form,       setForm]       = useState<EventPayload>(emptyForm())
  const [saving,     setSaving]     = useState(false)
  const [formError,  setFormError]  = useState('')

  // delete confirm
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  // ── data ──────────────────────────────────────────────────────────────────

  async function load() {
    setLoading(true)
    try {
      const data = await eventsApi.list()
      setEvents(data)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Erreur de chargement')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  // ── filtered list ─────────────────────────────────────────────────────────

  const displayed = events.filter(ev => {
    if (filterStatus !== 'all' && ev.status !== filterStatus) return false
    if (filterSport  !== 'all' && ev.sport  !== filterSport)  return false
    if (search && !ev.title.toLowerCase().includes(search.toLowerCase()) &&
        !ev.location.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  // ── modal helpers ─────────────────────────────────────────────────────────

  function openCreate() {
    setEditEvent(null)
    setForm(emptyForm())
    setFormError('')
    setModalOpen(true)
  }

  function openEdit(ev: ApiEvent) {
    setEditEvent(ev)
    setForm({
      title: ev.title, subtitle: ev.subtitle ?? null,
      date: ev.date, endDate: ev.endDate ?? null,
      location: ev.location, locationDetail: ev.locationDetail ?? null,
      sport: ev.sport, category: ev.category, status: ev.status,
      description: ev.description, result: ev.result ?? null,
      highlight: ev.highlight, image: ev.image ?? null,
    })
    setFormError('')
    setModalOpen(true)
  }

  function closeModal() {
    setModalOpen(false)
    setEditEvent(null)
  }

  function setField<K extends keyof EventPayload>(key: K, value: EventPayload[K]) {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  async function handleSave(e: FormEvent) {
    e.preventDefault()
    setFormError('')
    setSaving(true)
    try {
      if (editEvent) {
        const updated = await eventsApi.update(editEvent.id, form)
        setEvents(prev => prev.map(ev => ev.id === updated.id ? updated : ev))
      } else {
        const created = await eventsApi.create(form)
        setEvents(prev => [created, ...prev])
      }
      closeModal()
    } catch (err: unknown) {
      setFormError(err instanceof Error ? err.message : 'Erreur de sauvegarde')
    } finally {
      setSaving(false)
    }
  }

  // ── delete ────────────────────────────────────────────────────────────────

  async function confirmDelete() {
    if (!deleteId) return
    setDeleting(true)
    try {
      await eventsApi.delete(deleteId)
      setEvents(prev => prev.filter(ev => ev.id !== deleteId))
      setDeleteId(null)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erreur de suppression')
    } finally {
      setDeleting(false)
    }
  }

  // ── stats ─────────────────────────────────────────────────────────────────

  const upcoming  = events.filter(e => e.status === 'upcoming').length
  const past      = events.filter(e => e.status === 'past').length
  const highlight = events.filter(e => e.highlight).length

  // ── render ────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── top bar ─────────────────────────────────────────────────────── */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <i className="fas fa-shield-alt text-white text-sm" />
          </div>
          <div>
            <h1 className="font-heading font-black text-lg text-gray-900 leading-none">ASATA Admin</h1>
            <p className="text-xs text-gray-400">Gestion des événements</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500 hidden sm:block">
            <i className="fas fa-user-circle mr-1" />{admin?.email}
          </span>
          <button
            onClick={logout}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 transition-colors font-heading font-bold"
          >
            <i className="fas fa-sign-out-alt" />
            <span className="hidden sm:inline">Déconnexion</span>
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* ── stats strip ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total',      value: events.length, icon: 'fas fa-calendar', cls: 'text-primary' },
            { label: 'À venir',    value: upcoming,      icon: 'fas fa-clock',    cls: 'text-blue-600' },
            { label: 'Passés',     value: past,          icon: 'fas fa-check',    cls: 'text-gray-500' },
            { label: 'En vedette', value: highlight,     icon: 'fas fa-star',     cls: 'text-amber-500' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-5">
              <i className={`${s.icon} ${s.cls} text-xl mb-2 block`} />
              <div className="font-heading font-black text-2xl text-gray-900">{s.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── toolbar ─────────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          {/* search */}
          <div className="relative flex-1">
            <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Rechercher par titre ou lieu…"
              className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* status filter */}
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-white"
          >
            <option value="all">Tous les statuts</option>
            <option value="upcoming">À venir</option>
            <option value="past">Passés</option>
            <option value="cancelled">Annulés</option>
          </select>

          {/* sport filter */}
          <select
            value={filterSport}
            onChange={e => setFilterSport(e.target.value)}
            className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-white"
          >
            <option value="all">Tous les sports</option>
            {SPORTS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>

          {/* add button */}
          <button
            onClick={openCreate}
            className="flex items-center gap-2 bg-primary text-white font-heading font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-primary-dark transition-colors whitespace-nowrap"
          >
            <i className="fas fa-plus" /> Nouvel événement
          </button>
        </div>

        {/* ── error ───────────────────────────────────────────────────────── */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm flex items-center gap-2 mb-4">
            <i className="fas fa-exclamation-circle" /> {error}
            <button onClick={() => setError('')} className="ml-auto text-red-400 hover:text-red-600">
              <i className="fas fa-times" />
            </button>
          </div>
        )}

        {/* ── events table / cards ─────────────────────────────────────────── */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : displayed.length === 0 ? (
          <div className="bg-white border border-gray-100 rounded-2xl py-16 text-center text-gray-400">
            <i className="fas fa-calendar-times text-3xl mb-3 block" />
            <p className="text-sm">Aucun événement trouvé</p>
          </div>
        ) : (
          <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
            {/* desktop table */}
            <table className="w-full hidden md:table text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {['Événement', 'Date', 'Lieu', 'Sport', 'Statut', 'Actions'].map(h => (
                    <th key={h} className="text-left px-4 py-3 font-heading font-bold text-xs text-gray-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {displayed.map(ev => (
                  <tr key={ev.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 max-w-[240px]">
                      <div className="flex items-start gap-2">
                        {ev.highlight && <i className="fas fa-star text-amber-400 text-xs mt-0.5" />}
                        <div>
                          <p className="font-heading font-bold text-gray-900 truncate">{ev.title}</p>
                          {ev.subtitle && <p className="text-xs text-gray-400 truncate">{ev.subtitle}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                      {ev.date}{ev.endDate ? ` → ${ev.endDate}` : ''}
                    </td>
                    <td className="px-4 py-3 text-gray-600 truncate max-w-[160px]">{ev.location}</td>
                    <td className="px-4 py-3">
                      <Badge cls={SPORT_COLORS[ev.sport] ?? 'bg-gray-100 text-gray-600'} text={SPORTS.find(s => s.value === ev.sport)?.label ?? ev.sport} />
                    </td>
                    <td className="px-4 py-3">
                      <Badge cls={STATUS_LABELS[ev.status]?.cls ?? ''} text={STATUS_LABELS[ev.status]?.label ?? ev.status} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEdit(ev)}
                          className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors"
                          title="Modifier"
                        >
                          <i className="fas fa-edit text-sm" />
                        </button>
                        <button
                          onClick={() => setDeleteId(ev.id)}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                          title="Supprimer"
                        >
                          <i className="fas fa-trash text-sm" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* mobile cards */}
            <div className="md:hidden divide-y divide-gray-50">
              {displayed.map(ev => (
                <div key={ev.id} className="p-4 flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                      <Badge cls={SPORT_COLORS[ev.sport] ?? 'bg-gray-100 text-gray-600'} text={SPORTS.find(s => s.value === ev.sport)?.label ?? ev.sport} />
                      <Badge cls={STATUS_LABELS[ev.status]?.cls ?? ''} text={STATUS_LABELS[ev.status]?.label ?? ev.status} />
                      {ev.highlight && <i className="fas fa-star text-amber-400 text-xs" />}
                    </div>
                    <p className="font-heading font-bold text-gray-900 text-sm">{ev.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{ev.date} · {ev.location}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button onClick={() => openEdit(ev)} className="p-2 rounded-xl bg-blue-50 text-blue-600">
                      <i className="fas fa-edit" />
                    </button>
                    <button onClick={() => setDeleteId(ev.id)} className="p-2 rounded-xl bg-red-50 text-red-500">
                      <i className="fas fa-trash" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── event form modal ─────────────────────────────────────────────────── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8">
            {/* header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="font-heading font-black text-lg text-gray-900">
                {editEvent ? 'Modifier l\'événement' : 'Nouvel événement'}
              </h2>
              <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                <i className="fas fa-times text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6">
              {formError && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 flex items-center gap-2 mb-5">
                  <i className="fas fa-exclamation-circle" /> {formError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* title */}
                <div className="sm:col-span-2">
                  <label className="form-label">Titre *</label>
                  <input
                    required
                    value={form.title}
                    onChange={e => setField('title', e.target.value)}
                    className="form-input"
                    placeholder="Ex: Tournoi de Football Asni"
                  />
                </div>

                {/* subtitle */}
                <div className="sm:col-span-2">
                  <label className="form-label">Sous-titre</label>
                  <input
                    value={form.subtitle ?? ''}
                    onChange={e => setField('subtitle', e.target.value || null)}
                    className="form-input"
                    placeholder="Ex: 3ème Édition — Garçons & Filles"
                  />
                </div>

                {/* date */}
                <div>
                  <label className="form-label">Date de début *</label>
                  <input
                    required
                    type="date"
                    value={form.date}
                    onChange={e => setField('date', e.target.value)}
                    className="form-input"
                  />
                </div>

                {/* endDate */}
                <div>
                  <label className="form-label">Date de fin</label>
                  <input
                    type="date"
                    value={form.endDate ?? ''}
                    onChange={e => setField('endDate', e.target.value || null)}
                    className="form-input"
                  />
                </div>

                {/* location */}
                <div>
                  <label className="form-label">Lieu *</label>
                  <input
                    required
                    value={form.location}
                    onChange={e => setField('location', e.target.value)}
                    className="form-input"
                    placeholder="Ex: Asni"
                  />
                </div>

                {/* locationDetail */}
                <div>
                  <label className="form-label">Détails du lieu</label>
                  <input
                    value={form.locationDetail ?? ''}
                    onChange={e => setField('locationDetail', e.target.value || null)}
                    className="form-input"
                    placeholder="Ex: Terrain de football d'Asni"
                  />
                </div>

                {/* sport */}
                <div>
                  <label className="form-label">Sport *</label>
                  <select
                    required
                    value={form.sport}
                    onChange={e => setField('sport', e.target.value)}
                    className="form-input"
                  >
                    {SPORTS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                  </select>
                </div>

                {/* category */}
                <div>
                  <label className="form-label">Catégorie *</label>
                  <select
                    required
                    value={form.category}
                    onChange={e => setField('category', e.target.value)}
                    className="form-input"
                  >
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                {/* status */}
                <div>
                  <label className="form-label">Statut *</label>
                  <select
                    required
                    value={form.status}
                    onChange={e => setField('status', e.target.value)}
                    className="form-input"
                  >
                    {STATUSES.map(s => (
                      <option key={s} value={s}>{STATUS_LABELS[s]?.label ?? s}</option>
                    ))}
                  </select>
                </div>

                {/* highlight */}
                <div className="flex items-center gap-3">
                  <input
                    id="highlight"
                    type="checkbox"
                    checked={form.highlight}
                    onChange={e => setField('highlight', e.target.checked)}
                    className="w-4 h-4 accent-primary"
                  />
                  <label htmlFor="highlight" className="text-sm font-heading font-bold text-gray-700 cursor-pointer">
                    <i className="fas fa-star text-amber-400 mr-1" /> Mettre en vedette
                  </label>
                </div>

                {/* description */}
                <div className="sm:col-span-2">
                  <label className="form-label">Description *</label>
                  <textarea
                    required
                    rows={4}
                    value={form.description}
                    onChange={e => setField('description', e.target.value)}
                    className="form-input resize-none"
                    placeholder="Décrivez l'événement…"
                  />
                </div>

                {/* result */}
                <div className="sm:col-span-2">
                  <label className="form-label">Résultat</label>
                  <input
                    value={form.result ?? ''}
                    onChange={e => setField('result', e.target.value || null)}
                    className="form-input"
                    placeholder="Ex: 🥇 1ère place — 100m"
                  />
                </div>

                {/* image */}
                <div className="sm:col-span-2">
                  <label className="form-label">Chemin de l'image</label>
                  <input
                    value={form.image ?? ''}
                    onChange={e => setField('image', e.target.value || null)}
                    className="form-input"
                    placeholder="Ex: /footballActivitiesPics/photo.jpg"
                  />
                </div>
              </div>

              {/* actions */}
              <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-5 py-2.5 text-sm font-heading font-bold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white text-sm font-heading font-bold rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sauvegarde…
                    </>
                  ) : (
                    <>
                      <i className={`fas ${editEvent ? 'fa-save' : 'fa-plus'}`} />
                      {editEvent ? 'Sauvegarder' : 'Créer'}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── delete confirm modal ─────────────────────────────────────────────── */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-trash text-red-500 text-xl" />
            </div>
            <h3 className="font-heading font-black text-lg text-gray-900 text-center mb-2">Supprimer l'événement ?</h3>
            <p className="text-sm text-gray-500 text-center mb-6">Cette action est irréversible.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 text-sm font-heading font-bold text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleting}
                className="flex-1 py-2.5 text-sm font-heading font-bold text-white bg-red-500 rounded-xl hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {deleting ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <i className="fas fa-trash" />}
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
