import { StyleSheet, Text, View } from 'react-native';

import { Colors } from '../../constants/colors';

type BadgeStatus =
  | 'actif' | 'inactif' | 'suspendu'
  | 'planifie' | 'en_cours' | 'termine' | 'annule' | 'complet'
  | 'confirme' | 'en_attente'
  | 'present' | 'absent' | 'non_renseigne'
  | 'membre' | 'coach' | 'administrateur'
  | 'default';

interface BadgeProps {
  label: string;
  status: BadgeStatus;
  size?: 'sm' | 'md';
}

const STATUS_CONFIG: Record<BadgeStatus, { bg: string; fg: string }> = {
  planifie:      { bg: Colors.statusPlanifieBg,   fg: Colors.statusPlanifie },
  en_cours:      { bg: Colors.statusEnCoursBg,    fg: Colors.statusEnCours },
  termine:       { bg: Colors.statusTermineBg,    fg: Colors.statusTermine },
  annule:        { bg: Colors.statusAnnuleBg,     fg: Colors.statusAnnule },
  complet:       { bg: Colors.statusCompletBg,    fg: Colors.statusComplet },
  confirme:      { bg: Colors.statusConfirmeBg,   fg: Colors.statusConfirme },
  en_attente:    { bg: Colors.statusEnAttenteBg,  fg: Colors.statusEnAttente },
  present:       { bg: Colors.statusPresentBg,    fg: Colors.statusPresent },
  absent:        { bg: Colors.statusAbsentBg,     fg: Colors.statusAbsent },
  actif:         { bg: Colors.statusEnCoursBg,    fg: Colors.statusEnCours },
  inactif:       { bg: Colors.statusTermineBg,    fg: Colors.statusTermine },
  suspendu:      { bg: Colors.statusAnnuleBg,     fg: Colors.statusAnnule },
  non_renseigne: { bg: Colors.statusTermineBg,    fg: Colors.statusTermine },
  membre:        { bg: Colors.primaryPale,        fg: Colors.primaryDark },
  coach:         { bg: Colors.primaryPale,        fg: Colors.primary },
  administrateur:{ bg: Colors.primaryPale,        fg: Colors.primary },
  default:       { bg: Colors.primaryPale,        fg: Colors.primaryDark },
};

export function Badge({ label, status, size = 'md' }: BadgeProps) {
  const { bg, fg } = STATUS_CONFIG[status] ?? STATUS_CONFIG.default;
  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: bg },
        size === 'sm' && styles.badgeSm,
      ]}
    >
      <Text
        style={[
          styles.label,
          { color: fg },
          size === 'sm' && styles.labelSm,
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  badgeSm: {
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.1,
    lineHeight: 14,
  },
  labelSm: {
    fontSize: 11,
    lineHeight: 13,
  },
});
