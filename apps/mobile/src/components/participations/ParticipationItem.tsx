import { Feather } from '@expo/vector-icons';
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
  const statusStyle = statusToneStyles[participation.statut];
  const isCancelled = participation.statut === 'annule';
  const title = participation.evenement?.titre ?? 'Événement';

  return (
    <View style={[styles.card, isCancelled && styles.cancelledCard]}>
      <View style={styles.main}>
        <View style={[styles.thumbnail, statusStyle]}>
          <Feather name={isCancelled ? 'x-circle' : 'calendar'} size={28} color={isCancelled ? Colors.error : Colors.surface} />
        </View>
        <View style={styles.copy}>
          <Text numberOfLines={1} style={[styles.title, isCancelled && styles.cancelledText]}>
            {title}
          </Text>
          <View style={styles.metaRow}>
            <Feather name="calendar" size={18} color={Colors.textSecondary} />
            <Text style={styles.date}>{participation.evenement ? formatDate(participation.evenement.date) : ''}</Text>
          </View>
          <View style={styles.metaRow}>
            <Feather name={isCancelled ? 'x-circle' : 'map-pin'} size={18} color={isCancelled ? Colors.danger : Colors.textSecondary} />
            <Text numberOfLines={1} style={[styles.date, isCancelled && styles.reason]}>
              {isCancelled ? "Annulé par l'organisateur" : participation.evenement?.lieu ?? 'Lieu à confirmer'}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.actions}>
        <Badge label={participation.statut.replace('_', ' ')} status={participation.statut} />
        {canCancel ? (
          <Button label="Annuler" onPress={onCancel} isLoading={isCancelling} variant="dangerOutline" size="small" />
        ) : null}
        {participation.statut === 'en_attente' ? (
          <View style={styles.pendingTime}>
            <Feather name="clock" size={16} color={Colors.textSecondary} />
            <Text style={styles.pendingText}>72h max.</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  cancelledCard: {
    backgroundColor: Colors.surfaceContainer,
    opacity: 0.72,
  },
  main: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copy: {
    flex: 1,
    gap: Spacing.xs,
    minWidth: 0,
  },
  title: {
    color: Colors.textPrimary,
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    lineHeight: 26,
  },
  cancelledText: {
    color: Colors.textMuted,
  },
  date: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  reason: {
    color: '#DE7D7D',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
    marginTop: Spacing.md,
    paddingTop: Spacing.sm,
  },
  pendingTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  pendingText: {
    color: Colors.textSecondary,
    fontSize: FontSize.md,
    fontWeight: FontWeight.medium,
  },
});

const statusToneStyles = StyleSheet.create({
  confirme: { backgroundColor: Colors.primary },
  annule: { backgroundColor: Colors.errorContainer },
  en_attente: { backgroundColor: Colors.slate },
});
