import { StyleSheet } from 'react-native';

import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { FontSize, FontWeight } from '../../constants/typography';

export const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    borderRadius: 16,
    backgroundColor: Colors.surface,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.09,
    shadowRadius: 12,
    elevation: 4,
  },
  featureCard: {
    width: 292,
  },
  listCard: {
    flexDirection: 'row',
    gap: Spacing.md,
    padding: 14,
  },
  pressed: {
    opacity: 0.86,
    transform: [{ scale: 0.98 }],
  },
  cancelledCard: {
    opacity: 0.78,
  },
  featureImage: {
    height: 156,
    justifyContent: 'center',
    backgroundColor: Colors.primary,
  },
  imageWordmark: {
    color: Colors.whiteOverlay20,
    fontSize: 52,
    fontWeight: FontWeight.extraBold,
    textAlign: 'center',
    letterSpacing: 8,
  },
  dateBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    borderRadius: 10,
    backgroundColor: Colors.whiteOverlay80,
    paddingHorizontal: 10,
    paddingVertical: 5,
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
    width: 88,
    height: 88,
    borderRadius: 12,
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
