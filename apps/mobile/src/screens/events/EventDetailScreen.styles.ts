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
    paddingBottom: 132,
  },
  coverWrap: {
    height: 220,
    justifyContent: 'flex-end',
    overflow: 'hidden',
    backgroundColor: Colors.primary,
  },
  coverWatermark: {
    position: 'absolute',
    right: -16,
    top: 32,
    color: Colors.whiteOverlay10,
    fontSize: 120,
    fontWeight: FontWeight.extraBold,
  },
  backButton: {
    position: 'absolute',
    top: Spacing.xl,
    left: Spacing.container,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.whiteOverlay20,
  },
  coverContent: {
    gap: Spacing.sm,
    paddingHorizontal: Spacing.container,
    paddingBottom: Spacing.xl,
  },
  coverBadge: {
    alignSelf: 'flex-start',
    borderRadius: 9999,
    backgroundColor: Colors.secondaryContainer,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
  },
  coverBadgeText: {
    color: Colors.onSecondaryContainer,
    fontSize: FontSize.tab,
    fontWeight: FontWeight.semiBold,
    letterSpacing: 0.96,
  },
  coverTitle: {
    color: Colors.surface,
    fontSize: FontSize.display,
    fontWeight: FontWeight.bold,
    lineHeight: 38,
  },
  mapCard: {
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: Spacing.container,
    marginTop: Spacing.lg,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: Colors.surfaceDim,
  },
  mapButton: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    borderRadius: 9999,
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  mapButtonText: {
    color: Colors.textPrimary,
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
  },
  actionBar: {
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.container,
    paddingTop: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 8,
  },
  cancelledBanner: {
    borderRadius: 12,
    backgroundColor: '#FFF0ED',
    padding: Spacing.md,
  },
  cancelledText: {
    color: Colors.error,
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    textAlign: 'center',
  },
});
