import { useState, useEffect, FormEvent } from 'react'
import { useAdminAuth } from '../../context/AdminAuthContext'
import {
  eventsApi, ApiEvent, EventPayload,
  galleryApi, ApiPhoto,
  donationsAdminApi, ApiDonation, DonationStats,
  contactAdminApi, ApiContactMessage,
} from '../../lib/api'

// ─── Constants ────────────────────────────────────────────────────────────────

const SPORTS     = [{ value: 'football', label: 'Football' }, { value: 'ski', label: 'Ski' }, { value: 'athletisme', label: 'Athlétisme' }, { value: 'general', label: 'Général' }]
const CATEGORIES = ['tournoi', 'competition', 'stage', 'rencontre', 'ceremonie', 'autre']
const STATUSES   = ['upcoming', 'past', 'cancelled']
const STATUS_LABELS: Record<string, { label: string; cls: string }> = {
  upcoming:  { label: 'À venir', cls: 'bg-blue-100 text-blue-700' },
  past:      { label: 'Passé',   cls: 'bg-gray-100 text-gray-600' },
  cancelled: { label: 'Annulé',  cls: 'bg-red-100 text-red-600' },
}
const SPORT_COLORS: Record<string, string> = {
  football: 'bg-emerald-100 text-emerald-700', ski: 'bg-sky-100 text-sky-700',
  athletisme: 'bg-orange-100 text-orange-700', general: 'bg-purple-100 text-purple-700',
}
const DON_STATUS: Record<string, { label: string; cls: string }> = {
  PENDING:   { label: 'En attente', cls: 'bg-amber-100 text-amber-700' },
  CONFIRMED: { label: 'Confirmé',   cls: 'bg-green-100 text-green-700' },
  FAILED:    { label: 'Échoué',     cls: 'bg-red-100 text-red-600' },
}
const GALLERY_CATS = [{ value: 'ski', label: 'Ski' }, { value: 'football', label: 'Football' }, { value: 'athletisme', label: 'Athlétisme' }, { value: 'general', label: 'Général' }]

function emptyForm(): EventPayload {
  return { title: '', subtitle: null, date: '', endDate: null, location: '', locationDetail: null, sport: 'football', category: 'tournoi', status: 'upcoming', description: '', result: null, highlight: false, image: null }
}

function Badge({ cls, text }: { cls: string; text: string }) {
  return <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold ${cls}`}>{text}</span>
}

// ─── EVENTS TAB ───────────────────────────────────────────────────────────────

function EventsTab() {
  const [events,  setEvents]  = useState<ApiEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterSport,  setFilterSport]  = useState('all')
  const [search,       setSearch]       = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editEvent, setEditEvent] = useState<ApiEvent | null>(null)
  const [form,      setForm]      = useState<EventPayload>(emptyForm())
  const [saving,    setSaving]    = useState(false)
  const [formError, setFormError] = useState('')
  const [deleteId,  setDeleteId]  = useState<string | null>(null)
  const [deleting,  setDeleting]  = useState(false)

  useEffect(() => {
    eventsApi.list().then(setEvents).catch(e => setError(e.message)).finally(() => setLoading(false))
  }, [])

  const displayed = events.filter(ev => {
    if (filterStatus !== 'all' && ev.status !== filterStatus) return false
    if (filterSport  !== 'all' && ev.sport  !== filterSport)  return false
    if (search && !ev.title.toLowerCase().includes(search.toLowerCase()) && !ev.location.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  function openCreate() { setEditEvent(null); setForm(emptyForm()); setFormError(''); setModalOpen(true) }
  function openEdit(ev: ApiEvent) {
    setEditEvent(ev)
    setForm({ title: ev.title, subtitle: ev.subtitle ?? null, date: ev.date, endDate: ev.endDate ?? null, location: ev.location, locationDetail: ev.locationDetail ?? null, sport: ev.sport, category: ev.category, status: ev.status, description: ev.description, result: ev.result ?? null, highlight: ev.highlight, image: ev.image ?? null })
    setFormError(''); setModalOpen(true)
  }
  function setField<K extends keyof EventPayload>(key: K, value: EventPayload[K]) { setForm(prev => ({ ...prev, [key]: value })) }

  async function handleSave(e: FormEvent) {
    e.preventDefault(); setFormError(''); setSaving(true)
    try {
      if (editEvent) { const u = await eventsApi.update(editEvent.id, form); setEvents(prev => prev.map(ev => ev.id === u.id ? u : ev)) }
      else { const c = await eventsApi.create(form); setEvents(prev => [c, ...prev]) }
      setModalOpen(false)
    } catch (err: unknown) { setFormError(err instanceof Error ? err.message : 'Erreur') }
    finally { setSaving(false) }
  }

  async function confirmDelete() {
    if (!deleteId) return; setDeleting(true)
    try { await eventsApi.delete(deleteId); setEvents(prev => prev.filter(e => e.id !== deleteId)); setDeleteId(null) }
    catch (err: unknown) { setError(err instanceof Error ? err.message : 'Erreur') }
    finally { setDeleting(false) }
  }

  const upcoming = events.filter(e => e.status === 'upcoming').length
  const past     = events.filter(e => e.status === 'past').length
  const hl       = events.filter(e => e.highlight).length

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total',      value: events.length, icon: 'fas fa-calendar',        cls: 'text-primary' },
          { label: 'À venir',    value: upcoming,      icon: 'fas fa-clock',           cls: 'text-blue-600' },
          { label: 'Passés',     value: past,          icon: 'fas fa-check',           cls: 'text-gray-500' },
          { label: 'En vedette', value: hl,            icon: 'fas fa-star',            cls: 'text-amber-500' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-5">
            <i className={`${s.icon} ${s.cls} text-xl mb-2 block`} />
            <div className="font-heading font-black text-2xl text-gray-900">{s.value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher…" className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-white">
          <option value="all">Tous les statuts</option>
          {STATUSES.map(s => <option key={s} value={s}>{STATUS_LABELS[s]?.label ?? s}</option>)}
        </select>
        <select value={filterSport} onChange={e => setFilterSport(e.target.value)} className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-white">
          <option value="all">Tous les sports</option>
          {SPORTS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
        <button onClick={openCreate} className="flex items-center gap-2 bg-primary text-white font-heading font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-primary-dark transition whitespace-nowrap">
          <i className="fas fa-plus" /> Nouvel événement
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 flex items-center gap-2 mb-4">
          <i className="fas fa-exclamation-circle" />{error}
          <button onClick={() => setError('')} className="ml-auto"><i className="fas fa-times" /></button>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>
      ) : (
        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
          {/* Desktop table */}
          <table className="w-full hidden md:table text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>{['Événement','Date','Lieu','Sport','Statut','Actions'].map(h => <th key={h} className="text-left px-4 py-3 font-heading font-bold text-xs text-gray-500 uppercase tracking-wide">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {displayed.map(ev => (
                <tr key={ev.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 max-w-[240px]">
                    <div className="flex items-start gap-2">
                      {ev.highlight && <i className="fas fa-star text-amber-400 text-xs mt-0.5" />}
                      <div><p className="font-heading font-bold text-gray-900 truncate">{ev.title}</p>{ev.subtitle && <p className="text-xs text-gray-400 truncate">{ev.subtitle}</p>}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{ev.date}{ev.endDate ? ` → ${ev.endDate}` : ''}</td>
                  <td className="px-4 py-3 text-gray-600 truncate max-w-[160px]">{ev.location}</td>
                  <td className="px-4 py-3"><Badge cls={SPORT_COLORS[ev.sport] ?? 'bg-gray-100 text-gray-600'} text={SPORTS.find(s => s.value === ev.sport)?.label ?? ev.sport} /></td>
                  <td className="px-4 py-3"><Badge cls={STATUS_LABELS[ev.status]?.cls ?? ''} text={STATUS_LABELS[ev.status]?.label ?? ev.status} /></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(ev)} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600"><i className="fas fa-edit text-sm" /></button>
                      <button onClick={() => setDeleteId(ev.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"><i className="fas fa-trash text-sm" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Mobile cards */}
          <div className="md:hidden divide-y divide-gray-50">
            {displayed.map(ev => (
              <div key={ev.id} className="p-4 flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                    <Badge cls={SPORT_COLORS[ev.sport] ?? ''} text={SPORTS.find(s => s.value === ev.sport)?.label ?? ev.sport} />
                    <Badge cls={STATUS_LABELS[ev.status]?.cls ?? ''} text={STATUS_LABELS[ev.status]?.label ?? ev.status} />
                  </div>
                  <p className="font-heading font-bold text-gray-900 text-sm">{ev.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{ev.date} · {ev.location}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => openEdit(ev)} className="p-2 rounded-xl bg-blue-50 text-blue-600"><i className="fas fa-edit" /></button>
                  <button onClick={() => setDeleteId(ev.id)} className="p-2 rounded-xl bg-red-50 text-red-500"><i className="fas fa-trash" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Event form modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="font-heading font-black text-lg text-gray-900">{editEvent ? "Modifier l'événement" : 'Nouvel événement'}</h2>
              <button onClick={() => setModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-xl"><i className="fas fa-times text-gray-500" /></button>
            </div>
            <form onSubmit={handleSave} className="p-6">
              {formError && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 flex items-center gap-2 mb-5"><i className="fas fa-exclamation-circle" />{formError}</div>}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2"><label className="form-label">Titre *</label><input required value={form.title} onChange={e => setField('title', e.target.value)} className="form-input" /></div>
                <div className="sm:col-span-2"><label className="form-label">Sous-titre</label><input value={form.subtitle ?? ''} onChange={e => setField('subtitle', e.target.value || null)} className="form-input" /></div>
                <div><label className="form-label">Date de début *</label><input required type="date" value={form.date} onChange={e => setField('date', e.target.value)} className="form-input" /></div>
                <div><label className="form-label">Date de fin</label><input type="date" value={form.endDate ?? ''} onChange={e => setField('endDate', e.target.value || null)} className="form-input" /></div>
                <div><label className="form-label">Lieu *</label><input required value={form.location} onChange={e => setField('location', e.target.value)} className="form-input" /></div>
                <div><label className="form-label">Détails du lieu</label><input value={form.locationDetail ?? ''} onChange={e => setField('locationDetail', e.target.value || null)} className="form-input" /></div>
                <div><label className="form-label">Sport *</label>
                  <select required value={form.sport} onChange={e => setField('sport', e.target.value)} className="form-input">
                    {SPORTS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                  </select>
                </div>
                <div><label className="form-label">Catégorie *</label>
                  <select required value={form.category} onChange={e => setField('category', e.target.value)} className="form-input">
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div><label className="form-label">Statut *</label>
                  <select required value={form.status} onChange={e => setField('status', e.target.value)} className="form-input">
                    {STATUSES.map(s => <option key={s} value={s}>{STATUS_LABELS[s]?.label ?? s}</option>)}
                  </select>
                </div>
                <div className="flex items-center gap-3">
                  <input id="hl" type="checkbox" checked={form.highlight} onChange={e => setField('highlight', e.target.checked)} className="w-4 h-4 accent-primary" />
                  <label htmlFor="hl" className="text-sm font-heading font-bold text-gray-700 cursor-pointer"><i className="fas fa-star text-amber-400 mr-1" />En vedette</label>
                </div>
                <div className="sm:col-span-2"><label className="form-label">Description *</label><textarea required rows={4} value={form.description} onChange={e => setField('description', e.target.value)} className="form-input resize-none" /></div>
                <div className="sm:col-span-2"><label className="form-label">Résultat</label><input value={form.result ?? ''} onChange={e => setField('result', e.target.value || null)} className="form-input" placeholder="Ex: 🥇 1ère place" /></div>
                <div className="sm:col-span-2"><label className="form-label">Chemin de l'image</label><input value={form.image ?? ''} onChange={e => setField('image', e.target.value || null)} className="form-input" placeholder="Ex: /footballActivitiesPics/photo.jpg" /></div>
              </div>
              <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setModalOpen(false)} className="px-5 py-2.5 text-sm font-heading font-bold text-gray-600 hover:bg-gray-100 rounded-xl">Annuler</button>
                <button type="submit" disabled={saving} className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white text-sm font-heading font-bold rounded-xl hover:bg-primary-dark disabled:opacity-50">
                  {saving ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <i className={`fas ${editEvent ? 'fa-save' : 'fa-plus'}`} />}
                  {editEvent ? 'Sauvegarder' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4"><i className="fas fa-trash text-red-500 text-xl" /></div>
            <h3 className="font-heading font-black text-lg text-gray-900 mb-2">Supprimer l'événement ?</h3>
            <p className="text-sm text-gray-500 mb-6">Cette action est irréversible.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 text-sm font-heading font-bold text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50">Annuler</button>
              <button onClick={confirmDelete} disabled={deleting} className="flex-1 py-2.5 text-sm font-heading font-bold text-white bg-red-500 rounded-xl hover:bg-red-600 disabled:opacity-50 flex items-center justify-center gap-2">
                {deleting ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <i className="fas fa-trash" />} Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── GALLERY TAB ──────────────────────────────────────────────────────────────

function GalleryTab() {
  const [photos,   setPhotos]   = useState<ApiPhoto[]>([])
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState('')
  const [filter,   setFilter]   = useState('all')
  const [addOpen,  setAddOpen]  = useState(false)
  const [newSrc,   setNewSrc]   = useState('')
  const [newCap,   setNewCap]   = useState('')
  const [newCat,   setNewCat]   = useState('ski')
  const [saving,   setSaving]   = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [preview,  setPreview]  = useState<ApiPhoto | null>(null)

  useEffect(() => {
    galleryApi.list().then(setPhotos).catch(e => setError(e.message)).finally(() => setLoading(false))
  }, [])

  const displayed = filter === 'all' ? photos : photos.filter(p => p.category === filter)

  async function handleAdd(e: FormEvent) {
    e.preventDefault(); setSaving(true)
    try {
      const p = await galleryApi.create({ src: newSrc, caption: newCap || null, category: newCat })
      setPhotos(prev => [p, ...prev])
      setAddOpen(false); setNewSrc(''); setNewCap(''); setNewCat('ski')
    } catch (err: unknown) { setError(err instanceof Error ? err.message : 'Erreur') }
    finally { setSaving(false) }
  }

  async function confirmDelete() {
    if (!deleteId) return; setDeleting(true)
    try { await galleryApi.delete(deleteId); setPhotos(prev => prev.filter(p => p.id !== deleteId)); setDeleteId(null) }
    catch (err: unknown) { setError(err instanceof Error ? err.message : 'Erreur') }
    finally { setDeleting(false) }
  }

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="font-heading font-black text-xl text-gray-900">{photos.length} photos</span>
          <div className="flex gap-1.5 flex-wrap">
            {[{ value: 'all', label: 'Toutes' }, ...GALLERY_CATS].map(f => (
              <button key={f.value} onClick={() => setFilter(f.value)}
                className={`text-xs font-heading font-bold px-3 py-1.5 rounded-xl transition-all ${filter === f.value ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500 hover:bg-primary-ghost hover:text-primary'}`}>
                {f.label}
              </button>
            ))}
          </div>
        </div>
        <button onClick={() => setAddOpen(true)} className="flex items-center gap-2 bg-primary text-white font-heading font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-primary-dark transition whitespace-nowrap">
          <i className="fas fa-plus" /> Ajouter une photo
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 flex items-center gap-2 mb-4">
          <i className="fas fa-exclamation-circle" />{error}
          <button onClick={() => setError('')} className="ml-auto"><i className="fas fa-times" /></button>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>
      ) : displayed.length === 0 ? (
        <div className="bg-white border border-gray-100 rounded-2xl py-16 text-center text-gray-400">
          <i className="fas fa-images text-3xl mb-3 block" /><p className="text-sm">Aucune photo</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {displayed.map(photo => (
            <div key={photo.id} className="group relative bg-gray-100 rounded-2xl overflow-hidden aspect-square cursor-pointer" onClick={() => setPreview(photo)}>
              <img src={photo.src} alt={photo.caption ?? ''} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                onError={e => { (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100' height='100' fill='%23f3f4f6'/%3E%3Ctext x='50' y='55' text-anchor='middle' font-size='30' fill='%239ca3af'%3E%F0%9F%93%B7%3C/text%3E%3C/svg%3E" }} />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <button onClick={e => { e.stopPropagation(); setDeleteId(photo.id) }} className="w-9 h-9 bg-red-500 rounded-xl flex items-center justify-center text-white hover:bg-red-600">
                  <i className="fas fa-trash text-sm" />
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-2">
                <span className={`inline-block text-[10px] font-heading font-bold px-1.5 py-0.5 rounded-full ${SPORT_COLORS[photo.category] ?? 'bg-gray-100 text-gray-600'}`}>
                  {GALLERY_CATS.find(c => c.value === photo.category)?.label ?? photo.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add modal */}
      {addOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="font-heading font-black text-lg text-gray-900">Ajouter une photo</h2>
              <button onClick={() => setAddOpen(false)} className="p-2 hover:bg-gray-100 rounded-xl"><i className="fas fa-times text-gray-500" /></button>
            </div>
            <form onSubmit={handleAdd} className="p-6 flex flex-col gap-4">
              <div>
                <label className="form-label">Chemin de l'image *</label>
                <input required value={newSrc} onChange={e => setNewSrc(e.target.value)} className="form-input" placeholder="/skiActivitiesPics/photo.jpg" />
                {newSrc && <img src={newSrc} alt="preview" className="mt-2 h-32 w-full object-cover rounded-xl bg-gray-100" onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />}
              </div>
              <div>
                <label className="form-label">Légende</label>
                <input value={newCap} onChange={e => setNewCap(e.target.value)} className="form-input" placeholder="Description optionnelle" />
              </div>
              <div>
                <label className="form-label">Catégorie *</label>
                <select value={newCat} onChange={e => setNewCat(e.target.value)} className="form-input">
                  {GALLERY_CATS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setAddOpen(false)} className="flex-1 py-2.5 text-sm font-heading font-bold text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50">Annuler</button>
                <button type="submit" disabled={saving} className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-primary text-white text-sm font-heading font-bold rounded-xl hover:bg-primary-dark disabled:opacity-50">
                  {saving ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <i className="fas fa-plus" />} Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4"><i className="fas fa-image text-red-500 text-xl" /></div>
            <h3 className="font-heading font-black text-lg text-gray-900 mb-2">Supprimer la photo ?</h3>
            <p className="text-sm text-gray-500 mb-6">Cette action est irréversible.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 text-sm font-heading font-bold text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50">Annuler</button>
              <button onClick={confirmDelete} disabled={deleting} className="flex-1 py-2.5 text-sm font-heading font-bold text-white bg-red-500 rounded-xl hover:bg-red-600 disabled:opacity-50 flex items-center justify-center gap-2">
                {deleting ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <i className="fas fa-trash" />} Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox */}
      {preview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={() => setPreview(null)}>
          <div className="relative max-w-3xl w-full" onClick={e => e.stopPropagation()}>
            <img src={preview.src} alt={preview.caption ?? ''} className="w-full max-h-[80vh] object-contain rounded-2xl" />
            {preview.caption && <p className="text-white text-center mt-3 text-sm">{preview.caption}</p>}
            <button onClick={() => setPreview(null)} className="absolute top-3 right-3 w-9 h-9 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70"><i className="fas fa-times" /></button>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── DONATIONS TAB ────────────────────────────────────────────────────────────

function DonationsTab() {
  const [data,     setData]     = useState<{ donations: ApiDonation[]; pagination: { total: number; totalPages: number; page: number } } | null>(null)
  const [stats,    setStats]    = useState<DonationStats | null>(null)
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState('')
  const [filter,   setFilter]   = useState('all')
  const [page,     setPage]     = useState(1)
  const [updating, setUpdating] = useState<string | null>(null)

  async function load(f = filter, p = page) {
    setLoading(true)
    try {
      const [d, s] = await Promise.all([
        donationsAdminApi.list({ status: f !== 'all' ? f : undefined, page: p }),
        donationsAdminApi.stats(),
      ])
      setData(d); setStats(s)
    } catch (err: unknown) { setError(err instanceof Error ? err.message : 'Erreur') }
    finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  async function changeStatus(id: string, status: string) {
    setUpdating(id)
    try { await donationsAdminApi.updateStatus(id, status); await load() }
    catch (err: unknown) { setError(err instanceof Error ? err.message : 'Erreur') }
    finally { setUpdating(null) }
  }

  function applyFilter(f: string) { setFilter(f); setPage(1); load(f, 1) }
  function goPage(p: number) { setPage(p); load(filter, p) }

  return (
    <div>
      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total dons',       value: stats.totalDonations,             icon: 'fas fa-hand-holding-heart', cls: 'text-primary' },
            { label: 'Confirmés',        value: stats.confirmedCount,             icon: 'fas fa-check-circle',       cls: 'text-green-600' },
            { label: 'Montant confirmé', value: `${stats.confirmedTotal.toFixed(0)} MAD`, icon: 'fas fa-coins',     cls: 'text-amber-500' },
            { label: 'Par virement',     value: stats.byMethod.find(m => m.method === 'VIREMENT')?.count ?? 0, icon: 'fas fa-university', cls: 'text-blue-600' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-5">
              <i className={`${s.icon} ${s.cls} text-xl mb-2 block`} />
              <div className="font-heading font-black text-2xl text-gray-900">{s.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Filter */}
      <div className="flex gap-1.5 mb-4 flex-wrap">
        {[{ value: 'all', label: 'Tous' }, { value: 'PENDING', label: 'En attente' }, { value: 'CONFIRMED', label: 'Confirmés' }, { value: 'FAILED', label: 'Échoués' }].map(f => (
          <button key={f.value} onClick={() => applyFilter(f.value)}
            className={`text-xs font-heading font-bold px-3 py-1.5 rounded-xl transition-all ${filter === f.value ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500 hover:bg-primary-ghost hover:text-primary'}`}>
            {f.label}
          </button>
        ))}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 flex items-center gap-2 mb-4">
          <i className="fas fa-exclamation-circle" />{error}
          <button onClick={() => setError('')} className="ml-auto"><i className="fas fa-times" /></button>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>
      ) : !data || data.donations.length === 0 ? (
        <div className="bg-white border border-gray-100 rounded-2xl py-16 text-center text-gray-400">
          <i className="fas fa-hand-holding-heart text-3xl mb-3 block" /><p className="text-sm">Aucun don trouvé</p>
        </div>
      ) : (
        <>
          <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
            {/* Desktop */}
            <table className="w-full hidden md:table text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>{['Référence','Donateur','Montant','Méthode','Statut','Date','Action'].map(h => <th key={h} className="text-left px-4 py-3 font-heading font-bold text-xs text-gray-500 uppercase tracking-wide">{h}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {data.donations.map(d => (
                  <tr key={d.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-mono text-xs text-gray-500">{d.reference.slice(0, 12)}…</td>
                    <td className="px-4 py-3">
                      <div className="font-heading font-bold text-gray-900 text-sm">{d.donorName || '—'}</div>
                      <div className="text-xs text-gray-400">{d.donorEmail || '—'}</div>
                    </td>
                    <td className="px-4 py-3 font-heading font-black text-gray-900">{d.amount} <span className="text-xs font-normal text-gray-400">{d.currency}</span></td>
                    <td className="px-4 py-3"><Badge cls="bg-gray-100 text-gray-600" text={d.method} /></td>
                    <td className="px-4 py-3"><Badge cls={DON_STATUS[d.status]?.cls ?? 'bg-gray-100 text-gray-600'} text={DON_STATUS[d.status]?.label ?? d.status} /></td>
                    <td className="px-4 py-3 text-xs text-gray-400 whitespace-nowrap">{new Date(d.createdAt).toLocaleDateString('fr-FR')}</td>
                    <td className="px-4 py-3">
                      {d.status === 'PENDING' && (
                        <div className="flex items-center gap-1.5">
                          <button onClick={() => changeStatus(d.id, 'CONFIRMED')} disabled={updating === d.id} className="text-xs font-heading font-bold px-2.5 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 disabled:opacity-50">
                            {updating === d.id ? '…' : 'Confirmer'}
                          </button>
                          <button onClick={() => changeStatus(d.id, 'FAILED')} disabled={updating === d.id} className="text-xs font-heading font-bold px-2.5 py-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 disabled:opacity-50">
                            Échoué
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Mobile */}
            <div className="md:hidden divide-y divide-gray-50">
              {data.donations.map(d => (
                <div key={d.id} className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <p className="font-heading font-bold text-gray-900 text-sm">{d.donorName || '—'}</p>
                      <p className="text-xs text-gray-400 font-mono">{d.reference.slice(0, 12)}…</p>
                    </div>
                    <div className="text-right">
                      <p className="font-heading font-black text-gray-900">{d.amount} {d.currency}</p>
                      <Badge cls={DON_STATUS[d.status]?.cls ?? ''} text={DON_STATUS[d.status]?.label ?? d.status} />
                    </div>
                  </div>
                  {d.status === 'PENDING' && (
                    <div className="flex gap-2 mt-2">
                      <button onClick={() => changeStatus(d.id, 'CONFIRMED')} className="flex-1 text-xs font-heading font-bold py-1.5 bg-green-100 text-green-700 rounded-lg">Confirmer</button>
                      <button onClick={() => changeStatus(d.id, 'FAILED')} className="flex-1 text-xs font-heading font-bold py-1.5 bg-red-100 text-red-600 rounded-lg">Échoué</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Pagination */}
          {data.pagination.totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-4">
              <button onClick={() => goPage(page - 1)} disabled={page === 1} className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-40"><i className="fas fa-chevron-left text-xs" /></button>
              <span className="text-sm text-gray-500 font-heading">Page {page} / {data.pagination.totalPages}</span>
              <button onClick={() => goPage(page + 1)} disabled={page === data.pagination.totalPages} className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-40"><i className="fas fa-chevron-right text-xs" /></button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

// ─── MESSAGES TAB ────────────────────────────────────────────────────────────

const SUBJECT_LABELS: Record<string, string> = {
  adhesion:    'Adhésion',
  partenariat: 'Partenariat',
  evenement:   'Événement',
  information: 'Information',
  presse:      'Presse',
  autre:       'Autre',
}

const MSG_STATUS: Record<string, { label: string; cls: string; icon: string }> = {
  unread:  { label: 'Non lu',   cls: 'bg-blue-100 text-blue-700',  icon: 'fas fa-envelope' },
  read:    { label: 'Lu',       cls: 'bg-gray-100 text-gray-600',  icon: 'fas fa-envelope-open' },
  replied: { label: 'Répondu',  cls: 'bg-green-100 text-green-700', icon: 'fas fa-reply' },
}

function MessagesTab() {
  const [messages,  setMessages]  = useState<ApiContactMessage[]>([])
  const [loading,   setLoading]   = useState(true)
  const [error,     setError]     = useState('')
  const [filter,    setFilter]    = useState('all')
  const [selected,  setSelected]  = useState<ApiContactMessage | null>(null)
  const [updating,  setUpdating]  = useState<string | null>(null)

  async function load(f = filter) {
    setLoading(true)
    try { setMessages(await contactAdminApi.list(f !== 'all' ? f : undefined)) }
    catch (e: unknown) { setError(e instanceof Error ? e.message : 'Erreur') }
    finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  async function changeStatus(id: string, status: string) {
    setUpdating(id)
    try {
      const updated = await contactAdminApi.updateStatus(id, status)
      setMessages(prev => prev.map(m => m.id === id ? updated : m))
      if (selected?.id === id) setSelected(updated)
    } catch (e: unknown) { setError(e instanceof Error ? e.message : 'Erreur') }
    finally { setUpdating(null) }
  }

  function applyFilter(f: string) { setFilter(f); load(f) }

  // auto-mark as read when opened
  function openMessage(msg: ApiContactMessage) {
    setSelected(msg)
    if (msg.status === 'unread') changeStatus(msg.id, 'read')
  }

  const unreadCount = messages.filter(m => m.status === 'unread').length

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="font-heading font-black text-xl text-gray-900">{messages.length} messages</span>
            {unreadCount > 0 && (
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold">{unreadCount}</span>
            )}
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {[{ value: 'all', label: 'Tous' }, { value: 'unread', label: 'Non lus' }, { value: 'read', label: 'Lus' }, { value: 'replied', label: 'Répondus' }].map(f => (
              <button key={f.value} onClick={() => applyFilter(f.value)}
                className={`text-xs font-heading font-bold px-3 py-1.5 rounded-xl transition-all ${filter === f.value ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500 hover:bg-primary-ghost hover:text-primary'}`}>
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 flex items-center gap-2 mb-4">
          <i className="fas fa-exclamation-circle" />{error}
          <button onClick={() => setError('')} className="ml-auto"><i className="fas fa-times" /></button>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>
      ) : messages.length === 0 ? (
        <div className="bg-white border border-gray-100 rounded-2xl py-16 text-center text-gray-400">
          <i className="fas fa-inbox text-3xl mb-3 block" /><p className="text-sm">Aucun message</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {messages.map(msg => (
            <div
              key={msg.id}
              onClick={() => openMessage(msg)}
              className={`cursor-pointer bg-white border rounded-2xl p-4 hover:border-primary/30 hover:shadow-blue-sm transition-all ${msg.status === 'unread' ? 'border-blue-200 bg-blue-50/30' : 'border-gray-100'}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  {/* Avatar */}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-heading font-black text-sm ${msg.status === 'unread' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}`}>
                    {msg.firstName[0]}{msg.lastName[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-heading font-black text-sm text-gray-900">{msg.firstName} {msg.lastName}</span>
                      <Badge cls="bg-gray-100 text-gray-500" text={SUBJECT_LABELS[msg.subject] ?? msg.subject} />
                      {msg.status === 'unread' && <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />}
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">{msg.email}{msg.phone ? ` · ${msg.phone}` : ''}</p>
                    <p className="text-sm text-gray-600 mt-1.5 line-clamp-2">{msg.message}</p>
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <Badge cls={MSG_STATUS[msg.status]?.cls ?? ''} text={MSG_STATUS[msg.status]?.label ?? msg.status} />
                  <p className="text-xs text-gray-400 mt-1">{new Date(msg.createdAt).toLocaleDateString('fr-FR')}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Message detail modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-pale flex items-center justify-center font-heading font-black text-sm text-primary">
                  {selected.firstName[0]}{selected.lastName[0]}
                </div>
                <div>
                  <p className="font-heading font-black text-gray-900">{selected.firstName} {selected.lastName}</p>
                  <p className="text-xs text-gray-400">{selected.email}{selected.phone ? ` · ${selected.phone}` : ''}</p>
                </div>
              </div>
              <button onClick={() => setSelected(null)} className="p-2 hover:bg-gray-100 rounded-xl"><i className="fas fa-times text-gray-500" /></button>
            </div>

            <div className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <Badge cls="bg-primary-pale text-primary" text={SUBJECT_LABELS[selected.subject] ?? selected.subject} />
                <Badge cls={MSG_STATUS[selected.status]?.cls ?? ''} text={MSG_STATUS[selected.status]?.label ?? selected.status} />
                <span className="text-xs text-gray-400 ml-auto">{new Date(selected.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
              <div className="bg-gray-50 rounded-2xl p-4 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                {selected.message}
              </div>
            </div>

            <div className="flex items-center gap-2 px-5 pb-5">
              <a
                href={`mailto:${selected.email}?subject=Re: ${SUBJECT_LABELS[selected.subject] ?? selected.subject}`}
                onClick={() => changeStatus(selected.id, 'replied')}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-primary text-white text-sm font-heading font-bold rounded-xl hover:bg-primary-dark transition"
              >
                <i className="fas fa-reply" /> Répondre par email
              </a>
              {selected.status !== 'replied' && (
                <button
                  onClick={() => changeStatus(selected.id, 'replied')}
                  disabled={updating === selected.id}
                  className="px-4 py-2.5 text-sm font-heading font-bold text-green-700 bg-green-100 rounded-xl hover:bg-green-200 disabled:opacity-50"
                >
                  {updating === selected.id ? '…' : 'Marquer répondu'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── MAIN DASHBOARD ───────────────────────────────────────────────────────────

type Tab = 'events' | 'gallery' | 'donations' | 'messages'

export default function AdminDashboard() {
  const { admin, logout } = useAdminAuth()
  const [tab, setTab] = useState<Tab>('events')
  const [unreadCount, setUnreadCount] = useState(0)

  // fetch unread count for badge
  useEffect(() => {
    contactAdminApi.list('unread')
      .then(msgs => setUnreadCount(msgs.length))
      .catch(() => {})
  }, [])

  const tabs: { key: Tab; label: string; icon: string; badge?: number }[] = [
    { key: 'events',    label: 'Événements', icon: 'fas fa-calendar' },
    { key: 'gallery',   label: 'Galerie',    icon: 'fas fa-images' },
    { key: 'donations', label: 'Dons',       icon: 'fas fa-hand-holding-heart' },
    { key: 'messages',  label: 'Messages',   icon: 'fas fa-envelope', badge: unreadCount },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <i className="fas fa-shield-alt text-white text-sm" />
          </div>
          <div>
            <h1 className="font-heading font-black text-lg text-gray-900 leading-none">ASATA Admin</h1>
            <p className="text-xs text-gray-400">Panneau d'administration</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500 hidden sm:block"><i className="fas fa-user-circle mr-1" />{admin?.email}</span>
          <button onClick={logout} className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 transition-colors font-heading font-bold">
            <i className="fas fa-sign-out-alt" /><span className="hidden sm:inline">Déconnexion</span>
          </button>
        </div>
      </header>

      {/* Tab bar */}
      <div className="bg-white border-b border-gray-200 px-6">
        <div className="flex gap-1 max-w-7xl mx-auto">
          {tabs.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`relative flex items-center gap-2 px-4 py-4 text-sm font-heading font-bold border-b-2 transition-colors ${tab === t.key ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
              <i className={t.icon} />{t.label}
              {t.badge != null && t.badge > 0 && (
                <span className="absolute top-2.5 right-1 w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {t.badge > 9 ? '9+' : t.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {tab === 'events'    && <EventsTab />}
        {tab === 'gallery'   && <GalleryTab />}
        {tab === 'donations' && <DonationsTab />}
        {tab === 'messages'  && <MessagesTab />}
      </div>
    </div>
  )
}
