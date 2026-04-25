import type { ComponentProps } from 'react';
import { Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';

import { Colors } from '../constants/colors';
import { AnnouncementsScreen } from '../screens/announcements/AnnouncementsScreen';
import { AnnouncementDetailScreen } from '../screens/announcements/AnnouncementDetailScreen';
import { EventDetailScreen } from '../screens/events/EventDetailScreen';
import { EventsScreen } from '../screens/events/EventsScreen';
import { HomeScreen } from '../screens/home/HomeScreen';
import { NotificationsScreen } from '../screens/notifications/NotificationsScreen';
import { ParticipationsScreen } from '../screens/participations/ParticipationsScreen';
import { EditProfileScreen } from '../screens/profile/EditProfileScreen';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { useNotificationsStore } from '../store/notifications.store';
import type {
  AnnouncementsStackParamList,
  EventsStackParamList,
  HomeStackParamList,
  MainTabParamList,
  ProfileStackParamList,
} from '../types';

type FeatherName = ComponentProps<typeof Feather>['name'];

const Tab = createBottomTabNavigator<MainTabParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const EventsStack = createNativeStackNavigator<EventsStackParamList>();
const AnnouncementsStack = createNativeStackNavigator<AnnouncementsStackParamList>();
const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

const getScreenOptions = () => ({
  headerStyle: styles.header,
  headerTintColor: Colors.surface,
  headerTitleStyle: styles.headerTitle,
  headerBackTitleVisible: false,
});

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator screenOptions={getScreenOptions()}>
      <HomeStack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="Notifications" component={NotificationsScreen} options={{ title: 'Notifications' }} />
    </HomeStack.Navigator>
  );
}

function EventsStackNavigator() {
  return (
    <EventsStack.Navigator screenOptions={getScreenOptions()}>
      <EventsStack.Screen name="Events" component={EventsScreen} options={{ title: 'Activites' }} />
      <EventsStack.Screen
        name="EventDetail"
        component={EventDetailScreen}
        options={{ title: '', headerTransparent: true, headerBackVisible: false }}
      />
    </EventsStack.Navigator>
  );
}

function AnnouncementsStackNavigator() {
  return (
    <AnnouncementsStack.Navigator screenOptions={getScreenOptions()}>
      <AnnouncementsStack.Screen name="Announcements" component={AnnouncementsScreen} options={{ title: 'Annonces' }} />
      <AnnouncementsStack.Screen
        name="AnnouncementDetail"
        component={AnnouncementDetailScreen}
        options={{ headerShown: false }}
      />
    </AnnouncementsStack.Navigator>
  );
}

function ProfileStackNavigator() {
  return (
    <ProfileStack.Navigator screenOptions={getScreenOptions()}>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
      <ProfileStack.Screen name="EditProfile" component={EditProfileScreen} options={{ title: 'Modifier' }} />
    </ProfileStack.Navigator>
  );
}

const renderIcon =
  (name: FeatherName) =>
  ({ color, size }: { color: string; size: number }) =>
    <Feather name={name} color={color} size={size} />;

export function MainNavigator() {
  const unreadCount = useNotificationsStore((state) => state.unreadCount);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarStyle: styles.tabBar,
        tabBarBadgeStyle: styles.badge,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tab.Screen
        name="Accueil"
        component={HomeStackNavigator}
        options={{ tabBarIcon: renderIcon('home'), tabBarBadge: unreadCount || undefined }}
      />
      <Tab.Screen name="Activites" component={EventsStackNavigator} options={{ tabBarIcon: renderIcon('calendar') }} />
      <Tab.Screen
        name="Participations"
        component={ParticipationsScreen}
        options={{ tabBarIcon: renderIcon('check-circle') }}
      />
      <Tab.Screen name="Annonces" component={AnnouncementsStackNavigator} options={{ tabBarIcon: renderIcon('bell') }} />
      <Tab.Screen name="Profil" component={ProfileStackNavigator} options={{ tabBarIcon: renderIcon('user') }} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.primary,
  },
  headerTitle: {
    color: Colors.surface,
    fontWeight: '700',
    fontSize: 17,
  },
  tabBar: {
    backgroundColor: Colors.surface,
    borderTopColor: Colors.border,
    borderTopWidth: 1,
    height: 60,
    paddingBottom: 8,
    paddingTop: 6,
  },
  tabBarLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
  badge: {
    backgroundColor: Colors.accent,
  },
});
