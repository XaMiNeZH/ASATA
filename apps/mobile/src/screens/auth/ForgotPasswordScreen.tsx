import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { FontSize, FontWeight } from '../../constants/typography';
import { isValidEmail } from '../../utils/validators';

export function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState(false);

  const handleSubmit = (): void => {
    if (!isValidEmail(email)) {
      setError('Email invalide.');
      setSuccess(false);
      return;
    }

    setError(undefined);
    setSuccess(true);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.title}>Recuperation du compte</Text>
        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholder="votre@email.ma"
          error={error}
        />
        {success ? <Text style={styles.success}>Un email de reinitialisation a ete envoye.</Text> : null}
        <Button label="Envoyer" onPress={handleSubmit} variant="primary" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: Spacing.md,
    backgroundColor: Colors.background,
  },
  container: {
    gap: Spacing.md,
  },
  title: {
    color: Colors.textPrimary,
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
  },
  success: {
    color: Colors.success,
    fontSize: FontSize.md,
    fontWeight: FontWeight.medium,
  },
});
