import type { NavigatorScreenParams } from '@react-navigation/native';

export type UserRole = 'membre' | 'coach' | 'administrateur';
export type UserStatus = 'actif' | 'inactif' | 'suspendu';
export type EventStatus = 'planifie' | 'en_cours' | 'termine' | 'annule';
export type ParticipationStatus = 'confirme' | 'annule' | 'en_attente';
export type Presence = 'present' | 'absent' | 'non_renseigne';
export type NotificationType =
  | 'event_confirmation'
  | 'event_cancelled'
  | 'announcement'
  | 'reminder';

export interface User {
  id: string;
  nom: string;
  email: string;
  role: UserRole;
  dateCreation: string;
}

export interface Membre extends User {
  role: 'membre';
  dateInscription: string;
  statut: UserStatus;
}

export interface Coach extends User {
  role: 'coach';
  specialite: string;
  experience: number;
}

export interface Administrateur extends User {
  role: 'administrateur';
  niveau: number;
}

export interface Profil {
  id: string;
  userId: string;
  age?: number;
  telephone?: string;
  adresse?: string;
  photo?: string;
}

export interface UserWithProfil extends User {
  profil: Profil;
  statut?: UserStatus;
  dateInscription?: string;
  specialite?: string;
  experience?: number;
  niveau?: number;
}

export interface Evenement {
  id: string;
  titre: string;
  description: string;
  date: string;
  lieu: string;
  capacite: number;
  inscrits: number;
  statut: EventStatus;
  coverImage?: string;
}

export interface Participation {
  id: string;
  userId: string;
  evenementId: string;
  evenement?: Evenement;
  dateInscription: string;
  statut: ParticipationStatus;
  presence: Presence;
}

export interface Annonce {
  id: string;
  titre: string;
  contenu: string;
  datePublication: string;
  visible: boolean;
}

export interface Notification {
  id: string;
  userId: string;
  message: string;
  dateEnvoi: string;
  type: NotificationType;
  lu: boolean;
}

export interface AuthCredentials {
  email: string;
  motDePasse: string;
}

export interface RegisterPayload {
  nom: string;
  email: string;
  motDePasse: string;
  telephone?: string;
}

export interface AuthResponse {
  token: string;
  user: UserWithProfil;
}

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  Notifications: undefined;
};

export type EventsStackParamList = {
  Events: undefined;
  EventDetail: { eventId: string };
};

export type AnnouncementsStackParamList = {
  Announcements: undefined;
  AnnouncementDetail: { annonceId: string };
};

export type ProfileStackParamList = {
  Profile: undefined;
  EditProfile: undefined;
};

export type MainTabParamList = {
  Accueil: NavigatorScreenParams<HomeStackParamList>;
  Activites: NavigatorScreenParams<EventsStackParamList>;
  Participations: undefined;
  Annonces: NavigatorScreenParams<AnnouncementsStackParamList>;
  Profil: NavigatorScreenParams<ProfileStackParamList>;
};

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};
