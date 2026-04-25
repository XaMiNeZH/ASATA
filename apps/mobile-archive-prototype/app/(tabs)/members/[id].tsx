import { useEffect, useState } from 'react'
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator, Linking } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/theme/colors'
import { Typography } from '@/theme/typography'
import { Member } from '@/models/types'
import * as api from '@/services/api'

const CLUB_LABELS: Record<string, string> = {
  ski: 'Ski & Montagne', football: 'Football', athletisme: 'Athlétisme',
}
const CLUB_COLORS: Record<string, string> = {
  ski: Colors.primary, football: '#16A34A', athletisme: '#EA580C',
}
const CLUB_ICONS: Record<string, string> = {
  ski: 'snow', football: 'football', athletisme: 'walk',
}

export default function MemberDetail() {
  const { id }  = useLocalSearchParams<{ id: string }>()
  const router  = useRouter()
  const [member, setMember]   = useState<Member | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getMember(Number(id))
      .then(setMember)
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return (
    <View style={styles.center}><ActivityIndicator color={Colors.primary} size="large" /></View>
  )
  if (!member) return (
    <View style={styles.center}><Text style={{ color: Colors.textSecondary }}>Membre introuvable.</Text></View>
  )

  const clubColor = CLUB_COLORS[member.club]

  return (
    <View style={styles.root}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: clubColor }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color={Colors.white} />
        </TouchableOpacity>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarText}>{member.firstName.charAt(0).toUpperCase()}</Text>
        </View>
        <Text style={styles.name}>{member.firstName} {member.lastName}</Text>
        <View style={styles.badgeRow}>
          <View style={styles.clubBadge}>
            <Ionicons name={CLUB_ICONS[member.club] as any} size={13} color={Colors.white} />
            <Text style={styles.clubBadgeText}>{CLUB_LABELS[member.club]}</Text>
          </View>
          {member.role === 'admin' && (
            <View style={styles.adminBadge}>
              <Text style={styles.adminText}>Admin</Text>
            </View>
          )}
          <View style={[styles.statusBadge, { backgroundColor: member.active ? Colors.success + '30' : 'rgba(255,255,255,0.15)' }]}>
            <View style={[styles.statusDot, { backgroundColor: member.active ? Colors.success : 'rgba(255,255,255,0.5)' }]} />
            <Text style={styles.statusText}>{member.active ? 'Actif' : 'Inactif'}</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Info card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Informations</Text>
          {[
            { icon: 'mail',          label: 'Email',      value: member.email },
            { icon: 'call',          label: 'Téléphone',  value: member.phone ?? '—' },
            { icon: 'calendar',      label: 'Membre depuis', value: new Date(member.joinedAt).toLocaleDateString('fr-MA', { day: 'numeric', month: 'long', year: 'numeric' }) },
          ].map(({ icon, label, value }) => (
            <View key={label} style={styles.infoRow}>
              <View style={[styles.infoIcon, { backgroundColor: clubColor + '15' }]}>
                <Ionicons name={icon as any} size={16} color={clubColor} />
              </View>
              <View>
                <Text style={styles.infoLabel}>{label}</Text>
                <Text style={styles.infoValue}>{value}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Actions */}
        <View style={styles.actionsCard}>
          <Text style={styles.cardTitle}>Actions</Text>
          <TouchableOpacity
            style={[styles.actionBtn, { backgroundColor: clubColor }]}
            onPress={() => member.email && Linking.openURL(`mailto:${member.email}`)}
          >
            <Ionicons name="mail" size={18} color={Colors.white} />
            <Text style={styles.actionBtnText}>Envoyer un email</Text>
          </TouchableOpacity>
          {member.phone && (
            <TouchableOpacity
              style={[styles.actionBtn, styles.actionBtnOutline, { borderColor: clubColor }]}
              onPress={() => Linking.openURL(`tel:${member.phone}`)}
            >
              <Ionicons name="call" size={18} color={clubColor} />
              <Text style={[styles.actionBtnText, { color: clubColor }]}>Appeler</Text>
            </TouchableOpacity>
          )}
        </View>

      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  root:           { flex: 1, backgroundColor: Colors.background },
  center:         { flex: 1, alignItems: 'center', justifyContent: 'center' },
  header:         { paddingTop: 56, paddingHorizontal: 20, paddingBottom: 28, alignItems: 'center' },
  backBtn:        { alignSelf: 'flex-start', width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  avatarCircle:   { width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(255,255,255,0.25)', alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  avatarText:     { fontSize: 32, fontWeight: '900', color: Colors.white },
  name:           { ...Typography.h2, color: Colors.white, marginBottom: 10 },
  badgeRow:       { flexDirection: 'row', gap: 8, flexWrap: 'wrap', justifyContent: 'center' },
  clubBadge:      { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 5 },
  clubBadgeText:  { color: Colors.white, fontSize: 12, fontWeight: '600' },
  adminBadge:     { backgroundColor: Colors.warning, borderRadius: 12, paddingHorizontal: 10, paddingVertical: 5 },
  adminText:      { color: Colors.white, fontSize: 11, fontWeight: '800' },
  statusBadge:    { flexDirection: 'row', alignItems: 'center', gap: 5, borderRadius: 12, paddingHorizontal: 10, paddingVertical: 5 },
  statusDot:      { width: 6, height: 6, borderRadius: 3 },
  statusText:     { color: Colors.white, fontSize: 11, fontWeight: '600' },
  scroll:         { padding: 16, paddingBottom: 40 },
  card:           { backgroundColor: Colors.card, borderRadius: 18, padding: 18, marginBottom: 12, shadowColor: Colors.primary, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  actionsCard:    { backgroundColor: Colors.card, borderRadius: 18, padding: 18, marginBottom: 12 },
  cardTitle:      { ...Typography.label, color: Colors.textMuted, marginBottom: 14 },
  infoRow:        { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 14 },
  infoIcon:       { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  infoLabel:      { fontSize: 11, color: Colors.textMuted, fontWeight: '600', marginBottom: 1 },
  infoValue:      { fontSize: 14, color: Colors.textPrimary, fontWeight: '500' },
  actionBtn:      { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, borderRadius: 12, paddingVertical: 14, marginBottom: 10 },
  actionBtnOutline:{ backgroundColor: 'transparent', borderWidth: 1.5 },
  actionBtnText:  { ...Typography.button, color: Colors.white },
})
