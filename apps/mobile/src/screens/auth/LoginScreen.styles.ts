import { StyleSheet } from 'react-native';

import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { FontSize, FontWeight } from '../../constants/typography';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  scrollContent: {
    flexGrow: 1,
  },
  hero: {
    minHeight: 353,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xxl,
    paddingBottom: Spacing.xxl,
    backgroundColor: Colors.primary,
    overflow: 'hidden',
  },
  locationPill: {
    position: 'absolute',
    top: Spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    borderRadius: 9999,
    backgroundColor: Colors.whiteOverlay10,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
  },
  locationText: {
    color: Colors.whiteOverlay80,
    fontSize: FontSize.xs,
    fontWeight: FontWeight.medium,
  },
  heroBackdrop: {
    position: 'absolute',
    color: Colors.whiteOverlay10,
    fontSize: 120,
    fontWeight: FontWeight.extraBold,
  },
  brand: {
    color: Colors.surface,
    fontSize: FontSize.hero,
    fontWeight: FontWeight.bold,
    letterSpacing: 0,
    textShadowColor: Colors.blackOverlay20,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 2,
  },
  subtitle: {
    maxWidth: 260,
    color: Colors.onPrimaryContainer,
    fontSize: FontSize.md,
    lineHeight: 22,
    textAlign: 'center',
    marginTop: Spacing.sm,
  },
  card: {
    flex: 1,
    marginTop: -24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.container,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.xl,
  },
  form: {
    gap: Spacing.md,
  },
  cardTitle: {
    color: Colors.primaryDark,
    fontSize: FontSize.h2,
    fontWeight: FontWeight.bold,
  },
  cardSubtitle: {
    color: Colors.secondary,
    fontSize: FontSize.sm,
    lineHeight: 19,
  },
  forgotButton: {
    minHeight: 36,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  link: {
    color: Colors.skyBlue,
    fontSize: FontSize.md,
    fontWeight: FontWeight.medium,
  },
  signupButton: {
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.sm,
  },
  signupText: {
    color: Colors.textMuted,
    fontSize: FontSize.md,
  },
  signupLink: {
    color: Colors.primaryDark,
    fontWeight: FontWeight.bold,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginTop: Spacing.lg,
    opacity: 0.2,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.outline,
  },
  dividerText: {
    color: Colors.outline,
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semiBold,
    letterSpacing: 0.96,
  },
});
