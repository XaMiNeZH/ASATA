import { StyleSheet } from 'react-native';

import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { FontSize, FontWeight } from '../../constants/typography';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.md,
  },
  listContent: {
    paddingVertical: Spacing.md,
  },
  card: {
    borderLeftWidth: 3,
    borderLeftColor: Colors.accent,
    borderRadius: 12,
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  cardPressed: {
    opacity: 0.84,
  },
  cardContent: {
    gap: Spacing.sm,
  },
  title: {
    color: Colors.textPrimary,
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    lineHeight: 20,
  },
  preview: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
    lineHeight: 19,
  },
  date: {
    alignSelf: 'flex-end',
    color: Colors.textMuted,
    fontSize: FontSize.xs,
  },
  separator: {
    height: Spacing.md,
  },
});
