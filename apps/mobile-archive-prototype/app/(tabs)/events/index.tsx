import { useEffect, useState } from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/theme/colors'
import { Typography } from '@/theme/typography'
import { useEventsStore } from '@/stores/eventsStore'
import { useThemeStore } from '@/stores/themeStore'
import { Event } from '@/services/mockEvents'

const TYPE_CONFIG = {
  competition:  { icon: 'trophy',    color: '#F59E0B', label: 'Compétition' },
  entrainement: { icon: 'barbell',   color: '#10B981', label: 'Entraînement' },
  evenement:    { icon: 'star',      color: '#8B5CF6', label: 'Événement' },
  reunion:      { icon: 'people',    color: Colors.primary, label: 'Réunion' },
}
const CLUB_COLORS: Record<string, string> = {
  ski: Colors.primary, football: '#16A34A', athletisme: '#EA580C', all: '#6B7280',
}

function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('fr-MA', { weekday: 'short', day: 'numeric', month: 'long' })
}
function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString('fr-MA', { hour: '2-digit', minute: '2-digit' })
}
function isUpcoming(iso: string) {
  return new Date(iso) > new Date()
}

export default function EventsScreen() {
  const router = useRouter()
  const { items, fetch, loading } = useEventsStore()
  const { colors } = useThemeStore()
  const [refreshing, setRefreshing] = useState(false)
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'ski' | 'football' | 'athletisme'>('upcoming')

  useEffect(() => { fetch() }, [])

  const onRefresh = async () => {
    setRefreshing(true)
    await fetch()
    setRefreshing(false)
  }

  const filtered = items.filter(e => {
    if (filter === 'upcoming') return isUpcoming(e.date)
    if (filter === 'all') return true
    return e.club === filter || e.club === 'all'
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const FILTERS = [
    { label: 'À venir', value: 'upcoming' },
    { label: 'Tous',    value: 'all' },
    { label: 'Ski',     value: 'ski' },
    { label: 'Football',value: 'football' },
    { label: 'Athlé.',  value: 'athletisme' },
  ]

  const renderEvent = ({ item: e }: { item: Event }) => {
    const cfg = TYPE_CONFIG[e.type]
    const upcoming = isUpcoming(e.date)
    const spotsPct = e.spots ? ((e.spots - (e.spotsLeft ?? 0)) / e.spots) : 0
    const full = (e.spotsLeft ?? 1) === 0

    return (
      <TouchableOpacity
        style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border, opacity: upcoming ? 1 : 0.6 }]}
        onPress={() => router.push(`/(tabs)/events/${e.id}`)}
        activeOpacity={0.75}
      >
        {/* Date strip */}
        <View style={[styles.dateStrip, { backgroundColor: CLUB_COLORS[e.club] }]}>
          <Text style={styles.dateDay}>{new Date(e.date).getDate()}</Text>
          <Text style={styles.dateMonth}>
            {new Date(e.date).toLocaleDateString('fr-MA', { month: 'short' }).toUpperCase()}
          </Text>
        </View>

        <View style={styles.cardBody}>
          <View style={styles.cardTop}>
            <View style={[styles.typeBadge, { backgroundColor: cfg.color + '20' }]}>
              <Ionicons name={cfg.icon as any} size={11} color={cfg.color} />
              <Text style={[styles.typeText, { color: cfg.color }]}>{cfg.label}</Text>
            </View>
            {full && <View style={styles.fullBadge}><Text style={styles.fullText}>Complet</Text></View>}
            {!upcoming && <View style={styles.pastBadge}><Text style={styles.pastText}>Passé</Text></View>}
          </View>

          <Text style={[styles.title, { color: colors.textPrimary }]} numberOfLines={2}>{e.title}</Text>

          <View style={styles.infoRow}>
            <Ionicons name="time-outline" size={12} color={colors.textMuted} />
            <Text style={[styles.infoText, { color: colors.textMuted }]}>{formatTime(e.date)}</Text>
            <View style={styles.dot} />
            <Ionicons name="location-outline" size={12} color={colors.textMuted} />
            <Text style={[styles.infoText, { color: colors.textMuted }]} numberOfLines={1}>{e.location}</Text>
          </View>

          {/* Spots bar */}
          {e.spots && (
            <View style={styles.spotsRow}>
              <View style={[styles.spotsBar, { backgroundColor: colors.border }]}>
                <View style={[styles.spotsFill, { width: `${spotsPct * 100}%` as any, backgroundColor: full ? Colors.error : cfg.color }]} />
              </View>
              <Text style={[styles.spotsText, { color: colors.textMuted }]}>
                {e.spotsLeft}/{e.spots} places
              </Text>
            </View>
          )}
        </View>
        <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
      </TouchableOpacity>
    )
  }

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: Colors.primary }]}>
        <Text style={styles.headerTitle}>Événements</Text>
        <Text style={styles.headerSub}>{filtered.length} événement{filtered.length !== 1 ? 's' : ''}</Text>
      </View>

      <FlatList
        horizontal
        data={FILTERS}
        keyExtractor={f => f.value}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterList}
        renderItem={({ item: f }) => (
          <TouchableOpacity
            style={[styles.chip, { borderColor: colors.border, backgroundColor: colors.card },
              filter === f.value && { backgroundColor: Colors.primary, borderColor: Colors.primary }]}
            onPress={() => setFilter(f.value as any)}
          >
            <Text style={[styles.chipText, { color: colors.textSecondary },
              filter === f.value && { color: Colors.white }]}>{f.label}</Text>
          </TouchableOpacity>
        )}
      />

      {loading && items.length === 0
        ? <ActivityIndicator color={Colors.primary} style={{ marginTop: 40 }} />
        : <FlatList
            data={filtered}
            keyExtractor={e => String(e.id)}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.primary} />}
            ListEmptyComponent={
              <View style={styles.empty}>
                <Ionicons name="calendar-outline" size={48} color={colors.textMuted} />
                <Text style={[styles.emptyText, { color: colors.textMuted }]}>Aucun événement trouvé</Text>
              </View>
            }
            renderItem={renderEvent}
          />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  root:         { flex: 1 },
  header:       { paddingTop: 56, paddingHorizontal: 20, paddingBottom: 20 },
  headerTitle:  { ...Typography.h2, color: Colors.white },
  headerSub:    { color: 'rgba(255,255,255,0.65)', fontSize: 12, marginTop: 2 },
  filterList:   { paddingHorizontal: 16, paddingVertical: 12, gap: 8 },
  chip:         { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20, borderWidth: 1.5 },
  chipText:     { fontSize: 12, fontWeight: '600' },
  list:         { paddingHorizontal: 16, paddingBottom: 24 },
  card:         { flexDirection: 'row', alignItems: 'center', borderRadius: 16, marginBottom: 10, borderWidth: 1, overflow: 'hidden', shadowColor: Colors.primary, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  dateStrip:    { width: 56, alignItems: 'center', justifyContent: 'center', paddingVertical: 16, alignSelf: 'stretch' },
  dateDay:      { fontSize: 22, fontWeight: '900', color: Colors.white },
  dateMonth:    { fontSize: 10, fontWeight: '700', color: 'rgba(255,255,255,0.8)' },
  cardBody:     { flex: 1, padding: 12 },
  cardTop:      { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 },
  typeBadge:    { flexDirection: 'row', alignItems: 'center', gap: 4, borderRadius: 6, paddingHorizontal: 7, paddingVertical: 3 },
  typeText:     { fontSize: 10, fontWeight: '700' },
  fullBadge:    { backgroundColor: Colors.error + '20', borderRadius: 6, paddingHorizontal: 7, paddingVertical: 3 },
  fullText:     { fontSize: 10, fontWeight: '700', color: Colors.error },
  pastBadge:    { backgroundColor: '#6B728020', borderRadius: 6, paddingHorizontal: 7, paddingVertical: 3 },
  pastText:     { fontSize: 10, fontWeight: '700', color: '#6B7280' },
  title:        { ...Typography.h4, marginBottom: 6 },
  infoRow:      { flexDirection: 'row', alignItems: 'center', gap: 4, flexWrap: 'wrap' },
  infoText:     { fontSize: 11 },
  dot:          { width: 3, height: 3, borderRadius: 2, backgroundColor: '#9BAABE' },
  spotsRow:     { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 },
  spotsBar:     { flex: 1, height: 4, borderRadius: 2, overflow: 'hidden' },
  spotsFill:    { height: '100%', borderRadius: 2 },
  spotsText:    { fontSize: 10, fontWeight: '600' },
  empty:        { alignItems: 'center', marginTop: 60, gap: 12 },
  emptyText:    { fontSize: 14 },
})
