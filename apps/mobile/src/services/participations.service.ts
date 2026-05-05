const USE_MOCK = false; // Set to false when real backend is ready

import { apiClient } from '../api/client';
import { mockEvents } from '../mocks/events.mock';
import { mockNotifications } from '../mocks/notifications.mock';
import { mockParticipations } from '../mocks/participations.mock';
import type { Participation } from '../types';

const delay = async (): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 200 + Math.random() * 300));
};

const withEvent = (participation: Participation): Participation => ({
  ...participation,
  evenement: mockEvents.find((event) => event.id === participation.evenementId),
});

export const registerForEvent = async (eventId: string, userId: string): Promise<Participation> => {
  if (!USE_MOCK) {
    return apiClient.request<Participation>('/participations', {
      method: 'POST',
      body: { evenementId: eventId },
    });
  }

  await delay();
  const event = mockEvents.find((item) => item.id === eventId);
  if (!event) {
    throw new Error('Evenement introuvable.');
  }

  const existing = mockParticipations.find(
    (item) => item.evenementId === eventId && item.userId === userId && item.statut !== 'annule',
  );
  if (existing) {
    return withEvent(existing);
  }

  if (event.inscrits >= event.capacite) {
    throw new Error('Événement complet');
  }

  event.inscrits += 1;
  const participation: Participation = {
    id: `p${Date.now()}`,
    userId,
    evenementId: eventId,
    dateInscription: new Date().toISOString(),
    statut: 'confirme',
    presence: 'non_renseigne',
  };
  mockParticipations.push(participation);
  mockNotifications.unshift({
    id: `n${Date.now()}`,
    userId,
    message: `Votre inscription a ${event.titre} est confirmee.`,
    dateEnvoi: new Date().toISOString(),
    type: 'event_confirmation',
    lu: false,
  });

  return withEvent(participation);
};

export const cancelParticipation = async (participationId: string): Promise<void> => {
  if (!USE_MOCK) {
    await apiClient.request<void>(`/participations/${participationId}/cancel`, {
      method: 'PATCH',
    });
    return;
  }

  await delay();
  const participation = mockParticipations.find((item) => item.id === participationId);
  if (!participation) {
    throw new Error('Participation introuvable.');
  }

  if (participation.statut !== 'annule') {
    participation.statut = 'annule';
    const event = mockEvents.find((item) => item.id === participation.evenementId);
    if (event && event.inscrits > 0) {
      event.inscrits -= 1;
      mockNotifications.unshift({
        id: `n${Date.now()}`,
        userId: participation.userId,
        message: `Votre participation a ${event.titre} a ete annulee.`,
        dateEnvoi: new Date().toISOString(),
        type: 'event_cancelled',
        lu: false,
      });
    }
  }
};

export const getUserParticipations = async (userId: string): Promise<Participation[]> => {
  if (!USE_MOCK) {
    return apiClient.request<Participation[]>('/participations/me');
  }

  await delay();
  return mockParticipations
    .filter((item) => item.userId === userId)
    .map(withEvent)
    .sort((first, second) => Date.parse(second.dateInscription) - Date.parse(first.dateInscription));
};
