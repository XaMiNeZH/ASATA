import { StyleSheet } from 'react-native';

import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { FontSize, FontWeight } from '../../constants/typography';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listContent: {
    padding: Spacing.container,
    paddingBottom: 120,
  },
  state: {
    padding: Spacing.container,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  thumbnail: {
    width: 64,
    height: 64,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: Colors.primary,
  },
  thumbnailImage: {
    borderRadius: 10,
  },
  thumbnailOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.blackOverlay20,
  },
  rowBody: {
    flex: 1,
    minWidth: 0,
    gap: Spacing.sm,
  },
  title: {
    color: Colors.primary,
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
  },
  meta: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
  },
  actions: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  iconButton: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: Colors.secondaryContainer,
  },
  deleteButton: {
    backgroundColor: Colors.errorContainer,
  },
  pressed: {
    opacity: 0.7,
  },
  separator: {
    height: Spacing.md,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  fabPressed: {
    opacity: 0.84,
    transform: [{ scale: 0.96 }],
  },
});
