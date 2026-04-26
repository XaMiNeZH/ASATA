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
    minHeight: 260,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xl,
    backgroundColor: Colors.primary,
    overflow: 'hidden',
  },
  locationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    borderRadius: 9999,
    backgroundColor: Colors.whiteOverlay10,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    marginBottom: Spacing.lg,
  },
  locationText: {
    color: Colors.whiteOverlay80,
    fontSize: FontSize.xs,
    fontWeight: FontWeight.medium,
  },
  brand: {
    color: Colors.surface,
    fontSize: FontSize.display,
    fontWeight: FontWeight.bold,
  },
  subtitle: {
    color: Colors.onPrimaryContainer,
    fontSize: FontSize.sm,
    textAlign: 'center',
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
  loginButton: {
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    color: Colors.textMuted,
    fontSize: FontSize.md,
  },
  loginLink: {
    color: Colors.primaryDark,
    fontWeight: FontWeight.bold,
  },
});
