import { StyleSheet } from 'react-native';

import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { FontSize, FontWeight } from '../../constants/typography';

export const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    borderRadius: 12,
    backgroundColor: Colors.surface,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  featureCard: {
    width: 280,
  },
  listCard: {
    flexDirection: 'row',
    gap: Spacing.md,
    padding: 12,
  },
  pressed: {
    opacity: 0.86,
    transform: [{ scale: 0.98 }],
  },
  cancelledCard: {
    opacity: 0.78,
  },
  featureImage: {
    height: 128,
    justifyContent: 'center',
    backgroundColor: Colors.primary,
  },
  imageWordmark: {
    color: Colors.whiteOverlay20,
    fontSize: FontSize.display,
    fontWeight: FontWeight.extraBold,
    textAlign: 'center',
  },
  dateBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    borderRadius: 8,
    backgroundColor: Colors.whiteOverlay80,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
  },
  dateBadgeText: {
    color: Colors.primary,
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semiBold,
  },
  featureBody: {
    gap: Spacing.xs,
    padding: Spacing.md,
  },
  featureTitle: {
    color: Colors.textPrimary,
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    lineHeight: 24,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  metaText: {
    flex: 1,
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
  },
  capacityLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.sm,
    marginTop: Spacing.xs,
  },
  capacityLabel: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
  },
  capacityValue: {
    color: Colors.skyBlue,
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listBody: {
    flex: 1,
    gap: Spacing.xs,
    minWidth: 0,
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: Colors.textPrimary,
    fontSize: FontSize.xl,
    fontWeight: FontWeight.semiBold,
    lineHeight: 26,
  },
  cancelledTitle: {
    color: Colors.error,
    textDecorationLine: 'line-through',
    opacity: 0.7,
  },
  participantsText: {
    color: Colors.textSecondary,
    fontSize: FontSize.xs,
    fontWeight: FontWeight.medium,
  },
  fullText: {
    color: Colors.error,
  },
});

export const imageToneStyles = StyleSheet.create({
  planifie: {
    backgroundColor: Colors.skyBlue,
  },
  en_cours: {
    backgroundColor: Colors.primary,
  },
  termine: {
    backgroundColor: Colors.surfaceContainerHigh,
  },
  annule: {
    backgroundColor: Colors.errorContainer,
  },
});
