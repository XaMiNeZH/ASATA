import { StyleSheet, Text, View } from 'react-native';

import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { FontSize, FontWeight } from '../../constants/typography';

type BadgeStatus =
  | 'actif'
  | 'inactif'
  | 'suspendu'
  | 'planifie'
  | 'en_cours'
  | 'termine'
  | 'annule'
  | 'confirme'
  | 'en_attente'
  | 'present'
  | 'absent'
  | 'non_renseigne'
  | 'membre'
  | 'coach'
  | 'administrateur'
  | 'default';

interface BadgeProps {
  label: string;
  status: BadgeStatus;
}

export function Badge({ label, status }: BadgeProps) {
  return (
    <View style={[styles.badge, statusStyles[status] ?? statusStyles.default]}>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
  },
  label: {
    color: Colors.surface,
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
  },
});

const statusStyles = StyleSheet.create({
  actif: { backgroundColor: Colors.success },
  inactif: { backgroundColor: Colors.textMuted },
  suspendu: { backgroundColor: Colors.danger },
  planifie: { backgroundColor: Colors.primary },
  en_cours: { backgroundColor: Colors.warning },
  termine: { backgroundColor: Colors.textSecondary },
  annule: { backgroundColor: Colors.danger },
  confirme: { backgroundColor: Colors.success },
  en_attente: { backgroundColor: Colors.warning },
  present: { backgroundColor: Colors.success },
  absent: { backgroundColor: Colors.danger },
  non_renseigne: { backgroundColor: Colors.textMuted },
  membre: { backgroundColor: Colors.primary },
  coach: { backgroundColor: Colors.primaryMid },
  administrateur: { backgroundColor: Colors.primaryDark },
  default: { backgroundColor: Colors.textSecondary },
});
