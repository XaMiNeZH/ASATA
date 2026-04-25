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
    minHeight: 210,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  logo: {
    width: 76,
    height: 76,
    marginBottom: Spacing.sm,
  },
  brand: {
    color: Colors.surface,
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.78)',
    fontSize: FontSize.sm,
    textAlign: 'center',
  },
  card: {
    flex: 1,
    marginTop: -24,
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
  loginButton: {
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    color: Colors.textMuted,
    fontSize: FontSize.sm,
  },
  loginLink: {
    color: Colors.accent,
    fontWeight: FontWeight.bold,
  },
});
