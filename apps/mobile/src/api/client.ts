/**
 * API Base URL Configuration
 *
 * Set EXPO_PUBLIC_API_BASE_URL before building when the app should target
 * another deployed API. Installed APKs cannot reach localhost on a dev machine.
 */
import { API_BASE_URL } from '../config/api.config';
import { storage } from '../utils/storage';

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
}

const TOKEN_KEY = 'asata_token';
const USER_KEY = 'asata_user';

export const apiClient = {
  request: async <T>(path: string, options: RequestOptions = {}): Promise<T> => {
    const token = await storage.get<string>(TOKEN_KEY);

    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: options.method ?? 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    if (response.status === 401) {
      await storage.remove(TOKEN_KEY);
      await storage.remove(USER_KEY);
      throw new Error('SESSION_EXPIRED');
    }

    const json = (await response.json()) as { success: boolean; data?: T; message?: string };

    if (!response.ok || !json.success) {
      throw new Error(json.message ?? 'Erreur réseau. Veuillez réessayer.');
    }

    return json.data as T;
  },
};
