/**
 * API Base URL for ASATA Connect mobile app.
 * Override EXPO_PUBLIC_API_BASE_URL before building preview/production APKs
 * when the app should target a different deployed API.
 */
const DEFAULT_API_BASE_URL = 'https://asata-production-ae83.up.railway.app/api';

const configuredApiBaseUrl = process.env.EXPO_PUBLIC_API_BASE_URL?.trim();

export const API_BASE_URL =
  configuredApiBaseUrl && configuredApiBaseUrl.length > 0
    ? configuredApiBaseUrl
    : DEFAULT_API_BASE_URL;
