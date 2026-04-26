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
    flexGrow: 0,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
    paddingVertical: Spacing.md,
  },
  filtersContent: {
    gap: Spacing.sm,
    paddingHorizontal: Spacing.container,
  },
  chip: {
    height: 48,
    justifyContent: 'center',
    borderRadius: 9999,
    paddingHorizontal: Spacing.lg,
    backgroundColor: Colors.surfaceContainerHigh,
  },
  chipActive: {
    backgroundColor: Colors.primary,
  },
  chipText: {
    color: Colors.textSecondary,
    fontSize: FontSize.md,
    fontWeight: FontWeight.medium,
  },
  chipTextActive: {
    color: Colors.surface,
  },
  listContent: {
    paddingHorizontal: Spacing.container,
    paddingTop: Spacing.lg,
    paddingBottom: 96,
  },
  separator: {
    height: Spacing.gutter,
  },
});
