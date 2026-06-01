import type { ImageSourcePropType } from 'react-native';

import { AsataImages } from '../constants/asataImages';
import type { Evenement } from '../types';

type EventFallbackInput = Pick<Evenement, 'titre' | 'description' | 'lieu'> & Partial<Pick<Evenement, 'id'>>;

const normalize = (value: string): string =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

const getImageIndex = (key: string, count: number): number => {
  if (count <= 1) {
    return 0;
  }

  const hash = [...key].reduce((total, character) => total + character.charCodeAt(0), 0);
  return hash % count;
};

const selectImage = (
  images: readonly ImageSourcePropType[],
  event: EventFallbackInput,
): ImageSourcePropType => images[getImageIndex(`${event.id ?? ''}${event.titre}`, images.length)] ?? AsataImages.association;

export const getEventFallbackImage = (event: EventFallbackInput): ImageSourcePropType => {
  const text = normalize(`${event.titre} ${event.description} ${event.lieu}`);

  if (
    text.includes('athlet') ||
    text.includes('course') ||
    text.includes('running') ||
    text.includes('marathon') ||
    text.includes('endurance')
  ) {
    return selectImage(AsataImages.athletics, event);
  }

  if (text.includes('football') || text.includes('foot') || text.includes('tournoi') || text.includes('match')) {
    return selectImage(AsataImages.football, event);
  }

  if (
    text.includes('ski') ||
    text.includes('montagne') ||
    text.includes('neige') ||
    text.includes('toubkal') ||
    text.includes('randonnee') ||
    text.includes('excursion') ||
    text.includes('imlil')
  ) {
    return selectImage(AsataImages.ski, event);
  }

  return AsataImages.association;
};

export const getEventImageSource = (event: Evenement): ImageSourcePropType => {
  const coverImage = event.coverImage?.trim();

  if (coverImage && /^https?:\/\//i.test(coverImage)) {
    return { uri: coverImage };
  }

  return getEventFallbackImage(event);
};
