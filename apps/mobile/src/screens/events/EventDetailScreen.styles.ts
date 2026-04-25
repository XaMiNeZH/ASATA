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
    paddingBottom: Spacing.xxl,
  },
  coverWrap: {
    height: 220,
    backgroundColor: Colors.border,
  },
  cover: {
    width: '100%',
    height: '100%',
    opacity: 0.82,
  },
  watermark: {
    position: 'absolute',
    right: Spacing.lg,
    bottom: Spacing.lg,
    color: 'rgba(255,255,255,0.70)',
    fontSize: FontSize.display,
    fontWeight: FontWeight.bold,
  },
  backButton: {
    position: 'absolute',
    top: Spacing.xl,
    left: Spacing.md,
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surface,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.16,
    shadowRadius: 6,
    elevation: 4,
  },
  card: {
    marginTop: -20,
    marginHorizontal: Spacing.md,
    borderRadius: 18,
    backgroundColor: Colors.surface,
    padding: Spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  titleRow: {
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  title: {
    color: Colors.textPrimary,
    fontSize: 22,
    fontWeight: FontWeight.bold,
    lineHeight: 28,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginTop: Spacing.sm,
  },
  meta: {
    flex: 1,
    color: Colors.textSecondary,
    fontSize: FontSize.md,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.lg,
  },
  capacity: {
    gap: Spacing.sm,
  },
  label: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
  },
  description: {
    color: Colors.textPrimary,
    fontSize: FontSize.md,
    lineHeight: 24,
    marginTop: Spacing.lg,
  },
  success: {
    color: Colors.success,
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    marginTop: Spacing.md,
  },
  actionBar: {
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.md,
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
    color: Colors.danger,
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    textAlign: 'center',
  },
});
