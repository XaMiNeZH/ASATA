import { useEffect, useState } from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, TextInput, RefreshControl } from 'react-native'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/theme/colors'
import { Typography } from '@/theme/typography'
import { useAuthStore } from '@/stores/authStore'
import { useAnnouncementsStore } from '@/stores/announcementsStore'
import { useThemeStore } from '@/stores/themeStore'
import { useUnreadStore } from '@/stores/unreadStore'
import { AnnouncementCard } from '@/components/AnnouncementCard'
import { AnnouncementCategory } from '@/models/types'

const FILTERS: { label: string; value: AnnouncementCategory | 'all' }[] = [
  { label: 'Tous',          value: 'all' },
  { label: 'Général',       value: 'general' },
  { label: 'Événement',     value: 'evenement' },
  { label: 'Compétition',   value: 'competition' },
  { label: 'Entraînement',  value: 'entrainement' },
  { label: '⚠️ Urgent',    value: 'urgent' },
]

export default function AnnouncementsScreen() {
  const router = useRouter()
  const user   = useAuthStore(s => s.user)
  const { items, fetch, loading } = useAnnouncementsStore()
  const { colors } = useThemeStore()
  const { markRead } = useUnreadStore()
  const [filter, setFilter] = useState<AnnouncementCategory | 'all'>('all')
  const [search, setSearch] = useState('')
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => { fetch() }, [])

  const onRefresh = async () => {
    setRefreshing(true)
    await fetch()
    setRefreshing(false)
  }

  const filtered = items.filter(a => {
    const matchFilter = filter === 'all' || a.category === filter
    const matchSearch = !search || a.title.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: Colors.primary }]}>
        <Text style={styles.headerTitle}>Annonces</Text>
        {user?.role === 'admin' && (
          <TouchableOpacity style={styles.addBtn} onPress={() => router.push('/(tabs)/announcements/new')}>
            <Ionicons name="add" size={22} color={Colors.white} />
          </TouchableOpacity>
        )}
      </View>

      {/* Search */}
      <View style={[styles.searchBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Ionicons name="search" size={16} color={colors.textMuted} style={{ marginRight: 8 }} />
        <TextInput
          style={[styles.searchInput, { color: colors.textPrimary }]}
          placeholder="Rechercher une annonce..."
          placeholderTextColor={colors.textMuted}
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Ionicons name="close-circle" size={16} color={colors.textMuted} />
          </TouchableOpacity>
        )}
      </View>

      {/* Filter chips */}
      <FlatList
        horizontal
        data={FILTERS}
        keyExtractor={f => f.value}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterList}
        renderItem={({ item: f }) => (
          <TouchableOpacity
            style={[styles.chip, { backgroundColor: colors.card, borderColor: colors.border },
              filter === f.value && { backgroundColor: Colors.primary, borderColor: Colors.primary }]}
            onPress={() => setFilter(f.value)}
          >
            <Text style={[styles.chipText, { color: colors.textSecondary },
              filter === f.value && { color: Colors.white }]}>
              {f.label}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* List */}
      {loading && items.length === 0 ? (
        <ActivityIndicator color={Colors.primary} style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={a => String(a.id)}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.primary} />
          }
          ListEmptyComponent={
            <View style={styles.empty}>
              <Ionicons name="megaphone-outline" size={48} color={colors.textMuted} />
              <Text style={[styles.emptyText, { color: colors.textMuted }]}>Aucune annonce trouvée</Text>
            </View>
          }
          renderItem={({ item }) => (
            <AnnouncementCard
              announcement={item}
              onPress={() => {
                markRead(item.id)
                router.push(`/(tabs)/announcements/${item.id}`)
              }}
            />
          )}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  root:           { flex: 1 },
  header:         { backgroundColor: Colors.primary, paddingTop: 56, paddingHorizontal: 20, paddingBottom: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle:    { ...Typography.h2, color: Colors.white },
  addBtn:         { width: 38, height: 38, borderRadius: 19, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  searchBox:      { flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, marginTop: 14, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10, borderWidth: 1 },
  searchInput:    { flex: 1, fontSize: 14 },
  filterList:     { paddingHorizontal: 16, paddingVertical: 12, gap: 8 },
  chip:           { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20, borderWidth: 1.5 },
  chipText:       { fontSize: 12, fontWeight: '600' },
  list:           { paddingHorizontal: 16, paddingBottom: 24 },
  empty:          { alignItems: 'center', marginTop: 60, gap: 12 },
  emptyText:      { fontSize: 14 },
})
