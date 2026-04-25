import { Feather } from '@expo/vector-icons';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { Badge } from '../common/Badge';
import { CapacityBar } from './CapacityBar';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { FontSize, FontWeight } from '../../constants/typography';
import type { Evenement } from '../../types';
import { formatDate } from '../../utils/date';

const placeholderEvent = require('../../../assets/images/placeholder-event.png');

interface EventCardProps {
  event: Evenement;
  onPress: () => void;
  variant?: 'list' | 'feature';
}

export function EventCard({ event, onPress, variant = 'list' }: EventCardProps) {
  const isFeature = variant === 'feature';
  const isFull = event.inscrits >= event.capacite;
  const isCancelled = event.statut === 'annule';
  const statusLabel = event.statut.replace('_', ' ');

  if (isFeature) {
    return (
      <Pressable
        accessibilityRole="button"
        onPress={onPress}
        style={({ pressed }) => [styles.card, styles.featureCard, pressed && styles.pressed]}
      >
        <View style={styles.featureImageWrap}>
          <Image source={event.coverImage ? { uri: event.coverImage } : placeholderEvent} style={styles.featureImage} />
          <View style={styles.overlayBadge}>
            <Badge label={statusLabel} status={event.statut} />
          </View>
        </View>
        <View style={styles.featureBody}>
          <Text numberOfLines={2} style={[styles.featureTitle, isCancelled && styles.cancelledTitle]}>
            {event.titre}
          </Text>
          <Text style={styles.meta}>{formatDate(event.date)}</Text>
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
      <View style={styles.content}>
        <Image source={event.coverImage ? { uri: event.coverImage } : placeholderEvent} style={styles.image} />
        <View style={styles.body}>
          <Text numberOfLines={2} style={[styles.title, isCancelled && styles.cancelledTitle]}>
            {event.titre}
          </Text>
          <Text style={styles.meta}>{formatDate(event.date)}</Text>
          <View style={styles.locationRow}>
            <Feather name="map-pin" size={13} color={Colors.textMuted} />
            <Text numberOfLines={1} style={styles.location}>
              {event.lieu}
            </Text>
          </View>
          <CapacityBar total={event.capacite} filled={event.inscrits} />
        </View>
      </View>
      <View style={styles.statusRow}>
        <Badge label={statusLabel} status={event.statut} />
        {isFull ? <Text style={styles.fullText}>Complet</Text> : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    borderRadius: 12,
    backgroundColor: Colors.surface,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  listCard: {
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
  featureCard: {
    width: 200,
    height: 220,
  },
  pressed: {
    opacity: 0.86,
  },
  cancelledCard: {
    opacity: 0.7,
  },
  content: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: Colors.primaryPale,
  },
  body: {
    flex: 1,
    gap: Spacing.xs,
  },
  title: {
    color: Colors.textPrimary,
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
  },
  cancelledTitle: {
    color: Colors.textMuted,
    textDecorationLine: 'line-through',
  },
  meta: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  location: {
    flex: 1,
    color: Colors.textMuted,
    fontSize: FontSize.xs,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: Spacing.sm,
    marginTop: Spacing.sm,
  },
  fullText: {
    color: Colors.danger,
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    textTransform: 'uppercase',
  },
  featureImageWrap: {
    height: 122,
    backgroundColor: Colors.border,
  },
  featureImage: {
    width: '100%',
    height: '100%',
    opacity: 0.85,
  },
  overlayBadge: {
    position: 'absolute',
    top: Spacing.sm,
    left: Spacing.sm,
  },
  featureBody: {
    flex: 1,
    gap: 6,
    padding: 12,
  },
  featureTitle: {
    color: Colors.textPrimary,
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    lineHeight: 19,
  },
});
