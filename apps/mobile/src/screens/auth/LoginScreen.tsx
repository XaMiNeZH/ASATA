import { useState } from 'react';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { Button } from '../../components/common/Button';
import { ErrorMessage } from '../../components/common/ErrorMessage';
import { Input } from '../../components/common/Input';
import { useAuthStore } from '../../store/auth.store';
import type { AuthStackParamList } from '../../types';
import { isValidEmail, isValidPassword } from '../../utils/validators';
import { styles } from './LoginScreen.styles';

type LoginNavigation = NativeStackNavigationProp<AuthStackParamList, 'Login'>;
const logo = require('../../../assets/images/logo.png');

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
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.scrollContent}>
        <View style={styles.hero}>
          <Image source={logo} style={styles.logo} resizeMode="contain" />
          <Text style={styles.brand}>ASATA</Text>
          <Text style={styles.subtitle}>Association Sportive Atlas Toubkal Asni</Text>
        </View>
        <View style={styles.card}>
          <View style={styles.form}>
            <View>
              <Text style={styles.cardTitle}>Connexion</Text>
              <Text style={styles.cardSubtitle}>Accedez a vos activites et informations membre.</Text>
            </View>
            <Input
              label="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              placeholder="votre@email.ma"
              error={errors.email}
              leftIcon="mail"
            />
            <Input
              label="Mot de passe"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              placeholder="Votre mot de passe"
              error={errors.password}
              leftIcon="lock"
              rightIcon={showPassword ? 'eye-off' : 'eye'}
              onRightIconPress={() => setShowPassword((current) => !current)}
            />
            <Pressable style={styles.forgotButton} onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={styles.link}>Mot de passe oublie?</Text>
            </Pressable>
            {submitError ? <ErrorMessage message={submitError} /> : null}
            <Button label="Se connecter" onPress={handleSubmit} isLoading={isSubmitting} variant="primary" />
            <Pressable style={styles.signupButton} onPress={() => navigation.navigate('Register')}>
              <Text style={styles.signupText}>
                Pas encore membre? <Text style={styles.signupLink}>S'inscrire</Text>
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
