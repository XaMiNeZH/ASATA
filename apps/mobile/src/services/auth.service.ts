const USE_MOCK = true; // Set to false when real backend is ready

import { apiClient } from '../api/client';
import { MOCK_PASSWORD, mockUsers } from '../mocks/users.mock';
import type { AuthCredentials, AuthResponse, Profil, RegisterPayload, UserWithProfil } from '../types';
import { storage } from '../utils/storage';

export const AUTH_TOKEN_KEY = 'asata_token';
export const AUTH_USER_KEY = 'asata_user';

const delay = async (): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 200 + Math.random() * 300));
};

export const login = async (credentials: AuthCredentials): Promise<AuthResponse> => {
  if (!USE_MOCK) {
    return apiClient.request<AuthResponse>('/auth/login', { method: 'POST', body: credentials });
  }

  await delay();
  const user = mockUsers.find((item) => item.email.toLowerCase() === credentials.email.trim().toLowerCase());

  if (!user || credentials.motDePasse !== MOCK_PASSWORD) {
    throw new Error('Identifiants incorrects.');
  }

  return { token: `mock-token-${user.id}`, user };
};

export const register = async (payload: RegisterPayload): Promise<AuthResponse> => {
  if (!USE_MOCK) {
    return apiClient.request<AuthResponse>('/auth/register', { method: 'POST', body: payload });
  }

  await delay();
  const email = payload.email.trim().toLowerCase();
  if (mockUsers.some((item) => item.email.toLowerCase() === email)) {
    throw new Error('Cet email est deja utilise.');
  }

  const user: UserWithProfil = {
    id: `u${mockUsers.length + 1}`,
    nom: payload.nom.trim(),
    email,
    role: 'membre',
    dateCreation: new Date().toISOString(),
    dateInscription: new Date().toISOString(),
    statut: 'actif',
    profil: {
      id: `p${mockUsers.length + 1}`,
      userId: `u${mockUsers.length + 1}`,
      telephone: payload.telephone,
    },
  };

  mockUsers.push(user);
  return { token: `mock-token-${user.id}`, user };
};

export const logout = async (): Promise<void> => {
  if (!USE_MOCK) {
    await apiClient.request<void>('/auth/logout', { method: 'POST' });
  }

  await delay();
};

export const getCurrentUser = async (): Promise<UserWithProfil | null> => {
  return storage.get<UserWithProfil>(AUTH_USER_KEY);
};

export const updateProfil = async (userId: string, data: Partial<Profil>): Promise<Profil> => {
  if (!USE_MOCK) {
    return apiClient.request<Profil>(`/users/${userId}/profil`, { method: 'PATCH', body: data });
  }

  await delay();
  const user = mockUsers.find((item) => item.id === userId);
  if (!user) {
    throw new Error('Utilisateur introuvable.');
  }

  user.profil = { ...user.profil, ...data };
  return user.profil;
};
