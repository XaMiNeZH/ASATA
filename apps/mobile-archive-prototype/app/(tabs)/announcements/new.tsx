import { useState } from 'react'
import {
  View, Text, TextInput, TouchableOpacity, ScrollView,
  StyleSheet, ActivityIndicator, KeyboardAvoidingView, Platform, Switch,
} from 'react-native'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/theme/colors'
import { Typography } from '@/theme/typography'
import { useAuthStore } from '@/stores/authStore'
import { useAnnouncementsStore } from '@/stores/announcementsStore'
import { AnnouncementCategory, Club } from '@/models/types'

const CATEGORIES: { label: string; value: AnnouncementCategory; icon: string; color: string }[] = [
  { label: 'Général',       value: 'general',      icon: 'information-circle', color: Colors.info },
  { label: 'Événement',     value: 'evenement',    icon: 'calendar',           color: Colors.primary },
  { label: 'Compétition',   value: 'competition',  icon: 'trophy',             color: '#F59E0B' },
  { label: 'Entraînement',  value: 'entrainement', icon: 'barbell',            color: '#10B981' },
  { label: 'Urgent',        value: 'urgent',       icon: 'warning',            color: Colors.error },
]

const CLUBS: { label: string; value: Club | 'all' }[] = [
  { label: 'Tous les clubs', value: 'all' },
  { label: 'Ski & Montagne', value: 'ski' },
  { label: 'Football',       value: 'football' },
  { label: 'Athlétisme',     value: 'athletisme' },
]

export default function NewAnnouncementScreen() {
  const router  = useRouter()
  const user    = useAuthStore(s => s.user)
  const { create, loading } = useAnnouncementsStore()

  const [title,    setTitle]    = useState('')
  const [body,     setBody]     = useState('')
  const [category, setCategory] = useState<AnnouncementCategory>('general')
  const [club,     setClub]     = useState<Club | 'all'>('all')
  const [pinned,   setPinned]   = useState(false)
  const [done,     setDone]     = useState(false)

  const handleSubmit = async () => {
    if (!user || !title.trim() || !body.trim()) return
    await create(
      { title: title.trim(), body: body.trim(), category, club, pinned },
      { id: user.id, firstName: user.firstName, lastName: user.lastName }
    )
    setDone(true)
    setTimeout(() => router.back(), 1200)
  }

  const inp = [styles.input]

  return (
    <KeyboardAvoidingView style={styles.root} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nouvelle annonce</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>

        {done && (
          <View style={styles.successBox}>
            <Ionicons name="checkmark-circle" size={20} color={Colors.success} />
            <Text style={styles.successText}>Annonce publiée avec succès !</Text>
          </View>
        )}

        {/* Title */}
        <View style={styles.field}>
          <Text style={styles.label}>Titre *</Text>
          <TextInput style={inp} placeholder="Titre de l'annonce" placeholderTextColor={Colors.textMuted} value={title} onChangeText={setTitle} />
        </View>

        {/* Body */}
        <View style={styles.field}>
          <Text style={styles.label}>Contenu *</Text>
          <TextInput
            style={[...inp, styles.textArea]}
            placeholder="Contenu de l'annonce..."
            placeholderTextColor={Colors.textMuted}
            value={body}
            onChangeText={setBody}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />
        </View>

        {/* Category */}
        <View style={styles.field}>
          <Text style={styles.label}>Catégorie *</Text>
          <View style={styles.grid}>
            {CATEGORIES.map(c => (
              <TouchableOpacity
                key={c.value}
                style={[styles.optionBtn, category === c.value && { borderColor: c.color, backgroundColor: c.color + '15' }]}
                onPress={() => setCategory(c.value)}
              >
                <Ionicons name={c.icon as any} size={16} color={category === c.value ? c.color : Colors.textMuted} />
                <Text style={[styles.optionText, category === c.value && { color: c.color, fontWeight: '700' }]}>{c.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Club */}
        <View style={styles.field}>
          <Text style={styles.label}>Destinataires</Text>
          <View style={styles.grid}>
            {CLUBS.map(c => (
              <TouchableOpacity
                key={c.value}
                style={[styles.optionBtn, club === c.value && styles.optionBtnActive]}
                onPress={() => setClub(c.value)}
              >
                <Text style={[styles.optionText, club === c.value && styles.optionTextActive]}>{c.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Pinned */}
        <View style={styles.switchRow}>
          <View>
            <Text style={styles.switchLabel}>Épingler l'annonce</Text>
            <Text style={styles.switchDesc}>L'annonce apparaîtra en haut de la liste</Text>
          </View>
          <Switch
            value={pinned}
            onValueChange={setPinned}
            trackColor={{ false: Colors.border, true: Colors.primaryLight }}
            thumbColor={pinned ? Colors.primary : Colors.white}
          />
        </View>

        {/* Submit */}
        <TouchableOpacity
          style={[styles.submitBtn, (loading || !title || !body) && styles.submitDisabled]}
          onPress={handleSubmit}
          disabled={loading || !title.trim() || !body.trim()}
          activeOpacity={0.85}
        >
          {loading
            ? <ActivityIndicator color={Colors.white} />
            : <>
                <Ionicons name="send" size={16} color={Colors.white} />
                <Text style={styles.submitText}>Publier l'annonce</Text>
              </>
          }
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  root:           { flex: 1, backgroundColor: Colors.background },
  header:         { backgroundColor: Colors.primary, paddingTop: 56, paddingHorizontal: 20, paddingBottom: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  backBtn:        { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  headerTitle:    { ...Typography.h3, color: Colors.white },
  scroll:         { padding: 20, paddingBottom: 40 },
  successBox:     { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#DCFCE7', borderRadius: 12, padding: 14, marginBottom: 16 },
  successText:    { color: Colors.success, fontWeight: '700', fontSize: 14 },
  field:          { marginBottom: 20 },
  label:          { ...Typography.label, color: Colors.textSecondary, marginBottom: 8 },
  input:          { backgroundColor: Colors.card, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 13, fontSize: 14, color: Colors.textPrimary, borderWidth: 1.5, borderColor: Colors.border },
  textArea:       { minHeight: 130, paddingTop: 13 },
  grid:           { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  optionBtn:      { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 9, borderRadius: 10, borderWidth: 1.5, borderColor: Colors.border, backgroundColor: Colors.card },
  optionBtnActive:{ borderColor: Colors.primary, backgroundColor: Colors.primaryPale },
  optionText:     { fontSize: 12, fontWeight: '600', color: Colors.textSecondary },
  optionTextActive:{ color: Colors.primary, fontWeight: '700' },
  switchRow:      { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: Colors.card, borderRadius: 14, padding: 16, marginBottom: 24, borderWidth: 1, borderColor: Colors.border },
  switchLabel:    { fontWeight: '700', fontSize: 14, color: Colors.textPrimary, marginBottom: 2 },
  switchDesc:     { fontSize: 11, color: Colors.textMuted },
  submitBtn:      { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: Colors.primary, borderRadius: 14, paddingVertical: 16 },
  submitDisabled: { opacity: 0.5 },
  submitText:     { ...Typography.button, color: Colors.white },
})
