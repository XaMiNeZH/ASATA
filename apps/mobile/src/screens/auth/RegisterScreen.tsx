import { useState } from 'react';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '../../components/common/Button';
import { ErrorMessage } from '../../components/common/ErrorMessage';
import { Input } from '../../components/common/Input';
import { Colors } from '../../constants/colors';
import { useAuthStore } from '../../store/auth.store';
import type { AuthStackParamList } from '../../types';
import { isValidEmail, isValidPassword } from '../../utils/validators';

type RegisterNavigation = NativeStackNavigationProp<AuthStackParamList, 'Register'>;

interface RegisterErrors {
  nom?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export function RegisterScreen() {
  const navigation = useNavigation<RegisterNavigation>();
  const register = useAuthStore((state) => state.register);
  const insets = useSafeAreaInsets();

  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [telephone, setTelephone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const nextErrors: RegisterErrors = {};
    if (!nom.trim()) nextErrors.nom = 'Nom requis.';
    if (!isValidEmail(email)) nextErrors.email = 'Email invalide.';
    if (!isValidPassword(password)) nextErrors.password = 'Mot de passe trop court.';
    if (password !== confirmPassword) nextErrors.confirmPassword = 'Les mots de passe ne correspondent pas.';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (): Promise<void> => {
    if (!validate()) return;
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

  const passwordsMatch = Boolean(confirmPassword) && password === confirmPassword;

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Back button */}
        <View style={styles.backRow}>
          <Pressable style={styles.backButton} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.backIcon}>‹</Text>
          </Pressable>
        </View>

        {/* Heading */}
        <View style={styles.headingBlock}>
          <Text style={styles.heading}>Créer un compte</Text>
          <Text style={styles.subheading}>
            Rejoignez la communauté ASATA en quelques secondes.
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Input
            label="Nom complet"
            value={nom}
            onChangeText={setNom}
            placeholder="Hamza Belazri"
            error={errors.nom}
            leftIcon="user"
          />
          <Input
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholder="vous@example.com"
            error={errors.email}
            leftIcon="mail"
          />
          <Input
            label="Téléphone"
            value={telephone}
            onChangeText={setTelephone}
            keyboardType="phone-pad"
            placeholder="+212 6 00 00 00 00"
            leftIcon="phone"
            optional
          />
          <Input
            label="Mot de passe"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            placeholder="Min. 8 caractères"
            error={errors.password}
            leftIcon="lock"
            rightIcon={showPassword ? 'eye-off' : 'eye'}
            onRightIconPress={() => setShowPassword((v) => !v)}
          />
          <Input
            label="Confirmer le mot de passe"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
            error={errors.confirmPassword}
            leftIcon="lock"
            rightIcon={passwordsMatch ? 'check-circle' : showConfirmPassword ? 'eye-off' : 'eye'}
            rightIconColor={passwordsMatch ? Colors.success : Colors.subtle}
            onRightIconPress={passwordsMatch ? undefined : () => setShowConfirmPassword((v) => !v)}
          />
          {submitError ? <ErrorMessage message={submitError} /> : null}
          <View style={styles.submitArea}>
            <Button
              label="Créer mon compte"
              onPress={handleSubmit}
              isLoading={isSubmitting}
              variant="primary"
            />
            <View style={styles.loginRow}>
              <Text style={styles.mutedText}>Déjà inscrit ?  </Text>
              <Pressable onPress={() => navigation.navigate('Login')}>
                <Text style={styles.linkBold}>Se connecter</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  scroll: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  backRow: {
    paddingHorizontal: 12,
    paddingTop: 4,
    paddingBottom: 4,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: Colors.primaryGhost,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 22,
    color: Colors.primary,
    fontWeight: '600',
    lineHeight: 26,
  },
  headingBlock: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 20,
    gap: 4,
  },
  heading: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.primaryDark,
    letterSpacing: -0.5,
    lineHeight: 30,
  },
  subheading: {
    fontSize: 13,
    color: Colors.subtle,
    marginTop: 4,
  },
  form: {
    paddingHorizontal: 24,
    gap: 12,
  },
  submitArea: {
    gap: 12,
    marginTop: 8,
    marginBottom: 24,
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mutedText: {
    fontSize: 13,
    color: Colors.subtle,
  },
  linkBold: {
    fontSize: 13,
    color: Colors.primary,
    fontWeight: '700',
  },
});
