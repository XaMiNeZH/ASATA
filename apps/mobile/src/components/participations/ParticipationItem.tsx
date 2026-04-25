import { StyleSheet, Text, View } from 'react-native';

import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
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
  return (
    <Card>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{participation.evenement?.titre ?? 'Evenement'}</Text>
          <Badge label={participation.statut.replace('_', ' ')} status={participation.statut} />
        </View>
        <Text style={styles.date}>{participation.evenement ? formatDate(participation.evenement.date) : ''}</Text>
        <Badge label={participation.presence.replace('_', ' ')} status={participation.presence} />
        {canCancel ? <Button label="Annuler" onPress={onCancel} isLoading={isCancelling} variant="danger" /> : null}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.sm,
  },
  header: {
    gap: Spacing.sm,
  },
  title: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
  },
  date: {
    fontSize: FontSize.sm,
  },
});
