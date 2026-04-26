import { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '../../components/common/Button';
import { ErrorMessage } from '../../components/common/ErrorMessage';
import { Input } from '../../components/common/Input';
import { Colors } from '../../constants/colors';
import { useAuthStore } from '../../store/auth.store';
import type { AuthStackParamList } from '../../types';
import { isValidEmail, isValidPassword } from '../../utils/validators';
import { styles } from './RegisterScreen.styles';

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

  const passwordsMatch = Boolean(confirmPassword) && password === confirmPassword;

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.scrollContent}>
        <View style={styles.hero}>
          <View style={styles.locationPill}>
            <Feather name="map-pin" size={14} color="rgba(255,255,255,0.86)" />
            <Text style={styles.locationText}>Asni, Marrakech</Text>
          </View>
          <Text style={styles.brand}>ASATA</Text>
          <Text style={styles.subtitle}>Association Sportive Atlas Toubkal Asni</Text>
        </View>
        <View style={styles.card}>
          <View style={styles.form}>
            <View>
              <Text style={styles.cardTitle}>Inscription</Text>
              <Text style={styles.cardSubtitle}>Créez votre espace membre ASATA Connect.</Text>
            </View>
            <Input
              label="Nom complet"
              value={nom}
              onChangeText={setNom}
              placeholder="Votre nom"
              error={errors.nom}
              leftIcon="user"
            />
            <Input
              label="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              placeholder="nom@exemple.com"
              error={errors.email}
              leftIcon="mail"
            />
            <Input
              label="Mot de passe"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              error={errors.password}
              leftIcon="lock"
              rightIcon={showPassword ? 'eye-off' : 'eye'}
              onRightIconPress={() => setShowPassword((current) => !current)}
            />
            <Input
              label="Confirmer le mot de passe"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              error={errors.confirmPassword}
              leftIcon="shield"
              rightIcon={passwordsMatch ? 'check-circle' : showConfirmPassword ? 'eye-off' : 'eye'}
              rightIconColor={passwordsMatch ? Colors.success : Colors.textMuted}
              onRightIconPress={passwordsMatch ? undefined : () => setShowConfirmPassword((current) => !current)}
            />
            <Input
              label="Téléphone"
              value={telephone}
              onChangeText={setTelephone}
              keyboardType="phone-pad"
              placeholder="Optionnel"
              leftIcon="phone"
            />
            {submitError ? <ErrorMessage message={submitError} /> : null}
            <Button label="Créer mon compte" onPress={handleSubmit} isLoading={isSubmitting} variant="primary" />
            <Pressable style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginText}>
                Déjà membre ? <Text style={styles.loginLink}>Se connecter</Text>
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
