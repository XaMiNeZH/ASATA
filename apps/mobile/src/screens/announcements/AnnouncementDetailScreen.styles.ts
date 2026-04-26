import { StyleSheet } from 'react-native';

import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { FontSize, FontWeight } from '../../constants/typography';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: Spacing.container,
    paddingBottom: 96,
  },
  heroImage: {
    height: 192,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: Colors.primary,
    marginBottom: Spacing.gutter,
  },
  heroBadge: {
    position: 'absolute',
    left: Spacing.md,
    bottom: Spacing.md,
    borderRadius: 9999,
    backgroundColor: Colors.skyBlue,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
  },
  heroBadgeText: {
    color: Colors.surface,
    fontSize: FontSize.tab,
    fontWeight: FontWeight.semiBold,
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
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  date: {
    color: Colors.secondary,
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semiBold,
    letterSpacing: 0.96,
    textTransform: 'uppercase',
  },
  title: {
    color: Colors.primary,
    fontSize: FontSize.h2,
    fontWeight: FontWeight.bold,
    lineHeight: 30,
    marginBottom: Spacing.md,
  },
  body: {
    color: Colors.textPrimary,
    fontSize: FontSize.md,
    lineHeight: 26,
  },
  quoteBox: {
    borderRadius: 8,
    backgroundColor: Colors.surfaceContainer,
    padding: Spacing.md,
    marginVertical: Spacing.lg,
  },
  quote: {
    color: Colors.tertiary,
    fontSize: FontSize.sm,
    fontStyle: 'italic',
    lineHeight: 22,
  },
  bulletList: {
    gap: Spacing.md,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
  },
  bulletText: {
    flex: 1,
    color: Colors.primaryDark,
    fontSize: FontSize.sm,
    lineHeight: 22,
  },
  actions: {
    gap: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
    marginTop: Spacing.xl,
    paddingTop: Spacing.xl,
  },
  relatedTitle: {
    color: Colors.secondary,
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semiBold,
    letterSpacing: 2.4,
    marginTop: Spacing.xl,
    marginBottom: Spacing.md,
  },
  relatedCard: {
    minHeight: 88,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    borderRadius: 12,
    backgroundColor: Colors.surface,
    padding: Spacing.md,
  },
  relatedThumb: {
    width: 56,
    height: 56,
    borderRadius: 8,
    backgroundColor: Colors.surfaceContainerHigh,
  },
  relatedCopy: {
    flex: 1,
  },
  relatedMeta: {
    color: Colors.skyBlue,
    fontSize: FontSize.tab,
  },
  relatedText: {
    color: Colors.primary,
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semiBold,
  },
});
