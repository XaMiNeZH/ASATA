import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Badge } from '../common/Badge';
import { CapacityBar } from './CapacityBar';
import { Colors } from '../../constants/colors';
import type { Evenement } from '../../types';
import { formatDate } from '../../utils/date';

interface EventCardProps {
  event: Evenement;
  onPress: () => void;
  variant?: 'list' | 'feature';
}

const SPORT_ICONS: Record<string, { icon: string }> = {
  ski:        { icon: 'wind' },
  football:   { icon: 'circle' },
  athletisme: { icon: 'zap' },
  natation:   { icon: 'droplet' },
  yoga:       { icon: 'sun' },
};

const STATUS_LABELS: Record<Evenement['statut'], string> = {
  planifie: 'Planifié',
  en_cours: 'En cours',
  termine:  'Terminé',
  annule:   'Annulé',
};

export function EventCard({ event, onPress, variant = 'list' }: EventCardProps) {
  const isFeature = variant === 'feature';
  const isFull = event.inscrits >= event.capacite;
  const effectiveStatus = event.statut === 'planifie' && isFull ? 'complet' : event.statut;
  const statusLabel = effectiveStatus === 'complet' ? 'Complet' : STATUS_LABELS[event.statut];
  const sportIcon = (SPORT_ICONS[event.sport ?? ''] ?? SPORT_ICONS.football).icon as any;

  if (isFeature) {
    // Hero card — horizontal scroll on Home screen
    return (
      <Pressable
        accessibilityRole="button"
        onPress={onPress}
        style={({ pressed }) => [styles.featureCard, pressed && styles.pressed]}
      >
        {/* Striped placeholder (no external image) */}
        <View style={styles.featurePlaceholder}>
          <View style={styles.featureSportIcon}>
            <Feather name={sportIcon} size={28} color={Colors.primary} />
          </View>
        </View>
        <View style={styles.featureBody}>
          <View style={styles.featureTopRow}>
            <Text style={styles.sportChip}>{event.sport ?? 'Sport'}</Text>
            <Badge label={statusLabel} status={effectiveStatus as any} size="sm" />
          </View>
          <Text numberOfLines={2} style={styles.featureTitle}>{event.titre}</Text>
          <View style={styles.metaRow}>
            <Feather name="calendar" size={12} color={Colors.subtle} />
            <Text numberOfLines={1} style={styles.metaText}>{formatDate(event.date)}</Text>
            <Feather name="map-pin" size={12} color={Colors.subtle} />
            <Text numberOfLines={1} style={styles.metaText}>{event.lieu}</Text>
          </View>
          <CapacityBar total={event.capacite} filled={event.inscrits} showText />
        </View>
      </Pressable>
    );
  }

  // Compact list card
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.listCard, pressed && styles.pressed]}
    >
      {/* Sport icon block */}
      <View style={styles.listIconBlock}>
        <Feather name={sportIcon} size={24} color={Colors.primary} />
      </View>
      <View style={styles.listBody}>
        <View style={styles.listTopRow}>
          <Text numberOfLines={1} style={styles.listTitle}>{event.titre}</Text>
          <Badge label={statusLabel} status={effectiveStatus as any} size="sm" />
        </View>
        <View style={styles.metaRow}>
          <Feather name="calendar" size={12} color={Colors.subtle} />
          <Text style={styles.metaText}>{formatDate(event.date)}</Text>
          <Feather name="map-pin" size={12} color={Colors.subtle} />
          <Text numberOfLines={1} style={styles.metaText}>{event.lieu}</Text>
        </View>
        <CapacityBar total={event.capacite} filled={event.inscrits} showText={false} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.86,
    transform: [{ scale: 0.98 }],
  },

  // ── Feature (horizontal scroll) card ─────────────────────
  featureCard: {
    width: 250,
    backgroundColor: Colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.hairline,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 3,
    overflow: 'hidden',
  },
  featurePlaceholder: {
    height: 110,
    backgroundColor: Colors.primaryGhost,
    borderBottomWidth: 1,
    borderBottomColor: Colors.hairline,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureSportIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: Colors.primaryPale,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureBody: {
    padding: 14,
    gap: 8,
  },
  featureTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  sportChip: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.primaryDark,
    backgroundColor: Colors.primaryPale,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
    textTransform: 'capitalize',
  },
  featureTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.body,
    letterSpacing: -0.2,
    lineHeight: 20,
  },

  // ── Compact list card ─────────────────────────────────────
  listCard: {
    backgroundColor: Colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.hairline,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 14,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'stretch',
    padding: 14,
    gap: 12,
  },
  listIconBlock: {
    width: 56,
    borderRadius: 12,
    backgroundColor: Colors.primaryGhost,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listBody: {
    flex: 1,
    minWidth: 0,
    gap: 8,
  },
  listTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 8,
  },
  listTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    color: Colors.body,
    letterSpacing: -0.2,
    lineHeight: 20,
  },

  // ── Shared meta row ────────────────────────────────────────
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flexWrap: 'wrap',
  },
  metaText: {
    fontSize: 12,
    color: Colors.subtle,
    flexShrink: 1,
  },
});
