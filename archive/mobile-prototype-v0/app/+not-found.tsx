import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import { Colors } from '@/theme/colors'

export default function NotFound() {
  const router = useRouter()
  return (
    <View style={styles.root}>
      <Text style={styles.title}>Page introuvable</Text>
      <TouchableOpacity onPress={() => router.replace('/')} style={styles.btn}>
        <Text style={styles.btnText}>Retour à l'accueil</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  root:    { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.background },
  title:   { fontSize: 18, fontWeight: '700', color: Colors.textPrimary, marginBottom: 16 },
  btn:     { backgroundColor: Colors.primary, paddingHorizontal: 24, paddingVertical: 12, borderRadius: 12 },
  btnText: { color: Colors.white, fontWeight: '700' },
})
