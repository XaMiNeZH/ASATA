/**
 * API Base URL Configuration
 *
 * Development: Replace 192.168.x.x with your computer's local IP address.
 * Find it with:
 *   - Linux/Mac: `ip addr` or `ifconfig`
 *   - Windows: `ipconfig`
 * The IP must be on the same WiFi network as your phone.
 *
 * Production: Update the production URL when the API is deployed.
 */
import { DEV_API_HOST, DEV_API_PORT } from '../config/api.config';
import { storage } from '../utils/storage';

export const API_BASE_URL = __DEV__
  ? `http://${DEV_API_HOST}:${DEV_API_PORT}/api`
  : 'https://api.asata.ma/api';

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
}

interface ApiError {
  success: false;
  message: string;
}

export const apiClient = {
  request: async <T>(path: string, options: RequestOptions = {}): Promise<T> => {
    const token = await storage.get<string>('asata_token');

    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: options.method ?? 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    const json = (await response.json()) as { success: boolean; data?: T; message?: string };

    if (!response.ok || !json.success) {
      const error = json as ApiError;
      throw new Error(error.message ?? 'Erreur réseau. Veuillez réessayer.');
    }

    return json.data as T;
  },
};
