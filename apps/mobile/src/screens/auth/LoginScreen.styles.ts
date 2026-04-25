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
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.xxl,
  },
  logo: {
    width: 96,
    height: 96,
    marginBottom: Spacing.md,
  },
  brand: {
    color: Colors.surface,
    fontSize: FontSize.display,
    fontWeight: FontWeight.bold,
    letterSpacing: 0,
  },
  subtitle: {
    maxWidth: 260,
    color: 'rgba(255,255,255,0.78)',
    fontSize: FontSize.sm,
    lineHeight: 19,
    textAlign: 'center',
  },
  card: {
    flex: 1,
    marginTop: -28,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.xl,
  },
  form: {
    gap: Spacing.md,
  },
  cardTitle: {
    color: Colors.textPrimary,
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
  },
  cardSubtitle: {
    color: Colors.textMuted,
    fontSize: FontSize.sm,
    lineHeight: 19,
  },
  forgotButton: {
    minHeight: 36,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  link: {
    color: Colors.accent,
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
  },
  signupButton: {
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.sm,
  },
  signupText: {
    color: Colors.textMuted,
    fontSize: FontSize.sm,
  },
  signupLink: {
    color: Colors.accent,
    fontWeight: FontWeight.bold,
  },
});
