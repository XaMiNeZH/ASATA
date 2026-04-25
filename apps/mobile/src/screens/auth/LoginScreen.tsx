import { useState } from 'react';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { Button } from '../../components/common/Button';
import { ErrorMessage } from '../../components/common/ErrorMessage';
import { Input } from '../../components/common/Input';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { FontSize, FontWeight } from '../../constants/typography';
import { useAuthStore } from '../../store/auth.store';
import type { AuthStackParamList } from '../../types';
import { isValidEmail, isValidPassword } from '../../utils/validators';

type LoginNavigation = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

interface LoginErrors {
  email?: string;
  password?: string;
}

export function LoginScreen() {
  const navigation = useNavigation<LoginNavigation>();
  const login = useAuthStore((state) => state.login);
  const [email, setEmail] = useState('youssef@asata.ma');
  const [password, setPassword] = useState('asata2026');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<LoginErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const nextErrors: LoginErrors = {};
    if (!isValidEmail(email)) {
      nextErrors.email = 'Email invalide.';
    }
    if (!isValidPassword(password)) {
      nextErrors.password = 'Mot de passe trop court.';
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
      await login({ email, motDePasse: password });
    } catch (caught) {
      setSubmitError(caught instanceof Error ? caught.message : 'Connexion impossible.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.brand}>ASATA Connect</Text>
        <Text style={styles.subtitle}>Espace membre de l association sportive</Text>
      </View>
      <View style={styles.form}>
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
          secureTextEntry={!showPassword}
          placeholder="Votre mot de passe"
          error={errors.password}
        />
        <Pressable style={styles.toggle} onPress={() => setShowPassword((current) => !current)}>
          <Text style={styles.link}>{showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}</Text>
        </Pressable>
        {submitError ? <ErrorMessage message={submitError} /> : null}
        <Button label="Se connecter" onPress={handleSubmit} isLoading={isSubmitting} variant="primary" />
        <Pressable style={styles.linkButton} onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.link}>Mot de passe oublie?</Text>
        </Pressable>
        <Pressable style={styles.linkButton} onPress={() => navigation.navigate('Register')}>
          <Text style={styles.link}>Creer un compte</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    gap: Spacing.xl,
    padding: Spacing.md,
    backgroundColor: Colors.background,
  },
  header: {
    gap: Spacing.sm,
  },
  brand: {
    color: Colors.primaryDark,
    fontSize: FontSize.display,
    fontWeight: FontWeight.bold,
  },
  subtitle: {
    color: Colors.textSecondary,
    fontSize: FontSize.md,
  },
  form: {
    gap: Spacing.md,
  },
  toggle: {
    minHeight: 44,
    justifyContent: 'center',
  },
  linkButton: {
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  link: {
    color: Colors.primary,
    fontSize: FontSize.md,
    fontWeight: FontWeight.medium,
  },
});
