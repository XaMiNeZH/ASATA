import { StyleSheet } from 'react-native';

import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  content: {
    gap: Spacing.md,
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  photoButton: {
    alignSelf: 'center',
    marginBottom: Spacing.md,
  },
  photo: {
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: Colors.primaryPale,
  },
  photoPlaceholder: {
    width: 112,
    height: 112,
    borderRadius: 56,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primaryPale,
  },
  cameraBadge: {
    position: 'absolute',
    right: 2,
    bottom: 2,
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: Colors.surface,
    backgroundColor: Colors.accent,
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
});
