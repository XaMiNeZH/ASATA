const USE_MOCK = true; // Set to false when real backend is ready

import { apiClient } from '../api/client';
import { mockAnnouncements } from '../mocks/announcements.mock';
import type { Annonce } from '../types';

const delay = async (): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 200 + Math.random() * 300));
};

export const getAnnouncements = async (): Promise<Annonce[]> => {
  if (!USE_MOCK) {
    return apiClient.request<Annonce[]>('/announcements');
  }

  await delay();
  return [...mockAnnouncements]
    .filter((item) => item.visible)
    .sort((first, second) => Date.parse(second.datePublication) - Date.parse(first.datePublication));
};

export const getAnnouncementById = async (id: string): Promise<Annonce> => {
  if (!USE_MOCK) {
    return apiClient.request<Annonce>(`/announcements/${id}`);
  }

  await delay();
  const announcement = mockAnnouncements.find((item) => item.id === id && item.visible);
  if (!announcement) {
    throw new Error('Annonce introuvable.');
  }

  return announcement;
};
