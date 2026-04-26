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
    height: 40,
    justifyContent: 'center',
    borderRadius: 9999,
    paddingHorizontal: Spacing.lg,
    backgroundColor: Colors.surfaceContainerHigh,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  chipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  chipText: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semiBold,
    letterSpacing: 0.2,
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
