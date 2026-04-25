import { StyleSheet } from 'react-native';

import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { FontSize, FontWeight } from '../../constants/typography';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.md,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingVertical: Spacing.md,
  },
  markReadButton: {
    minHeight: 36,
    justifyContent: 'center',
  },
  markReadText: {
    color: Colors.accent,
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
  },
  markReadTextDisabled: {
    opacity: 0.45,
  },
  listContent: {
    paddingBottom: Spacing.xl,
  },
  sectionTitle: {
    color: Colors.textMuted,
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    letterSpacing: 0,
    marginBottom: Spacing.sm,
    textTransform: 'uppercase',
  },
  separator: {
    height: Spacing.sm,
  },
  sectionGap: {
    height: Spacing.lg,
  },
});
