import { StyleSheet, Text, View } from 'react-native';

import { Colors } from '../../constants/colors';
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
      <Text style={[styles.label, labelStyles[status] ?? labelStyles.default]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  label: {
    fontSize: FontSize.tab,
    fontWeight: FontWeight.bold,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
});

const statusStyles = StyleSheet.create({
  actif: { backgroundColor: 'rgba(46,125,82,0.12)' },
  inactif: { backgroundColor: Colors.surfaceContainerHigh },
  suspendu: { backgroundColor: Colors.errorContainer },
  planifie: { backgroundColor: 'rgba(66,165,245,0.10)' },
  en_cours: { backgroundColor: 'rgba(66,165,245,0.10)' },
  termine: { backgroundColor: Colors.surfaceContainerHigh },
  annule: { backgroundColor: Colors.errorContainer },
  confirme: { backgroundColor: 'rgba(46,125,82,0.10)' },
  en_attente: { backgroundColor: 'rgba(66,165,245,0.10)' },
  present: { backgroundColor: 'rgba(46,125,82,0.10)' },
  absent: { backgroundColor: Colors.errorContainer },
  non_renseigne: { backgroundColor: Colors.surfaceContainerHigh },
  membre: { backgroundColor: Colors.whiteOverlay20 },
  coach: { backgroundColor: Colors.primaryFixed },
  administrateur: { backgroundColor: Colors.primaryFixed },
  default: { backgroundColor: Colors.lightBlueGray },
});

const labelStyles = StyleSheet.create({
  actif: { color: Colors.success },
  inactif: { color: Colors.textMuted },
  suspendu: { color: Colors.error },
  planifie: { color: Colors.skyBlue },
  en_cours: { color: Colors.skyBlue },
  termine: { color: Colors.textMuted },
  annule: { color: Colors.error },
  confirme: { color: Colors.success },
  en_attente: { color: Colors.skyBlue },
  present: { color: Colors.success },
  absent: { color: Colors.error },
  non_renseigne: { color: Colors.textMuted },
  membre: { color: Colors.surface },
  coach: { color: Colors.primary },
  administrateur: { color: Colors.primary },
  default: { color: Colors.skyBlue },
});
