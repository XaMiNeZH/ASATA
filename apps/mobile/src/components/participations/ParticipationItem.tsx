import { StyleSheet, Text, View } from 'react-native';

import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { FontSize, FontWeight } from '../../constants/typography';
import type { Participation } from '../../types';
import { formatDate } from '../../utils/date';

interface ParticipationItemProps {
  participation: Participation;
  canCancel: boolean;
  onCancel: () => void;
  isCancelling?: boolean;
}

export function ParticipationItem({ participation, canCancel, onCancel, isCancelling = false }: ParticipationItemProps) {
  const statusStyle = statusBorderStyles[participation.statut];

  return (
    <View style={[styles.card, statusStyle]}>
      <View style={styles.main}>
        <View style={styles.copy}>
          <Text numberOfLines={2} style={styles.title}>
            {participation.evenement?.titre ?? 'Evenement'}
          </Text>
          <Text style={styles.date}>{participation.evenement ? formatDate(participation.evenement.date) : ''}</Text>
        </View>
        <View style={styles.side}>
          <Badge label={participation.statut.replace('_', ' ')} status={participation.statut} />
          {canCancel ? (
            <Button
              label="Annuler"
              onPress={onCancel}
              isLoading={isCancelling}
              variant="dangerOutline"
              size="small"
            />
          ) : null}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderLeftWidth: 4,
    borderRadius: 12,
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  main: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  copy: {
    flex: 1,
    gap: Spacing.xs,
  },
  side: {
    alignItems: 'flex-end',
    gap: Spacing.sm,
  },
  title: {
    color: Colors.textPrimary,
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    lineHeight: 20,
  },
  date: {
    color: Colors.textMuted,
    fontSize: FontSize.sm,
  },
});

const statusBorderStyles = StyleSheet.create({
  confirme: { borderLeftColor: Colors.success },
  annule: { borderLeftColor: Colors.danger },
  en_attente: { borderLeftColor: Colors.accent },
});
