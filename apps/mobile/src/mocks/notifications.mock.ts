import type { Notification } from '../types';

export const mockNotifications: Notification[] = [
  {
    id: 'n1',
    userId: 'u1',
    message: 'Votre inscription au Tournoi de Football Regional est confirmee.',
    dateEnvoi: '2026-04-24T12:00:00.000Z',
    type: 'event_confirmation',
    lu: false,
  },
  {
    id: 'n2',
    userId: 'u1',
    message: 'La Journee Sportive ASATA a ete annulee.',
    dateEnvoi: '2026-04-23T15:15:00.000Z',
    type: 'event_cancelled',
    lu: false,
  },
  {
    id: 'n3',
    userId: 'u1',
    message: 'Nouvelle annonce: Ouverture des inscriptions estivales.',
    dateEnvoi: '2026-04-21T09:05:00.000Z',
    type: 'announcement',
    lu: true,
  },
  {
    id: 'n4',
    userId: 'u1',
    message: 'Rappel: Marathon de l Atlas demain matin.',
    dateEnvoi: '2026-04-24T08:00:00.000Z',
    type: 'reminder',
    lu: false,
  },
  {
    id: 'n5',
    userId: 'u1',
    message: 'Votre participation au stage de natation est en attente.',
    dateEnvoi: '2026-04-20T17:00:00.000Z',
    type: 'event_confirmation',
    lu: true,
  },
];
