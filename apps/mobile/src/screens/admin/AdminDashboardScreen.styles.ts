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
    gap: Spacing.md,
    padding: Spacing.container,
    paddingBottom: 96,
  },
  state: {
    padding: Spacing.container,
  },
  hero: {
    gap: Spacing.sm,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    padding: Spacing.lg,
  },
  heroTitle: {
    color: Colors.surface,
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
  },
  heroText: {
    color: Colors.primaryFixedDim,
    fontSize: FontSize.md,
    lineHeight: 24,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: Spacing.md,
  },
  statWrapper: {
    width: '48%',
  },
  statCard: {
    gap: Spacing.sm,
  },
  statValue: {
    color: Colors.primary,
    fontSize: 28,
    fontWeight: FontWeight.bold,
  },
  statLabel: {
    color: Colors.textMuted,
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  quickActions: {
    gap: Spacing.sm,
  },
  managementRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  manageButton: {
    flex: 1,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
    borderRadius: 12,
    backgroundColor: Colors.secondaryContainer,
  },
  manageText: {
    color: Colors.primary,
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
  },
  sectionTitle: {
    color: Colors.primary,
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    marginTop: Spacing.sm,
  },
  eventRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  eventIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
  },
  eventBody: {
    flex: 1,
    minWidth: 0,
  },
  eventTitle: {
    color: Colors.primary,
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
  },
  eventMeta: {
    color: Colors.textMuted,
    fontSize: FontSize.sm,
  },
});
