import { useEffect, useState } from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/theme/colors'
import { Typography } from '@/theme/typography'
import { useMembersStore } from '@/stores/membersStore'
import { Club } from '@/models/types'

const CLUB_FILTERS: { label: string; value: Club | 'all' }[] = [
  { label: 'Tous',          value: 'all' },
  { label: 'Ski',           value: 'ski' },
  { label: 'Football',      value: 'football' },
  { label: 'Athlétisme',    value: 'athletisme' },
]

const CLUB_COLORS: Record<string, string> = {
  ski: Colors.primary, football: '#16A34A', athletisme: '#EA580C',
}
const CLUB_ICONS: Record<string, string> = {
  ski: 'snow', football: 'football', athletisme: 'walk',
}

function Avatar({ name, club }: { name: string; club: Club }) {
  return (
    <View style={[styles.avatar, { backgroundColor: CLUB_COLORS[club] + '20' }]}>
      <Text style={[styles.avatarText, { color: CLUB_COLORS[club] }]}>
        {name.charAt(0).toUpperCase()}
      </Text>
    </View>
  )
}

export default function MembersScreen() {
  const router = useRouter()
  const { items, fetch, loading } = useMembersStore()
  const [filter, setFilter] = useState<Club | 'all'>('all')
  const [search, setSearch] = useState('')

  useEffect(() => { fetch() }, [])

  const filtered = items.filter(m => {
    const matchClub   = filter === 'all' || m.club === filter
    const matchSearch = !search || `${m.firstName} ${m.lastName}`.toLowerCase().includes(search.toLowerCase())
    return matchClub && matchSearch
  })

  const activeCount = filtered.filter(m => m.active).length

  return (
    <View style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Membres</Text>
        <Text style={styles.headerSub}>{activeCount} actif{activeCount > 1 ? 's' : ''}</Text>
      </View>

      {/* Search */}
      <View style={styles.searchBox}>
        <Ionicons name="search" size={16} color={Colors.textMuted} style={{ marginRight: 8 }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher un membre..."
          placeholderTextColor={Colors.textMuted}
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Ionicons name="close-circle" size={16} color={Colors.textMuted} />
          </TouchableOpacity>
        )}
      </View>

      {/* Club filter */}
      <FlatList
        horizontal
        data={CLUB_FILTERS}
        keyExtractor={f => f.value}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterList}
        renderItem={({ item: f }) => (
          <TouchableOpacity
            style={[styles.chip, filter === f.value && styles.chipActive]}
            onPress={() => setFilter(f.value)}
          >
            {f.value !== 'all' && (
              <Ionicons
                name={CLUB_ICONS[f.value] as any}
                size={12}
                color={filter === f.value ? Colors.white : Colors.textSecondary}
              />
            )}
            <Text style={[styles.chipText, filter === f.value && styles.chipTextActive]}>
              {f.label}
            </Text>
          </TouchableOpacity>
        )}
      />

      {loading && items.length === 0 ? (
        <ActivityIndicator color={Colors.primary} style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={m => String(m.id)}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Ionicons name="people-outline" size={48} color={Colors.textMuted} />
              <Text style={styles.emptyText}>Aucun membre trouvé</Text>
            </View>
          }
          renderItem={({ item: m }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => router.push(`/(tabs)/members/${m.id}`)}
              activeOpacity={0.75}
            >
              <Avatar name={m.firstName} club={m.club} />
              <View style={styles.cardBody}>
                <View style={styles.cardTop}>
                  <Text style={styles.name}>{m.firstName} {m.lastName}</Text>
                  {m.role === 'admin' && (
                    <View style={styles.adminBadge}>
                      <Text style={styles.adminText}>Admin</Text>
                    </View>
                  )}
                </View>
                <View style={styles.cardMeta}>
                  <Ionicons name={CLUB_ICONS[m.club] as any} size={12} color={CLUB_COLORS[m.club]} />
                  <Text style={[styles.clubLabel, { color: CLUB_COLORS[m.club] }]}>
                    {CLUB_FILTERS.find(f => f.value === m.club)?.label ?? m.club}
                  </Text>
                  <View style={styles.dot} />
                  <View style={[styles.statusDot, { backgroundColor: m.active ? Colors.success : Colors.textMuted }]} />
                  <Text style={[styles.statusText, { color: m.active ? Colors.success : Colors.textMuted }]}>
                    {m.active ? 'Actif' : 'Inactif'}
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  root:           { flex: 1, backgroundColor: Colors.background },
  header:         { backgroundColor: Colors.primary, paddingTop: 56, paddingHorizontal: 20, paddingBottom: 20 },
  headerTitle:    { ...Typography.h2, color: Colors.white },
  headerSub:      { color: 'rgba(255,255,255,0.65)', fontSize: 12, marginTop: 2 },
  searchBox:      { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.card, marginHorizontal: 16, marginTop: 14, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10, borderWidth: 1, borderColor: Colors.border },
  searchInput:    { flex: 1, fontSize: 14, color: Colors.textPrimary },
  filterList:     { paddingHorizontal: 16, paddingVertical: 12, gap: 8 },
  chip:           { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20, backgroundColor: Colors.card, borderWidth: 1.5, borderColor: Colors.border },
  chipActive:     { backgroundColor: Colors.primary, borderColor: Colors.primary },
  chipText:       { fontSize: 12, fontWeight: '600', color: Colors.textSecondary },
  chipTextActive: { color: Colors.white },
  list:           { paddingHorizontal: 16, paddingBottom: 24 },
  card:           { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: Colors.card, borderRadius: 16, padding: 14, marginBottom: 10, shadowColor: Colors.primary, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  avatar:         { width: 46, height: 46, borderRadius: 23, alignItems: 'center', justifyContent: 'center' },
  avatarText:     { fontSize: 18, fontWeight: '800' },
  cardBody:       { flex: 1 },
  cardTop:        { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  name:           { ...Typography.h4, color: Colors.textPrimary },
  adminBadge:     { backgroundColor: Colors.warning + '20', borderRadius: 6, paddingHorizontal: 7, paddingVertical: 2 },
  adminText:      { fontSize: 10, fontWeight: '800', color: Colors.warning },
  cardMeta:       { flexDirection: 'row', alignItems: 'center', gap: 5 },
  clubLabel:      { fontSize: 12, fontWeight: '600' },
  dot:            { width: 3, height: 3, borderRadius: 2, backgroundColor: Colors.textMuted },
  statusDot:      { width: 6, height: 6, borderRadius: 3 },
  statusText:     { fontSize: 11, fontWeight: '600' },
  empty:          { alignItems: 'center', marginTop: 60, gap: 12 },
  emptyText:      { color: Colors.textMuted, fontSize: 14 },
})
