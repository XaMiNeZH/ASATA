import { StyleSheet } from 'react-native';

import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { FontSize, FontWeight } from '../../constants/typography';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.container,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.lg,
  },
  screenTitle: {
    color: Colors.primaryDark,
    fontSize: FontSize.display,
    fontWeight: FontWeight.bold,
  },
  underline: {
    width: 50,
    height: 4,
    borderRadius: 9999,
    backgroundColor: Colors.skyBlue,
    marginTop: Spacing.sm,
  },
  markReadText: {
    color: Colors.skyBlue,
    fontSize: FontSize.md,
    fontWeight: FontWeight.medium,
  },
  markReadTextDisabled: {
    opacity: 0.45,
  },
  listContent: {
    paddingHorizontal: Spacing.container,
    paddingBottom: 96,
  },
  sectionTitle: {
    color: Colors.textSecondary,
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semiBold,
    letterSpacing: 3,
    marginBottom: Spacing.md,
    textTransform: 'uppercase',
  },
  separator: {
    height: Spacing.md,
  },
  sectionGap: {
    height: Spacing.xl,
  },
});
