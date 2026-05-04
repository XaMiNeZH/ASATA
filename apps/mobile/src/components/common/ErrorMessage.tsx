import { StyleSheet, Text, View } from 'react-native';

import { Colors } from '../../constants/colors';
import { Button } from './Button';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
      {onRetry ? (
        <Button label="Réessayer" onPress={onRetry} variant="secondary" />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.danger,
    backgroundColor: Colors.errorContainer,
    marginHorizontal: 20,
    marginVertical: 8,
  },
  message: {
    color: Colors.danger,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
});
