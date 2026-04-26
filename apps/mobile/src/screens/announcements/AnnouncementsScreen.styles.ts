import { StyleSheet } from 'react-native';

import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { FontSize, FontWeight } from '../../constants/typography';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listContent: {
    paddingHorizontal: Spacing.container,
    paddingTop: Spacing.xl,
    paddingBottom: 96,
  },
  heroCopy: {
    gap: Spacing.xs,
    marginBottom: Spacing.lg,
  },
  screenTitle: {
    color: Colors.primaryDark,
    fontSize: FontSize.display,
    fontWeight: FontWeight.bold,
  },
  screenSubtitle: {
    color: Colors.textSecondary,
    fontSize: FontSize.md,
    lineHeight: 26,
  },
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
  cardPressed: {
    opacity: 0.84,
  },
  cardContent: {
    gap: Spacing.sm,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.md,
  },
  category: {
    overflow: 'hidden',
    borderRadius: 4,
    backgroundColor: Colors.primaryFixed,
    color: Colors.primary,
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semiBold,
    letterSpacing: 1.8,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    textTransform: 'uppercase',
  },
  categoryUrgent: {
    backgroundColor: Colors.errorContainer,
    color: Colors.error,
  },
  title: {
    color: Colors.primaryDark,
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    lineHeight: 26,
  },
  preview: {
    color: Colors.textSecondary,
    fontSize: FontSize.md,
    lineHeight: 25,
  },
  date: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
  },
  readLink: {
    color: Colors.skyBlue,
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semiBold,
    marginTop: Spacing.sm,
  },
  separator: {
    height: Spacing.md,
  },
});
