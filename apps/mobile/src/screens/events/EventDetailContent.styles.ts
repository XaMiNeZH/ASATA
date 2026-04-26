import { StyleSheet } from 'react-native';

import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { FontSize, FontWeight } from '../../constants/typography';

export const contentStyles = StyleSheet.create({
  card: {
    marginTop: -20,
    marginHorizontal: Spacing.container,
    borderRadius: 12,
    backgroundColor: Colors.surface,
    padding: Spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.md,
  },
  statusLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.success,
  },
  statusDotDanger: {
    backgroundColor: Colors.error,
  },
  statusText: {
    color: Colors.success,
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semiBold,
    letterSpacing: 0.96,
  },
  statusTextDanger: {
    color: Colors.error,
  },
  participantPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  participantText: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
  },
  detailGrid: {
    flexDirection: 'row',
    gap: Spacing.md,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.border,
    marginVertical: Spacing.lg,
    paddingVertical: Spacing.lg,
  },
  detailItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
  },
  detailIcon: {
    width: 44,
    height: 44,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surfaceContainer,
  },
  detailCopy: {
    flex: 1,
  },
  detailLabel: {
    color: Colors.textSecondary,
    fontSize: FontSize.tab,
    fontWeight: FontWeight.semiBold,
  },
  detailValue: {
    color: Colors.textPrimary,
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semiBold,
    marginTop: Spacing.xs,
  },
  detailMeta: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
  },
  capacityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.md,
  },
  capacity: {
    gap: Spacing.sm,
  },
  label: {
    color: Colors.textSecondary,
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semiBold,
  },
  capacityText: {
    color: Colors.textPrimary,
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semiBold,
  },
  descriptionBlock: {
    gap: Spacing.md,
    marginTop: Spacing.lg,
  },
  sectionTitle: {
    color: Colors.primary,
    fontSize: FontSize.xl,
    fontWeight: FontWeight.semiBold,
  },
  description: {
    color: Colors.textSecondary,
    fontSize: FontSize.md,
    lineHeight: 26,
  },
  speakersBlock: {
    gap: Spacing.md,
    marginTop: Spacing.lg,
  },
  speakerGrid: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  speakerCard: {
    flex: 1.4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    borderRadius: 12,
    backgroundColor: Colors.surfaceContainerLow,
    padding: Spacing.md,
  },
  speakerCardSmall: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: Colors.surfaceContainerLow,
    padding: Spacing.md,
  },
  speakerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
  },
  speakerInitials: {
    color: Colors.surface,
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
  },
  speakerName: {
    color: Colors.textPrimary,
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
  },
  speakerRole: {
    color: Colors.textSecondary,
    fontSize: FontSize.tiny,
  },
  success: {
    color: Colors.success,
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    marginTop: Spacing.md,
  },
});
