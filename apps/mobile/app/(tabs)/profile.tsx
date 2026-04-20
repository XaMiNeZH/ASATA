import { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch, Alert } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/theme/colors'
import { Typography } from '@/theme/typography'
import { useAuthStore } from '@/stores/authStore'
import { useThemeStore } from '@/stores/themeStore'

const CLUB_LABELS: Record<string, string> = {
  ski: 'Ski & Montagne', football: 'Football', athletisme: 'Athlétisme',
}
const CLUB_COLORS: Record<string, string> = {
  ski: Colors.primary, football: '#16A34A', athletisme: '#EA580C',
}
const CLUB_ICONS: Record<string, string> = {
  ski: 'snow', football: 'football', athletisme: 'walk',
}

type RowProps = {
  icon: string
  label: string
  value?: string
  right?: React.ReactNode
  onPress?: () => void
  color?: string
  colors: any
}

function SettingRow({ icon, label, value, right, onPress, color, colors }: RowProps) {
  const iconColor = color ?? colors.textMuted
  return (
    <TouchableOpacity
      style={[styles.row, { borderBottomColor: colors.border }]}
      onPress={onPress}
      activeOpacity={onPress ? 0.65 : 1}
      disabled={!onPress && !right}
    >
      <View style={[styles.rowIcon, { backgroundColor: iconColor + '18' }]}>
        <Ionicons name={icon as any} size={18} color={iconColor} />
      </View>
      <View style={styles.rowBody}>
        <Text style={[styles.rowLabel, { color: colors.textPrimary }]}>{label}</Text>
        {value ? <Text style={[styles.rowValue, { color: colors.textMuted }]}>{value}</Text> : null}
      </View>
      {right ?? (onPress ? <Ionicons name="chevron-forward" size={16} color={colors.textMuted} /> : null)}
    </TouchableOpacity>
  )
}

function SectionCard({ title, children, colors }: { title: string; children: React.ReactNode; colors: any }) {
  return (
    <View style={styles.sectionWrap}>
      <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>{title}</Text>
      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        {children}
      </View>
    </View>
  )
}

export default function ProfileScreen() {
  const user   = useAuthStore(s => s.user)
  const logout = useAuthStore(s => s.logout)
  const { dark, colors, toggle } = useThemeStore()
  const [notifs, setNotifs] = useState(true)

  const clubColor = CLUB_COLORS[user?.club ?? 'ski']
  const initials  = `${user?.firstName?.[0] ?? ''}${user?.lastName?.[0] ?? ''}`.toUpperCase()

  const handleLogout = () => {
    Alert.alert(
      'Se déconnecter',
      'Voulez-vous vraiment vous déconnecter ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Déconnecter', style: 'destructive', onPress: logout },
      ]
    )
  }

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: Colors.primary }]}>
        <Text style={styles.headerTitle}>Profil</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Avatar card */}
        <View style={[styles.avatarCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={[styles.avatar, { backgroundColor: clubColor + '25' }]}>
            <Text style={[styles.avatarText, { color: clubColor }]}>{initials}</Text>
          </View>
          <View style={styles.avatarInfo}>
            <Text style={[styles.name, { color: colors.textPrimary }]}>
              {user?.firstName} {user?.lastName}
            </Text>
            <Text style={[styles.email, { color: colors.textMuted }]}>{user?.email}</Text>
            <View style={styles.badgeRow}>
              <View style={[styles.clubBadge, { backgroundColor: clubColor + '20', borderColor: clubColor + '40' }]}>
                <Ionicons name={CLUB_ICONS[user?.club ?? 'ski'] as any} size={11} color={clubColor} />
                <Text style={[styles.clubBadgeText, { color: clubColor }]}>
                  {CLUB_LABELS[user?.club ?? 'ski']}
                </Text>
              </View>
              {user?.role === 'admin' && (
                <View style={styles.adminBadge}>
                  <Text style={styles.adminBadgeText}>Admin</Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Info */}
        <SectionCard title="INFORMATIONS" colors={colors}>
          <SettingRow icon="person-outline"    label="Prénom"    value={user?.firstName}  colors={colors} />
          <SettingRow icon="person-outline"    label="Nom"       value={user?.lastName}   colors={colors} />
          <SettingRow icon="mail-outline"      label="Email"     value={user?.email}      colors={colors} />
          <SettingRow icon="shield-checkmark-outline" label="Rôle" value={user?.role === 'admin' ? 'Administrateur' : 'Membre'} colors={colors} />
          <SettingRow
            icon="football-outline"
            label="Club"
            value={CLUB_LABELS[user?.club ?? 'ski']}
            color={clubColor}
            colors={colors}
          />
        </SectionCard>

        {/* Preferences */}
        <SectionCard title="PRÉFÉRENCES" colors={colors}>
          <SettingRow
            icon="notifications-outline"
            label="Notifications push"
            colors={colors}
            right={
              <Switch
                value={notifs}
                onValueChange={setNotifs}
                trackColor={{ false: colors.border, true: Colors.primary + '80' }}
                thumbColor={notifs ? Colors.primary : colors.textMuted}
              />
            }
          />
          <SettingRow
            icon={dark ? 'moon' : 'sunny-outline'}
            label="Mode sombre"
            color={dark ? '#8B5CF6' : '#F59E0B'}
            colors={colors}
            right={
              <Switch
                value={dark}
                onValueChange={toggle}
                trackColor={{ false: colors.border, true: '#8B5CF680' }}
                thumbColor={dark ? '#8B5CF6' : colors.textMuted}
              />
            }
          />
        </SectionCard>

        {/* App info */}
        <SectionCard title="APPLICATION" colors={colors}>
          <SettingRow icon="information-circle-outline" label="Version"      value="1.0.0"            colors={colors} />
          <SettingRow icon="globe-outline"              label="Organisation" value="ASATA — Asni"     colors={colors} />
          <SettingRow icon="document-text-outline"      label="Mentions légales"                      colors={colors} onPress={() => {}} />
        </SectionCard>

        {/* Logout */}
        <TouchableOpacity
          style={[styles.logoutBtn, { backgroundColor: Colors.error + '12', borderColor: Colors.error + '30' }]}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <Ionicons name="log-out-outline" size={18} color={Colors.error} />
          <Text style={[styles.logoutText, { color: Colors.error }]}>Se déconnecter</Text>
        </TouchableOpacity>

        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  root:            { flex: 1 },
  header:          { paddingTop: 56, paddingHorizontal: 20, paddingBottom: 20 },
  headerTitle:     { ...Typography.h2, color: Colors.white },
  content:         { paddingHorizontal: 16, paddingTop: 16 },

  avatarCard:      { flexDirection: 'row', alignItems: 'center', gap: 16, borderRadius: 20, borderWidth: 1, padding: 20, marginBottom: 20 },
  avatar:          { width: 64, height: 64, borderRadius: 32, alignItems: 'center', justifyContent: 'center' },
  avatarText:      { fontSize: 24, fontWeight: '900' },
  avatarInfo:      { flex: 1, gap: 3 },
  name:            { ...Typography.h3 },
  email:           { fontSize: 12 },
  badgeRow:        { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 6, flexWrap: 'wrap' },
  clubBadge:       { flexDirection: 'row', alignItems: 'center', gap: 5, borderRadius: 10, borderWidth: 1, paddingHorizontal: 10, paddingVertical: 4 },
  clubBadgeText:   { fontSize: 11, fontWeight: '700' },
  adminBadge:      { backgroundColor: Colors.warning + '20', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 4 },
  adminBadgeText:  { fontSize: 11, fontWeight: '800', color: Colors.warning },

  sectionWrap:     { marginBottom: 18 },
  sectionTitle:    { fontSize: 11, fontWeight: '700', letterSpacing: 0.8, marginBottom: 6, marginLeft: 4 },
  card:            { borderRadius: 16, borderWidth: 1, overflow: 'hidden' },

  row:             { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 13, borderBottomWidth: StyleSheet.hairlineWidth, gap: 12 },
  rowIcon:         { width: 34, height: 34, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  rowBody:         { flex: 1 },
  rowLabel:        { fontSize: 14, fontWeight: '500' },
  rowValue:        { fontSize: 12, marginTop: 1 },

  logoutBtn:       { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, borderRadius: 16, borderWidth: 1, paddingVertical: 15, marginBottom: 8 },
  logoutText:      { fontSize: 15, fontWeight: '700' },
})
