import type { ComponentProps } from 'react';
import { Feather } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

import { Badge } from '../common/Badge';
import { CapacityBar } from './CapacityBar';
import { Colors } from '../../constants/colors';
import type { Evenement } from '../../types';
import { formatDate } from '../../utils/date';
import { imageToneStyles, styles } from './EventCard.styles';

type FeatherName = ComponentProps<typeof Feather>['name'];

interface EventCardProps {
  event: Evenement;
  onPress: () => void;
  variant?: 'list' | 'feature';
}

const iconByStatus: Record<Evenement['statut'], FeatherName> = {
  planifie: 'calendar',
  en_cours: 'activity',
  termine: 'check-circle',
  annule: 'x-square',
};

const labelByStatus: Record<Evenement['statut'], string> = {
  planifie: 'À venir',
  en_cours: 'Inscrit',
  termine: 'Terminé',
  annule: 'Annulé',
};

const getDateBadge = (date: string): string =>
  new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: 'short' })
    .format(new Date(date))
    .replace('.', '')
    .toUpperCase();

export function EventCard({ event, onPress, variant = 'list' }: EventCardProps) {
  const isFeature = variant === 'feature';
  const ratio = event.capacite > 0 ? event.inscrits / event.capacite : 0;
  const isFull = event.inscrits >= event.capacite;
  const isCancelled = event.statut === 'annule';
  const percentage = `${Math.round(Math.min(1, ratio) * 100)}%`;
  const statusLabel = labelByStatus[event.statut];

  if (isFeature) {
    return (
      <Pressable
        accessibilityRole="button"
        onPress={onPress}
        style={({ pressed }) => [styles.card, styles.featureCard, pressed && styles.pressed]}
      >
        <View style={[styles.featureImage, imageToneStyles[event.statut]]}>
          <Text style={styles.imageWordmark}>ASATA</Text>
          <View style={styles.dateBadge}>
            <Text style={styles.dateBadgeText}>{getDateBadge(event.date)}</Text>
          </View>
        </View>
        <View style={styles.featureBody}>
          <Text numberOfLines={2} style={styles.featureTitle}>
            {event.titre}
          </Text>
          <View style={styles.metaRow}>
            <Feather name="map-pin" size={14} color={Colors.textSecondary} />
            <Text numberOfLines={1} style={styles.metaText}>
              {event.lieu}
            </Text>
          </View>
          <View style={styles.capacityLabelRow}>
            <Text style={styles.capacityLabel}>Capacité</Text>
            <Text style={styles.capacityValue}>{percentage}</Text>
          </View>
          <CapacityBar total={event.capacite} filled={event.inscrits} showText={false} />
        </View>
      </Pressable>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.card, styles.listCard, isCancelled && styles.cancelledCard, pressed && styles.pressed]}
    >
      <View style={[styles.thumbnail, imageToneStyles[event.statut]]}>
        <Feather name={iconByStatus[event.statut]} size={28} color={isCancelled ? Colors.error : Colors.surface} />
      </View>
      <View style={styles.listBody}>
        <View style={styles.listHeader}>
          <Badge label={statusLabel} status={event.statut} />
          <Feather name="chevron-right" size={22} color={Colors.border} />
        </View>
        <Text numberOfLines={1} style={[styles.title, isCancelled && styles.cancelledTitle]}>
          {event.titre}
        </Text>
        <View style={styles.metaRow}>
          <Feather name={event.statut === 'annule' ? 'alert-triangle' : 'calendar'} size={15} color={Colors.textSecondary} />
          <Text numberOfLines={1} style={styles.metaText}>
            {isCancelled ? 'Cause météorologique' : formatDate(event.date)}
          </Text>
        </View>
        <View style={styles.capacityLabelRow}>
          <Text style={styles.participantsText}>
            {isFull ? `${event.inscrits} / ${event.capacite}` : `${event.inscrits} / ${event.capacite} participants`}
          </Text>
          <Text style={[styles.capacityValue, isFull && styles.fullText]}>
            {isFull ? 'Complet' : percentage}
          </Text>
        </View>
        <CapacityBar total={event.capacite} filled={event.inscrits} showText={false} />
      </View>
    </Pressable>
  );
}
