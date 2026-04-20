import { useEffect, useState } from 'react'
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/theme/colors'
import { Typography } from '@/theme/typography'
import { Announcement } from '@/models/types'
import * as api from '@/services/api'

const CATEGORY_CONFIG = {
  general:      { icon: 'information-circle', color: Colors.info,   label: 'Général' },
  evenement:    { icon: 'calendar',           color: Colors.primary, label: 'Événement' },
  competition:  { icon: 'trophy',             color: '#F59E0B',      label: 'Compétition' },
  entrainement: { icon: 'barbell',            color: '#10B981',      label: 'Entraînement' },
  urgent:       { icon: 'warning',            color: Colors.error,   label: 'Urgent' },
}

const CLUB_LABELS: Record<string, string> = {
  ski: 'Ski & Montagne', football: 'Football', athletisme: 'Athlétisme', all: 'Tous les clubs',
}

export default function AnnouncementDetail() {
  const { id }  = useLocalSearchParams<{ id: string }>()
  const router  = useRouter()
  const [ann, setAnn]       = useState<Announcement | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getAnnouncement(Number(id))
      .then(setAnn)
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return (
    <View style={styles.center}>
      <ActivityIndicator color={Colors.primary} size="large" />
    </View>
  )

  if (!ann) return (
    <View style={styles.center}>
      <Text style={{ color: Colors.textSecondary }}>Annonce introuvable.</Text>
    </View>
  )

  const cfg = CATEGORY_CONFIG[ann.category]

  return (
    <View style={styles.root}>
      {/* Top bar */}
      <View style={[styles.topBar, { backgroundColor: cfg.color }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color={Colors.white} />
        </TouchableOpacity>
        <View style={styles.topBarContent}>
          <View style={styles.categoryRow}>
            <Ionicons name={cfg.icon as any} size={14} color={Colors.white} />
            <Text style={styles.categoryLabel}>{cfg.label}</Text>
            {ann.pinned && (
              <>
                <View style={styles.dot} />
                <Ionicons name="pin" size={12} color={Colors.white} />
                <Text style={styles.categoryLabel}>Épinglée</Text>
              </>
            )}
          </View>
          {ann.club && (
            <View style={styles.clubBadge}>
              <Text style={styles.clubBadgeText}>{CLUB_LABELS[ann.club]}</Text>
            </View>
          )}
        </View>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{ann.title}</Text>

        {/* Meta */}
        <View style={styles.metaRow}>
          <Ionicons name="person-circle" size={18} color={Colors.textMuted} />
          <Text style={styles.metaText}>
            {ann.author.firstName} {ann.author.lastName}
          </Text>
          <View style={styles.dot} />
          <Ionicons name="time-outline" size={14} color={Colors.textMuted} />
          <Text style={styles.metaText}>
            {new Date(ann.createdAt).toLocaleDateString('fr-MA', { day: 'numeric', month: 'long', year: 'numeric' })}
          </Text>
        </View>

        <View style={styles.divider} />

        <Text style={styles.body}>{ann.body}</Text>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  root:           { flex: 1, backgroundColor: Colors.background },
  center:         { flex: 1, alignItems: 'center', justifyContent: 'center' },
  topBar:         { paddingTop: 56, paddingHorizontal: 20, paddingBottom: 20 },
  backBtn:        { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  topBarContent:  { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  categoryRow:    { flexDirection: 'row', alignItems: 'center', gap: 5 },
  categoryLabel:  { color: 'rgba(255,255,255,0.9)', fontSize: 12, fontWeight: '600' },
  dot:            { width: 3, height: 3, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.5)' },
  clubBadge:      { backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 4 },
  clubBadgeText:  { color: Colors.white, fontSize: 11, fontWeight: '700' },
  scroll:         { flex: 1 },
  scrollContent:  { padding: 20 },
  title:          { ...Typography.h1, color: Colors.textPrimary, marginBottom: 14, lineHeight: 36 },
  metaRow:        { flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap' },
  metaText:       { fontSize: 13, color: Colors.textSecondary },
  divider:        { height: 1, backgroundColor: Colors.border, marginVertical: 16 },
  body:           { ...Typography.body, color: Colors.textSecondary, lineHeight: 26 },
})
