import { StyleSheet } from 'react-native';

import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { FontSize, FontWeight } from '../../constants/typography';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  filters: {
    paddingVertical: Spacing.md,
  },
  filtersContent: {
    gap: Spacing.sm,
    paddingHorizontal: Spacing.md,
  },
  chip: {
    height: 36,
    justifyContent: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.surface,
  },
  chipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  chipText: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
  },
  chipTextActive: {
    color: Colors.surface,
  },
  listContent: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.xl,
  },
  separator: {
    height: Spacing.sm,
  },
});
