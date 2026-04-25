import type { UserWithProfil } from '../types';

export const MOCK_PASSWORD = 'asata2026';

export const mockUsers: UserWithProfil[] = [
  {
    id: 'u1',
    nom: 'Youssef Benali',
    email: 'youssef@asata.ma',
    role: 'membre',
    dateCreation: '2024-09-01T09:00:00.000Z',
    dateInscription: '2024-09-01',
    statut: 'actif',
    profil: {
      id: 'p1',
      userId: 'u1',
      age: 22,
      telephone: '0661234567',
      adresse: 'Casablanca, Maroc',
    },
  },
  {
    id: 'u2',
    nom: 'Samira El Idrissi',
    email: 'coach@asata.ma',
    role: 'coach',
    dateCreation: '2023-10-15T10:30:00.000Z',
    specialite: 'Athletisme',
    experience: 8,
    profil: {
      id: 'p2',
      userId: 'u2',
      age: 34,
      telephone: '0667654321',
      adresse: 'Marrakech, Maroc',
    },
  },
  {
    id: 'u3',
    nom: 'Omar Ait Lahcen',
    email: 'admin@asata.ma',
    role: 'administrateur',
    dateCreation: '2023-05-20T08:00:00.000Z',
    niveau: 2,
    profil: {
      id: 'p3',
      userId: 'u3',
      age: 41,
      telephone: '0677001122',
      adresse: 'Asni, Maroc',
    },
  },
];
