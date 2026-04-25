import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '../../components/common/Button';
import { ErrorMessage } from '../../components/common/ErrorMessage';
import { Input } from '../../components/common/Input';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { useAuthStore } from '../../store/auth.store';
import { isValidEmail, isValidPassword } from '../../utils/validators';

interface RegisterErrors {
  nom?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export function RegisterScreen() {
  const register = useAuthStore((state) => state.register);
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [telephone, setTelephone] = useState('');
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const nextErrors: RegisterErrors = {};
    if (!nom.trim()) {
      nextErrors.nom = 'Nom requis.';
    }
    if (!isValidEmail(email)) {
      nextErrors.email = 'Email invalide.';
    }
    if (!isValidPassword(password)) {
      nextErrors.password = 'Mot de passe trop court.';
    }
    if (password !== confirmPassword) {
      nextErrors.confirmPassword = 'Les mots de passe ne correspondent pas.';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (): Promise<void> => {
    if (!validate()) {
      return;
    }

    setSubmitError(null);
    setIsSubmitting(true);
    try {
      await register({ nom, email, motDePasse: password, telephone: telephone || undefined });
    } catch (caught) {
      setSubmitError(caught instanceof Error ? caught.message : 'Inscription impossible.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.form}>
        <Input label="Nom complet" value={nom} onChangeText={setNom} placeholder="Votre nom" error={errors.nom} />
        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholder="votre@email.ma"
          error={errors.email}
        />
        <Input
          label="Mot de passe"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          error={errors.password}
        />
        <Input
          label="Confirmer le mot de passe"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          error={errors.confirmPassword}
        />
        <Input
          label="Telephone"
          value={telephone}
          onChangeText={setTelephone}
          keyboardType="phone-pad"
          placeholder="Optionnel"
        />
        {submitError ? <ErrorMessage message={submitError} /> : null}
        <Button label="Creer mon compte" onPress={handleSubmit} isLoading={isSubmitting} variant="primary" />
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
  form: {
    gap: Spacing.md,
  },
});
