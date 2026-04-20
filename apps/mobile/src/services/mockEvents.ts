export interface Event {
  id: number
  title: string
  description: string
  date: string          // ISO
  endDate?: string
  location: string
  club: 'ski' | 'football' | 'athletisme' | 'all'
  type: 'competition' | 'entrainement' | 'evenement' | 'reunion'
  spots?: number
  spotsLeft?: number
}

export const MOCK_EVENTS: Event[] = [
  {
    id: 1,
    title: 'Compétition de ski — Oukaïmeden',
    description: '3ème édition de notre compétition annuelle de ski. Ouvert à tous les membres du club ski âgés de 10 à 18 ans. Matériel fourni pour les moins de 14 ans. Inscriptions obligatoires avant le 20 avril.',
    date: '2026-04-25T09:00:00Z',
    endDate: '2026-04-25T17:00:00Z',
    location: 'Station de ski Oukaïmeden',
    club: 'ski',
    type: 'competition',
    spots: 30,
    spotsLeft: 8,
  },
  {
    id: 2,
    title: 'Entraînement football — Terrain Asni',
    description: 'Séance d\'entraînement hebdomadaire pour toute l\'équipe. Présence obligatoire. Apportez votre tenue et vos chaussures de foot.',
    date: '2026-04-22T17:00:00Z',
    endDate: '2026-04-22T19:00:00Z',
    location: 'Terrain de football d\'Asni',
    club: 'football',
    type: 'entrainement',
    spots: 25,
    spotsLeft: 12,
  },
  {
    id: 3,
    title: 'Assemblée générale annuelle',
    description: 'Assemblée générale de l\'ASATA. Tous les membres sont invités. Ordre du jour : bilan 2025, budget 2026, élection du bureau, projets à venir.',
    date: '2026-04-25T10:00:00Z',
    endDate: '2026-04-25T12:00:00Z',
    location: 'Siège ASATA, Asni',
    club: 'all',
    type: 'reunion',
    spots: 100,
    spotsLeft: 45,
  },
  {
    id: 4,
    title: 'Stage athlétisme — Week-end intensif',
    description: 'Stage de deux jours pour les athlètes confirmés. Programme : sprint, endurance, saut en longueur. Encadrement par des coaches certifiés.',
    date: '2026-05-02T08:00:00Z',
    endDate: '2026-05-03T18:00:00Z',
    location: 'Stade municipal d\'Asni',
    club: 'athletisme',
    type: 'entrainement',
    spots: 20,
    spotsLeft: 5,
  },
  {
    id: 5,
    title: 'Tournoi de football inter-clubs',
    description: 'Grand tournoi regroupant 8 clubs de la région. L\'ASATA accueille l\'événement à Asni. Venez soutenir notre équipe !',
    date: '2026-05-10T09:00:00Z',
    endDate: '2026-05-10T20:00:00Z',
    location: 'Terrain de football d\'Asni',
    club: 'football',
    type: 'competition',
    spots: 200,
    spotsLeft: 120,
  },
  {
    id: 6,
    title: 'Sortie ski familiale',
    description: 'Journée ski ouverte aux membres et à leurs familles. Ambiance conviviale, initiation pour les débutants, parcours intermédiaire pour les autres.',
    date: '2026-05-15T08:30:00Z',
    endDate: '2026-05-15T17:00:00Z',
    location: 'Station de ski Oukaïmeden',
    club: 'ski',
    type: 'evenement',
    spots: 50,
    spotsLeft: 22,
  },
]
