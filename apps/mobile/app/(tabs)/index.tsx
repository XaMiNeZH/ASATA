import { useEffect } from 'react'
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/theme/colors'
import { Typography } from '@/theme/typography'
import { useAuthStore } from '@/stores/authStore'
import { useAnnouncementsStore } from '@/stores/announcementsStore'
import { useMembersStore } from '@/stores/membersStore'
import { AnnouncementCard } from '@/components/AnnouncementCard'

const CLUB_LABELS: Record<string, string> = {
  ski: 'Ski & Montagne', football: 'Football', athletisme: 'Athlétisme',
}
const CLUB_COLORS: Record<string, string> = {
  ski: '#1565C0', football: '#16A34A', athletisme: '#EA580C',
}

export default function HomeScreen() {
  const router  = useRouter()
  const user    = useAuthStore(s => s.user)
  const logout  = useAuthStore(s => s.logout)
  const { items: announcements, fetch: fetchAnn, loading } = useAnnouncementsStore()
  const { items: members, fetch: fetchMembers } = useMembersStore()

  useEffect(() => { fetchAnn(); fetchMembers() }, [])

  const pinned  = announcements.filter(a => a.pinned).slice(0, 2)
  const recent  = announcements.filter(a => !a.pinned).slice(0, 3)
  const active  = members.filter(m => m.active).length

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.greeting}>Bonjour, {user?.firstName} 👋</Text>
            <Text style={styles.headerSub}>Bienvenue sur l'espace membres ASATA</Text>
          </View>
          <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
            <Ionicons name="log-out-outline" size={20} color="rgba(255,255,255,0.8)" />
          </TouchableOpacity>
        </View>

        {/* Club badge */}
        <View style={[styles.clubBadge, { backgroundColor: CLUB_COLORS[user?.club ?? 'ski'] + '30' }]}>
          <Ionicons
            name={user?.club === 'football' ? 'football' : user?.club === 'athletisme' ? 'walk' : 'snow'}
            size={14}
            color={Colors.white}
          />
          <Text style={styles.clubText}>{CLUB_LABELS[user?.club ?? 'ski']}</Text>
          {user?.role === 'admin' && (
            <View style={styles.adminTag}><Text style={styles.adminTagText}>Admin</Text></View>
          )}
        </View>
      </View>

      {/* Stats row */}
      <View style={styles.statsRow}>
        {[
          { icon: 'megaphone', label: 'Annonces',       value: announcements.length },
          { icon: 'people',    label: 'Membres actifs', value: active },
          { icon: 'ribbon',    label: 'Clubs',           value: 3 },
        ].map(({ icon, label, value }) => (
          <View key={label} style={styles.statCard}>
            <Ionicons name={icon as any} size={22} color={Colors.primary} />
            <Text style={styles.statValue}>{value}</Text>
            <Text style={styles.statLabel}>{label}</Text>
          </View>
        ))}
      </View>

      {/* Pinned announcements */}
      {pinned.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📌 Épinglées</Text>
          {loading
            ? <ActivityIndicator color={Colors.primary} />
            : pinned.map(a => (
                <AnnouncementCard
                  key={a.id}
                  announcement={a}
                  onPress={() => router.push(`/(tabs)/announcements/${a.id}`)}
                />
              ))
          }
        </View>
      )}

      {/* Recent */}
      <View style={styles.section}>
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>🕐 Récentes</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/announcements')}>
            <Text style={styles.seeAll}>Voir tout</Text>
          </TouchableOpacity>
        </View>
        {loading
          ? <ActivityIndicator color={Colors.primary} />
          : recent.map(a => (
              <AnnouncementCard
                key={a.id}
                announcement={a}
                onPress={() => router.push(`/(tabs)/announcements/${a.id}`)}
              />
            ))
        }
      </View>

      {/* Admin — add announcement */}
      {user?.role === 'admin' && (
        <TouchableOpacity
          style={styles.fabAlt}
          onPress={() => router.push('/(tabs)/announcements/new')}
          activeOpacity={0.85}
        >
          <Ionicons name="add-circle" size={20} color={Colors.white} />
          <Text style={styles.fabAltText}>Nouvelle annonce</Text>
        </TouchableOpacity>
      )}

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  root:       { flex: 1, backgroundColor: Colors.background },
  content:    { paddingBottom: 32 },
  header:     { backgroundColor: Colors.primary, paddingTop: 56, paddingHorizontal: 20, paddingBottom: 24 },
  headerTop:  { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 },
  greeting:   { ...Typography.h2, color: Colors.white, marginBottom: 2 },
  headerSub:  { color: 'rgba(255,255,255,0.65)', fontSize: 12 },
  logoutBtn:  { width: 38, height: 38, borderRadius: 19, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center' },
  clubBadge:  { flexDirection: 'row', alignItems: 'center', gap: 6, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6, alignSelf: 'flex-start', borderWidth: 1, borderColor: 'rgba(255,255,255,0.25)' },
  clubText:   { color: Colors.white, fontSize: 12, fontWeight: '600' },
  adminTag:   { backgroundColor: Colors.warning, borderRadius: 8, paddingHorizontal: 6, paddingVertical: 2 },
  adminTagText:{ fontSize: 10, fontWeight: '800', color: Colors.white },
  statsRow:   { flexDirection: 'row', gap: 10, margin: 16 },
  statCard:   { flex: 1, backgroundColor: Colors.card, borderRadius: 16, padding: 14, alignItems: 'center', gap: 4, shadowColor: Colors.primary, shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 },
  statValue:  { ...Typography.h3, color: Colors.textPrimary },
  statLabel:  { fontSize: 10, color: Colors.textMuted, fontWeight: '600', textAlign: 'center' },
  section:    { paddingHorizontal: 16, marginBottom: 8 },
  sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  sectionTitle:{ ...Typography.h4, color: Colors.textPrimary, marginBottom: 10 },
  seeAll:     { fontSize: 12, color: Colors.primary, fontWeight: '700' },
  fabAlt:     { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: Colors.primary, marginHorizontal: 16, borderRadius: 14, padding: 16, marginTop: 8 },
  fabAltText: { ...Typography.button, color: Colors.white },
})
