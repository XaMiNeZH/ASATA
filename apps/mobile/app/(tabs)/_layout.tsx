import { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/theme/colors'
import { useThemeStore } from '@/stores/themeStore'
import { useUnreadStore } from '@/stores/unreadStore'
import { useAnnouncementsStore } from '@/stores/announcementsStore'

function Badge({ count }: { count: number }) {
  if (count <= 0) return null
  return (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>{count > 99 ? '99+' : count}</Text>
    </View>
  )
}

export default function TabsLayout() {
  const { colors, dark } = useThemeStore()
  const { count, setTotal } = useUnreadStore()
  const { items } = useAnnouncementsStore()

  // Sync unread count whenever announcements change
  useEffect(() => {
    setTotal(items.length)
  }, [items.length])

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          height: 62,
          paddingBottom: 8,
        },
        tabBarLabelStyle: { fontSize: 10, fontWeight: '600' },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Accueil',
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="announcements/index"
        options={{
          title: 'Annonces',
          tabBarIcon: ({ color, size, focused }) => (
            <View>
              <Ionicons name={focused ? 'megaphone' : 'megaphone-outline'} size={size} color={color} />
              <Badge count={count} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="events/index"
        options={{
          title: 'Événements',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? 'calendar' : 'calendar-outline'} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="members/index"
        options={{
          title: 'Membres',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? 'people' : 'people-outline'} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? 'person-circle' : 'person-circle-outline'} size={size} color={color} />
          ),
        }}
      />

      {/* Hidden screens */}
      <Tabs.Screen name="announcements/[id]"  options={{ href: null }} />
      <Tabs.Screen name="announcements/new"   options={{ href: null }} />
      <Tabs.Screen name="members/[id]"        options={{ href: null }} />
      <Tabs.Screen name="events/[id]"         options={{ href: null }} />
    </Tabs>
  )
}

const styles = StyleSheet.create({
  badge:     { position: 'absolute', top: -4, right: -8, minWidth: 16, height: 16, borderRadius: 8, backgroundColor: Colors.error, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 3 },
  badgeText: { color: '#fff', fontSize: 9, fontWeight: '800' },
})
