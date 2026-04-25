import type { Annonce } from '../types';

export const mockAnnouncements: Annonce[] = [
  {
    id: 'a1',
    titre: 'Ouverture des inscriptions estivales',
    contenu: 'Les inscriptions pour les activites de natation et de preparation physique sont ouvertes.',
    datePublication: '2026-04-21T09:00:00.000Z',
    visible: true,
  },
  {
    id: 'a2',
    titre: 'Reunion des membres ASATA',
    contenu: 'Une reunion d information aura lieu au siege de l association pour presenter le programme.',
    datePublication: '2026-04-18T18:30:00.000Z',
    visible: true,
  },
  {
    id: 'a3',
    titre: 'Collecte du materiel sportif',
    contenu: 'Les membres peuvent deposer les dons de materiel sportif chaque samedi matin.',
    datePublication: '2026-04-10T10:15:00.000Z',
    visible: true,
  },
  {
    id: 'a4',
    titre: 'Planning des entrainements de mai',
    contenu: 'Le planning des entrainements de football, athletisme et montagne est disponible.',
    datePublication: '2026-04-02T08:45:00.000Z',
    visible: true,
  },
];
