import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Announcement } from '../models/types'
import { Colors } from '../theme/colors'
import { Typography } from '../theme/typography'

const CATEGORY_CONFIG = {
  general:      { icon: 'information-circle', color: Colors.info,    label: 'Général' },
  evenement:    { icon: 'calendar',           color: Colors.primary,  label: 'Événement' },
  competition:  { icon: 'trophy',             color: '#F59E0B',       label: 'Compétition' },
  entrainement: { icon: 'barbell',            color: '#10B981',       label: 'Entraînement' },
  urgent:       { icon: 'warning',            color: Colors.error,    label: 'Urgent' },
}

const CLUB_LABELS: Record<string, string> = {
  ski: 'Ski', football: 'Football', athletisme: 'Athlétisme', all: 'Tous les clubs',
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const d = Math.floor(diff / 86400000)
  const h = Math.floor(diff / 3600000)
  const m = Math.floor(diff / 60000)
  if (d > 0) return `Il y a ${d}j`
  if (h > 0) return `Il y a ${h}h`
  return `Il y a ${m}min`
}

interface Props {
  announcement: Announcement
  onPress: () => void
}

export function AnnouncementCard({ announcement: a, onPress }: Props) {
  const cfg = CATEGORY_CONFIG[a.category]

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.75}>
      {a.pinned && (
        <View style={styles.pinnedBadge}>
          <Ionicons name="pin" size={11} color={Colors.primary} />
          <Text style={styles.pinnedText}>Épinglée</Text>
        </View>
      )}
      <View style={styles.row}>
        <View style={[styles.iconBox, { backgroundColor: cfg.color + '18' }]}>
          <Ionicons name={cfg.icon as any} size={20} color={cfg.color} />
        </View>
        <View style={styles.body}>
          <Text style={styles.title} numberOfLines={2}>{a.title}</Text>
          <Text style={styles.preview} numberOfLines={2}>{a.body}</Text>
          <View style={styles.meta}>
            <View style={[styles.categoryTag, { backgroundColor: cfg.color + '18' }]}>
              <Text style={[styles.categoryText, { color: cfg.color }]}>{cfg.label}</Text>
            </View>
            {a.club && a.club !== 'all' && (
              <View style={styles.clubTag}>
                <Text style={styles.clubText}>{CLUB_LABELS[a.club]}</Text>
              </View>
            )}
            <Text style={styles.time}>{timeAgo(a.createdAt)}</Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card:         { backgroundColor: Colors.card, borderRadius: 16, padding: 14, marginBottom: 10, shadowColor: Colors.primary, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  pinnedBadge:  { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 8 },
  pinnedText:   { fontSize: 10, fontWeight: '700', color: Colors.primary, textTransform: 'uppercase', letterSpacing: 0.5 },
  row:          { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  iconBox:      { width: 42, height: 42, borderRadius: 12, alignItems: 'center', justifyContent: 'center', shrink: 0 } as any,
  body:         { flex: 1 },
  title:        { ...Typography.h4, color: Colors.textPrimary, marginBottom: 3 },
  preview:      { ...Typography.bodySmall, color: Colors.textSecondary, marginBottom: 8 },
  meta:         { flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap' },
  categoryTag:  { borderRadius: 6, paddingHorizontal: 7, paddingVertical: 2 },
  categoryText: { fontSize: 10, fontWeight: '700' },
  clubTag:      { backgroundColor: Colors.primaryPale, borderRadius: 6, paddingHorizontal: 7, paddingVertical: 2 },
  clubText:     { fontSize: 10, fontWeight: '600', color: Colors.primary },
  time:         { fontSize: 10, color: Colors.textMuted, marginLeft: 'auto' as any },
})
