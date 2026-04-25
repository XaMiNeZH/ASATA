import { create } from 'zustand';

import * as authService from '../services/auth.service';
import type { AuthCredentials, RegisterPayload, UserWithProfil } from '../types';
import { storage } from '../utils/storage';

interface AuthStore {
  user: UserWithProfil | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: AuthCredentials) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (data: Partial<UserWithProfil>) => void;
  hydrate: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  token: null,
  isLoading: false,
  isAuthenticated: false,
  login: async (credentials) => {
    const response = await authService.login(credentials);
    await storage.set(authService.AUTH_TOKEN_KEY, response.token);
    await storage.set(authService.AUTH_USER_KEY, response.user);
    set({ user: response.user, token: response.token, isAuthenticated: true });
  },
  register: async (payload) => {
    const response = await authService.register(payload);
    await storage.set(authService.AUTH_TOKEN_KEY, response.token);
    await storage.set(authService.AUTH_USER_KEY, response.user);
    set({ user: response.user, token: response.token, isAuthenticated: true });
  },
  logout: async () => {
    await authService.logout();
    await storage.remove(authService.AUTH_TOKEN_KEY);
    await storage.remove(authService.AUTH_USER_KEY);
    set({ user: null, token: null, isAuthenticated: false });
  },
  updateUser: (data) => {
    const currentUser = get().user;
    if (!currentUser) {
      return;
    }

    set({ user: { ...currentUser, ...data } });
  },
  hydrate: async () => {
    set({ isLoading: true });
    try {
      const [token, user] = await Promise.all([
        storage.get<string>(authService.AUTH_TOKEN_KEY),
        authService.getCurrentUser(),
      ]);
      set({ token, user, isAuthenticated: Boolean(token && user) });
    } catch {
      set({ user: null, token: null, isAuthenticated: false });
    } finally {
      set({ isLoading: false });
    }
  },
}));
