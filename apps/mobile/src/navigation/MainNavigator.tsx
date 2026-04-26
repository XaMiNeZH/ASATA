import type { ComponentProps } from 'react';
import { Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';

import { Colors } from '../constants/colors';
import { FontSize } from '../constants/typography';
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

const getScreenOptions = () => ({ headerShown: false });

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator screenOptions={getScreenOptions()}>
      <HomeStack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="Notifications" component={NotificationsScreen} />
    </HomeStack.Navigator>
  );
}

function EventsStackNavigator() {
  return (
    <EventsStack.Navigator screenOptions={getScreenOptions()}>
      <EventsStack.Screen name="Events" component={EventsScreen} />
      <EventsStack.Screen name="EventDetail" component={EventDetailScreen} />
    </EventsStack.Navigator>
  );
}

function AnnouncementsStackNavigator() {
  return (
    <AnnouncementsStack.Navigator screenOptions={getScreenOptions()}>
      <AnnouncementsStack.Screen name="Announcements" component={AnnouncementsScreen} />
      <AnnouncementsStack.Screen name="AnnouncementDetail" component={AnnouncementDetailScreen} />
    </AnnouncementsStack.Navigator>
  );
}

function ProfileStackNavigator() {
  return (
    <ProfileStack.Navigator screenOptions={getScreenOptions()}>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
      <ProfileStack.Screen name="EditProfile" component={EditProfileScreen} />
    </ProfileStack.Navigator>
  );
}

const renderIcon =
  (name: FeatherName) =>
  ({ focused }: { focused: boolean }) =>
    (
      <View style={[styles.tabIconShell, focused && styles.tabIconShellActive]}>
        <Feather name={name} color={focused ? Colors.surface : Colors.onPrimaryContainer} size={24} />
      </View>
    );

export function MainNavigator() {
  const unreadCount = useNotificationsStore((state) => state.unreadCount);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.onPrimaryContainer,
        tabBarStyle: styles.tabBar,
        tabBarBadgeStyle: styles.badge,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tab.Screen
        name="Accueil"
        component={HomeStackNavigator}
        options={{ tabBarIcon: renderIcon('home'), tabBarLabel: 'Home', tabBarBadge: unreadCount || undefined }}
      />
      <Tab.Screen
        name="Activites"
        component={EventsStackNavigator}
        options={{ tabBarIcon: renderIcon('calendar'), tabBarLabel: 'Events' }}
      />
      <Tab.Screen
        name="Participations"
        component={ParticipationsScreen}
        options={{ tabBarIcon: renderIcon('award'), tabBarLabel: 'Joined' }}
      />
      <Tab.Screen
        name="Annonces"
        component={AnnouncementsStackNavigator}
        options={{ tabBarIcon: renderIcon('volume-2'), tabBarLabel: 'News' }}
      />
      <Tab.Screen
        name="Profil"
        component={ProfileStackNavigator}
        options={{ tabBarIcon: renderIcon('user'), tabBarLabel: 'Profile' }}
      />
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
    borderTopColor: Colors.divider,
    borderTopWidth: 1,
    height: 72,
    paddingBottom: 10,
    paddingTop: 6,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 8,
  },
  tabBarLabel: {
    fontSize: FontSize.tab,
    fontWeight: '600',
  },
  badge: {
    backgroundColor: Colors.skyBlue,
    color: Colors.surface,
  },
  tabIconShell: {
    width: 40,
    height: 28,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIconShellActive: {
    backgroundColor: Colors.primary,
  },
});
