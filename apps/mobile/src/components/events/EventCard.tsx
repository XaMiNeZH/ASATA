import { Image, StyleSheet, Text, View } from 'react-native';

import { Badge } from '../common/Badge';
import { Card } from '../common/Card';
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
}

export function EventCard({ event, onPress }: EventCardProps) {
  return (
    <Card onPress={onPress}>
      <View style={styles.content}>
        <Image source={event.coverImage ? { uri: event.coverImage } : placeholderEvent} style={styles.image} />
        <View style={styles.body}>
          <Badge label={event.statut.replace('_', ' ')} status={event.statut} />
          <Text style={styles.title}>{event.titre}</Text>
          <Text style={styles.meta}>{formatDate(event.date)}</Text>
          <Text style={styles.meta}>{event.lieu}</Text>
          <CapacityBar total={event.capacite} filled={event.inscrits} />
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  image: {
    width: 86,
    height: 86,
    borderRadius: 8,
    backgroundColor: Colors.primaryPale,
  },
  body: {
    flex: 1,
    gap: Spacing.xs,
  },
  title: {
    color: Colors.textPrimary,
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
  },
  meta: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
  },
});
