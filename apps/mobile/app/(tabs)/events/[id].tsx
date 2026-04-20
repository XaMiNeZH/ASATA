import { useEffect } from 'react'
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Share } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/theme/colors'
import { Typography } from '@/theme/typography'
import { useEventsStore } from '@/stores/eventsStore'
import { useThemeStore } from '@/stores/themeStore'

const TYPE_CONFIG = {
  competition:  { icon: 'trophy',    color: '#F59E0B', label: 'Compétition' },
  entrainement: { icon: 'barbell',   color: '#10B981', label: 'Entraînement' },
  evenement:    { icon: 'star',      color: '#8B5CF6', label: 'Événement' },
  reunion:      { icon: 'people',    color: Colors.primary, label: 'Réunion' },
}
const CLUB_LABELS: Record<string, string> = {
  ski: 'Ski & Montagne', football: 'Football', athletisme: 'Athlétisme', all: 'Tous les clubs',
}
const CLUB_COLORS: Record<string, string> = {
  ski: Colors.primary, football: '#16A34A', athletisme: '#EA580C', all: '#6B7280',
}

function formatFull(iso: string) {
  return new Date(iso).toLocaleDateString('fr-MA', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })
}
function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString('fr-MA', { hour: '2-digit', minute: '2-digit' })
}
function isUpcoming(iso: string) {
  return new Date(iso) > new Date()
}
function durationLabel(start: string, end?: string) {
  if (!end) return null
  const ms = new Date(end).getTime() - new Date(start).getTime()
  const h = Math.floor(ms / 3600000)
  const m = Math.floor((ms % 3600000) / 60000)
  if (h === 0) return `${m} min`
  if (m === 0) return `${h}h`
  return `${h}h${m.toString().padStart(2, '0')}`
}

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const router  = useRouter()
  const { items, fetch } = useEventsStore()
  const { colors } = useThemeStore()

  useEffect(() => { if (items.length === 0) fetch() }, [])

  const event = items.find(e => String(e.id) === id)

  if (!event) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Ionicons name="calendar-outline" size={48} color={colors.textMuted} />
        <Text style={[styles.notFound, { color: colors.textMuted }]}>Événement introuvable</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backBtnText}>Retour</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const cfg     = TYPE_CONFIG[event.type]
  const upcoming = isUpcoming(event.date)
  const clubColor = CLUB_COLORS[event.club]
  const spotsPct  = event.spots ? ((event.spots - (event.spotsLeft ?? 0)) / event.spots) : 0
  const full      = (event.spotsLeft ?? 1) === 0
  const dur       = durationLabel(event.date, event.endDate)

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${event.title}\n📅 ${formatFull(event.date)}\n📍 ${event.location}\n\nASATA — Association Sportive Atlas Toubkal Asni`,
      })
    } catch {}
  }

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      {/* Hero strip */}
      <View style={[styles.hero, { backgroundColor: clubColor }]}>
        <TouchableOpacity style={styles.backRow} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={20} color={Colors.white} />
          <Text style={styles.backLabel}>Événements</Text>
        </TouchableOpacity>

        <View style={styles.heroBody}>
          <View style={[styles.typeBadge, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
            <Ionicons name={cfg.icon as any} size={12} color={Colors.white} />
            <Text style={styles.typeText}>{cfg.label}</Text>
          </View>
          <Text style={styles.heroTitle}>{event.title}</Text>
          <View style={styles.heroMeta}>
            <Ionicons name="business-outline" size={13} color="rgba(255,255,255,0.75)" />
            <Text style={styles.heroMetaText}>{CLUB_LABELS[event.club]}</Text>
          </View>
        </View>

        {/* Date big display */}
        <View style={styles.dateBox}>
          <Text style={styles.dateNum}>{new Date(event.date).getDate()}</Text>
          <Text style={styles.dateMon}>
            {new Date(event.date).toLocaleDateString('fr-MA', { month: 'short' }).toUpperCase()}
          </Text>
        </View>

        <TouchableOpacity style={styles.shareBtn} onPress={handleShare}>
          <Ionicons name="share-outline" size={18} color={Colors.white} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Status pills */}
        <View style={styles.pillRow}>
          {!upcoming && (
            <View style={styles.pillPast}><Text style={styles.pillPastText}>Passé</Text></View>
          )}
          {upcoming && full && (
            <View style={styles.pillFull}><Text style={styles.pillFullText}>Complet</Text></View>
          )}
          {upcoming && !full && (
            <View style={styles.pillOpen}><Text style={styles.pillOpenText}>Places disponibles</Text></View>
          )}
        </View>

        {/* Info cards */}
        <View style={[styles.infoCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <InfoRow icon="calendar-outline" label="Date" value={formatFull(event.date)} colors={colors} />
          <Divider color={colors.border} />
          <InfoRow icon="time-outline" label="Heure" value={`${formatTime(event.date)}${event.endDate ? ` → ${formatTime(event.endDate)}` : ''}`} colors={colors} />
          {dur && (
            <>
              <Divider color={colors.border} />
              <InfoRow icon="hourglass-outline" label="Durée" value={dur} colors={colors} />
            </>
          )}
          <Divider color={colors.border} />
          <InfoRow icon="location-outline" label="Lieu" value={event.location} colors={colors} />
        </View>

        {/* Spots */}
        {event.spots && (
          <View style={[styles.spotsCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.spotsHeader}>
              <Text style={[styles.spotsTitle, { color: colors.textPrimary }]}>Inscriptions</Text>
              <Text style={[styles.spotsCount, { color: full ? Colors.error : cfg.color }]}>
                {full ? 'Complet' : `${event.spotsLeft} / ${event.spots} places`}
              </Text>
            </View>
            <View style={[styles.barTrack, { backgroundColor: colors.border }]}>
              <View style={[styles.barFill, { width: `${spotsPct * 100}%` as any, backgroundColor: full ? Colors.error : cfg.color }]} />
            </View>
            <Text style={[styles.spotsHint, { color: colors.textMuted }]}>
              {full
                ? 'Toutes les places sont prises. Contactez l\'équipe pour rejoindre la liste d\'attente.'
                : `${event.spotsLeft} place${(event.spotsLeft ?? 0) > 1 ? 's' : ''} encore disponible${(event.spotsLeft ?? 0) > 1 ? 's' : ''} sur ${event.spots}.`
              }
            </Text>
          </View>
        )}

        {/* Description */}
        <View style={[styles.descCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.descTitle, { color: colors.textPrimary }]}>Description</Text>
          <Text style={[styles.descText, { color: colors.textSecondary }]}>{event.description}</Text>
        </View>

        {/* CTA */}
        {upcoming && !full && (
          <TouchableOpacity style={[styles.cta, { backgroundColor: cfg.color }]} activeOpacity={0.85}>
            <Ionicons name="checkmark-circle-outline" size={18} color={Colors.white} />
            <Text style={styles.ctaText}>S'inscrire à cet événement</Text>
          </TouchableOpacity>
        )}

        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  )
}

function InfoRow({ icon, label, value, colors }: { icon: string; label: string; value: string; colors: any }) {
  return (
    <View style={styles.infoRow}>
      <View style={styles.infoLeft}>
        <Ionicons name={icon as any} size={16} color={colors.textMuted} />
        <Text style={[styles.infoLabel, { color: colors.textMuted }]}>{label}</Text>
      </View>
      <Text style={[styles.infoValue, { color: colors.textPrimary }]}>{value}</Text>
    </View>
  )
}

function Divider({ color }: { color: string }) {
  return <View style={[styles.divider, { backgroundColor: color }]} />
}

const styles = StyleSheet.create({
  root:          { flex: 1 },
  center:        { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  notFound:      { fontSize: 14 },
  backBtn:       { marginTop: 8, paddingHorizontal: 20, paddingVertical: 10, backgroundColor: Colors.primary, borderRadius: 12 },
  backBtnText:   { color: Colors.white, fontWeight: '700' },

  hero:          { paddingTop: 54, paddingHorizontal: 20, paddingBottom: 28 },
  backRow:       { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 20 },
  backLabel:     { color: Colors.white, fontSize: 14, fontWeight: '600' },
  heroBody:      { gap: 8, marginRight: 72 },
  heroTitle:     { ...Typography.h2, color: Colors.white, lineHeight: 30 },
  heroMeta:      { flexDirection: 'row', alignItems: 'center', gap: 5 },
  heroMetaText:  { color: 'rgba(255,255,255,0.75)', fontSize: 12, fontWeight: '600' },
  typeBadge:     { flexDirection: 'row', alignItems: 'center', gap: 5, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4, alignSelf: 'flex-start' },
  typeText:      { color: Colors.white, fontSize: 11, fontWeight: '700' },
  dateBox:       { position: 'absolute', right: 20, bottom: 28, alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 16, paddingVertical: 10, paddingHorizontal: 14 },
  dateNum:       { fontSize: 28, fontWeight: '900', color: Colors.white, lineHeight: 30 },
  dateMon:       { fontSize: 11, fontWeight: '700', color: 'rgba(255,255,255,0.8)' },
  shareBtn:      { position: 'absolute', top: 54, right: 20, width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },

  content:       { paddingHorizontal: 16, paddingTop: 16 },

  pillRow:       { flexDirection: 'row', gap: 8, marginBottom: 14 },
  pillPast:      { backgroundColor: '#6B728020', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 5 },
  pillPastText:  { fontSize: 12, fontWeight: '700', color: '#6B7280' },
  pillFull:      { backgroundColor: Colors.error + '20', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 5 },
  pillFullText:  { fontSize: 12, fontWeight: '700', color: Colors.error },
  pillOpen:      { backgroundColor: '#10B98120', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 5 },
  pillOpenText:  { fontSize: 12, fontWeight: '700', color: '#10B981' },

  infoCard:      { borderRadius: 16, borderWidth: 1, overflow: 'hidden', marginBottom: 12 },
  infoRow:       { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 13 },
  infoLeft:      { flexDirection: 'row', alignItems: 'center', gap: 8 },
  infoLabel:     { fontSize: 13, fontWeight: '500' },
  infoValue:     { fontSize: 13, fontWeight: '600', flex: 1, textAlign: 'right', marginLeft: 12 },
  divider:       { height: 1 },

  spotsCard:     { borderRadius: 16, borderWidth: 1, padding: 16, marginBottom: 12 },
  spotsHeader:   { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  spotsTitle:    { fontSize: 15, fontWeight: '700' },
  spotsCount:    { fontSize: 13, fontWeight: '700' },
  barTrack:      { height: 8, borderRadius: 4, overflow: 'hidden', marginBottom: 8 },
  barFill:       { height: '100%', borderRadius: 4 },
  spotsHint:     { fontSize: 12, lineHeight: 18 },

  descCard:      { borderRadius: 16, borderWidth: 1, padding: 16, marginBottom: 12 },
  descTitle:     { fontSize: 15, fontWeight: '700', marginBottom: 10 },
  descText:      { fontSize: 14, lineHeight: 22 },

  cta:           { borderRadius: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 16, marginTop: 4 },
  ctaText:       { ...Typography.button, color: Colors.white },
})
