const USE_MOCK = false; // Set to false when real backend is ready

import { apiClient } from '../api/client';
import { mockEvents } from '../mocks/events.mock';
import { mockParticipations } from '../mocks/participations.mock';
import type { Evenement } from '../types';

const delay = async (): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 200 + Math.random() * 300));
};

export const getEvents = async (): Promise<Evenement[]> => {
  if (!USE_MOCK) {
    return apiClient.request<Evenement[]>('/events');
  }

  await delay();
  return [...mockEvents].sort((first, second) => Date.parse(first.date) - Date.parse(second.date));
};

export const getEventById = async (id: string): Promise<Evenement> => {
  if (!USE_MOCK) {
    return apiClient.request<Evenement>(`/events/${id}`);
  }

  await delay();
  const event = mockEvents.find((item) => item.id === id);
  if (!event) {
    throw new Error('Evenement introuvable.');
  }

  return { ...event };
};

export const isUserRegistered = async (eventId: string, userId: string): Promise<boolean> => {
  if (!USE_MOCK) {
    return apiClient.request<boolean>(`/events/${eventId}/registered`);
  }

  await delay();
  return mockParticipations.some(
    (item) => item.evenementId === eventId && item.userId === userId && item.statut !== 'annule',
  );
};
