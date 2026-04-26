import { StyleSheet } from 'react-native';

import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { FontSize, FontWeight } from '../../constants/typography';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  networkCard: {
    minHeight: 180,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: Colors.primary,
    padding: Spacing.lg,
    paddingVertical: Spacing.xl,
    shadowColor: Colors.primaryDark,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 6,
  },
  eyebrow: {
    color: Colors.onPrimaryContainer,
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semiBold,
    letterSpacing: 0.96,
    textTransform: 'uppercase',
  },
  networkTitle: {
    color: Colors.surface,
    fontSize: FontSize.h2,
    fontWeight: FontWeight.bold,
    marginTop: Spacing.xs,
  },
  networkStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginTop: Spacing.md,
  },
  statLabel: {
    color: Colors.whiteOverlay60,
    fontSize: FontSize.sm,
  },
  statValue: {
    color: Colors.surface,
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: Colors.whiteOverlay20,
  },
  content: {
    gap: Spacing.lg,
    paddingHorizontal: Spacing.container,
    paddingVertical: Spacing.lg,
    paddingBottom: 96,
  },
  section: {
    gap: Spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.md,
  },
  sectionTitle: {
    color: Colors.textPrimary,
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    letterSpacing: -0.3,
  },
  linkButton: {
    minHeight: 36,
    justifyContent: 'center',
  },
  link: {
    color: Colors.onPrimaryContainer,
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    letterSpacing: 0.96,
    textTransform: 'uppercase',
  },
  eventList: {
    paddingVertical: Spacing.xs,
  },
  eventItem: {
    marginRight: Spacing.md,
  },
  notificationTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  count: {
    minWidth: 24,
    height: 24,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: Colors.accent,
    color: Colors.surface,
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    textAlign: 'center',
    lineHeight: 24,
  },
  list: {
    gap: Spacing.md,
  },
  activityGrid: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  activityCard: {
    flex: 1,
    minHeight: 128,
    justifyContent: 'flex-end',
    borderRadius: 16,
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    borderTopWidth: 3,
    borderTopColor: Colors.skyBlue,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 3,
  },
  activityValue: {
    color: Colors.textPrimary,
    fontSize: FontSize.md,
    fontWeight: FontWeight.semiBold,
    marginTop: Spacing.md,
  },
  activityLabel: {
    color: Colors.textSecondary,
    fontSize: FontSize.xs,
  },
});
