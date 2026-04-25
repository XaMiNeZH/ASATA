import { StyleSheet } from 'react-native';

import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { FontSize, FontWeight } from '../../constants/typography';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  avatarRing: {
    width: 86,
    height: 86,
    borderRadius: 43,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: Colors.surface,
    marginBottom: Spacing.md,
  },
  name: {
    color: Colors.surface,
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    textAlign: 'center',
  },
  email: {
    color: 'rgba(255,255,255,0.76)',
    fontSize: FontSize.sm,
    marginTop: Spacing.xs,
  },
  roleBadge: {
    marginTop: Spacing.sm,
    borderRadius: 14,
    backgroundColor: Colors.accent,
    paddingHorizontal: Spacing.md,
    paddingVertical: 5,
  },
  roleText: {
    color: Colors.surface,
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    textTransform: 'uppercase',
  },
  stats: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    paddingVertical: Spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    gap: Spacing.xs,
  },
  statNumber: {
    color: Colors.textPrimary,
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
  },
  statLabel: {
    color: Colors.textMuted,
    fontSize: FontSize.xs,
  },
  content: {
    gap: Spacing.md,
    padding: Spacing.md,
  },
  infoCard: {
    borderRadius: 12,
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    minHeight: 58,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  infoRowLast: {
    borderBottomWidth: 0,
  },
  infoCopy: {
    flex: 1,
  },
  infoLabel: {
    color: Colors.textMuted,
    fontSize: FontSize.xs,
  },
  infoValue: {
    color: Colors.textPrimary,
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
    marginTop: 2,
  },
});
