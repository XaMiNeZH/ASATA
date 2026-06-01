import { apiClient } from '../api/client';
import type {
  AdminStats,
  Annonce,
  CreateAnnouncementPayload,
  CreateEventPayload,
  Evenement,
  UpdateAnnouncementPayload,
  UpdateEventPayload,
  UserWithProfil,
} from '../types';

export const getAdminStats = async (): Promise<AdminStats> =>
  apiClient.request<AdminStats>('/admin/stats');

export const getMembers = async (): Promise<UserWithProfil[]> =>
  apiClient.request<UserWithProfil[]>('/admin/members');

export const createEvent = async (data: CreateEventPayload): Promise<Evenement> =>
  apiClient.request<Evenement>('/events', { method: 'POST', body: data });

export const updateEvent = async (id: string, data: UpdateEventPayload): Promise<Evenement> =>
  apiClient.request<Evenement>(`/events/${id}`, { method: 'PUT', body: data });

export const deleteEvent = async (id: string): Promise<void> =>
  apiClient.request<void>(`/events/${id}`, { method: 'DELETE' });

export const createAnnouncement = async (data: CreateAnnouncementPayload): Promise<Annonce> =>
  apiClient.request<Annonce>('/announcements', { method: 'POST', body: data });

export const updateAnnouncement = async (
  id: string,
  data: UpdateAnnouncementPayload
): Promise<Annonce> => apiClient.request<Annonce>(`/announcements/${id}`, { method: 'PUT', body: data });

export const deleteAnnouncement = async (id: string): Promise<void> =>
  apiClient.request<void>(`/announcements/${id}`, { method: 'DELETE' });
