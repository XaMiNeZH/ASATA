import { StyleSheet } from 'react-native';

import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { FontSize, FontWeight } from '../../constants/typography';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  hero: {
    minHeight: 140,
    justifyContent: 'flex-end',
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
  },
  greeting: {
    color: Colors.surface,
    fontSize: FontSize.display,
    fontWeight: FontWeight.bold,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.76)',
    fontSize: FontSize.sm,
    lineHeight: 20,
    marginTop: Spacing.xs,
  },
  content: {
    gap: Spacing.lg,
    paddingVertical: Spacing.lg,
  },
  section: {
    gap: Spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
  sectionTitle: {
    color: Colors.textPrimary,
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
  },
  linkButton: {
    minHeight: 36,
    justifyContent: 'center',
  },
  link: {
    color: Colors.accent,
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
  },
  eventList: {
    paddingHorizontal: Spacing.lg,
  },
  eventItem: {
    marginRight: Spacing.md,
  },
  notificationTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  count: {
    minWidth: 24,
    height: 24,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: Colors.accent,
    color: Colors.surface,
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    textAlign: 'center',
    lineHeight: 24,
  },
  list: {
    gap: Spacing.sm,
    paddingHorizontal: Spacing.lg,
  },
});
