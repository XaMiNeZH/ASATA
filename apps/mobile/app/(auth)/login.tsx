import { useState } from 'react'
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ActivityIndicator, KeyboardAvoidingView,
  Platform, ScrollView, Image,
} from 'react-native'
import { Colors } from '@/theme/colors'
import { Typography } from '@/theme/typography'
import { useAuthStore } from '@/stores/authStore'

export default function LoginScreen() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const { login, loading, error } = useAuthStore()

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>A</Text>
          </View>
          <Text style={styles.brand}>ASATA</Text>
          <Text style={styles.tagline}>Atlas Toubkal Asni</Text>
          <Text style={styles.subtitle}>Espace membres</Text>
        </View>

        {/* Card */}
        <View style={styles.card}>
          <Text style={styles.title}>Connexion</Text>
          <Text style={styles.desc}>
            Connectez-vous pour accéder aux annonces et aux informations du club.
          </Text>

          {error && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          <View style={styles.field}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="votre@email.com"
              placeholderTextColor={Colors.textMuted}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Mot de passe</Text>
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor={Colors.textMuted}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            style={[styles.btn, loading && styles.btnDisabled]}
            onPress={() => login(email, password)}
            disabled={loading || !email || !password}
            activeOpacity={0.85}
          >
            {loading
              ? <ActivityIndicator color={Colors.white} />
              : <Text style={styles.btnText}>Se connecter</Text>
            }
          </TouchableOpacity>

          <Text style={styles.hint}>
            Mot de passe de démonstration : <Text style={{ color: Colors.primary, fontWeight: '700' }}>asata2026</Text>
          </Text>
        </View>

        <Text style={styles.footer}>© 2026 ASATA — Tous droits réservés</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  root:       { flex: 1, backgroundColor: Colors.primary },
  scroll:     { flexGrow: 1, justifyContent: 'center', padding: 24 },
  header:     { alignItems: 'center', marginBottom: 32 },
  logoCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  logoText:   { fontSize: 36, fontWeight: '900', color: Colors.white },
  brand:      { ...Typography.h1, color: Colors.white, marginBottom: 2 },
  tagline:    { ...Typography.body, color: 'rgba(255,255,255,0.65)', marginBottom: 8 },
  subtitle:   { ...Typography.label, color: 'rgba(255,255,255,0.5)' },
  card:       { backgroundColor: Colors.white, borderRadius: 24, padding: 28, shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 20, elevation: 8 },
  title:      { ...Typography.h2, color: Colors.textPrimary, marginBottom: 6 },
  desc:       { ...Typography.body, color: Colors.textSecondary, marginBottom: 20, lineHeight: 20 },
  errorBox:   { backgroundColor: '#FEE2E2', borderRadius: 12, padding: 12, marginBottom: 16 },
  errorText:  { color: Colors.error, fontSize: 13, fontWeight: '600' },
  field:      { marginBottom: 16 },
  label:      { ...Typography.label, color: Colors.textSecondary, marginBottom: 6 },
  input:      { backgroundColor: Colors.background, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, fontSize: 14, color: Colors.textPrimary, borderWidth: 1.5, borderColor: Colors.border },
  btn:        { backgroundColor: Colors.primary, borderRadius: 14, paddingVertical: 16, alignItems: 'center', marginTop: 8 },
  btnDisabled:{ opacity: 0.6 },
  btnText:    { ...Typography.button, color: Colors.white },
  hint:       { textAlign: 'center', fontSize: 12, color: Colors.textMuted, marginTop: 16 },
  footer:     { textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: 11, marginTop: 32 },
})
