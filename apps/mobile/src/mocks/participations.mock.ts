import type { Participation } from '../types';

export const mockParticipations: Participation[] = [
  {
    id: 'p1',
    userId: 'u1',
    evenementId: 'e1',
    dateInscription: '2026-04-12T11:00:00.000Z',
    statut: 'confirme',
    presence: 'non_renseigne',
  },
  {
    id: 'p2',
    userId: 'u1',
    evenementId: 'e4',
    dateInscription: '2026-04-05T14:15:00.000Z',
    statut: 'annule',
    presence: 'absent',
  },
  {
    id: 'p3',
    userId: 'u1',
    evenementId: 'e2',
    dateInscription: '2026-04-20T16:30:00.000Z',
    statut: 'en_attente',
    presence: 'non_renseigne',
  },
  {
    id: 'p4',
    userId: 'u1',
    evenementId: 'e5',
    dateInscription: '2026-03-01T09:45:00.000Z',
    statut: 'confirme',
    presence: 'present',
  },
];
