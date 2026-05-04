import { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path, Circle } from 'react-native-svg';

import { Button } from '../../components/common/Button';
import { ErrorMessage } from '../../components/common/ErrorMessage';
import { Input } from '../../components/common/Input';
import { useAuthStore } from '../../store/auth.store';
import type { AuthStackParamList } from '../../types';
import { isValidEmail, isValidPassword } from '../../utils/validators';
import { Colors } from '../../constants/colors';

type LoginNavigation = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

interface LoginErrors {
  email?: string;
  password?: string;
}

function MountainSilhouette() {
  return (
    <View style={styles.mountainWrap} pointerEvents="none">
      <Svg viewBox="0 0 402 140" preserveAspectRatio="none" style={styles.mountainSvg}>
        <Path
          d="M0 100 L60 60 L120 90 L180 40 L240 80 L300 50 L360 85 L402 65 L402 140 L0 140 Z"
          fill={Colors.primaryLight}
          opacity={0.15}
        />
        <Path
          d="M0 110 L40 90 L100 110 L160 75 L220 105 L280 85 L340 110 L402 95 L402 140 L0 140 Z"
          fill={Colors.primaryPale}
          opacity={0.9}
        />
      </Svg>
    </View>
  );
}

export function LoginScreen() {
  const navigation = useNavigation<LoginNavigation>();
  const login = useAuthStore((state) => state.login);
  const insets = useSafeAreaInsets();

  const [email, setEmail] = useState('youssef@asata.ma');
  const [password, setPassword] = useState('asata2026');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<LoginErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const nextErrors: LoginErrors = {};
    if (!isValidEmail(email)) nextErrors.email = 'Email invalide.';
    if (!isValidPassword(password)) nextErrors.password = 'Mot de passe trop court.';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (): Promise<void> => {
    if (!validate()) return;
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
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Logo header */}
        <View style={styles.header}>
          <View style={styles.logoBox}>
            <Svg width={36} height={36} viewBox="0 0 24 24" fill="none">
              <Path d="M3 19h18l-5-9-3 4-3-6-7 11Z" fill="#fff" opacity={0.95} />
              <Circle cx={16} cy={6} r={1.6} fill="#fff" opacity={0.9} />
            </Svg>
          </View>
          <Text style={styles.brandName}>ASATA</Text>
          <Text style={styles.brandSub}>ATLAS TOUBKAL ASNI</Text>
        </View>

        {/* Heading */}
        <View style={styles.headingBlock}>
          <Text style={styles.heading}>Bienvenue sur ASATA</Text>
          <Text style={styles.subheading}>
            Connectez-vous pour suivre les événements de votre association.
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
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
            label="Mot de passe"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            placeholder="••••••••"
            error={errors.password}
            leftIcon="lock"
            rightIcon={showPassword ? 'eye-off' : 'eye'}
            onRightIconPress={() => setShowPassword((v) => !v)}
          />
          <Pressable style={styles.forgotRow} onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.link}>Mot de passe oublié ?</Text>
          </Pressable>
          {submitError ? <ErrorMessage message={submitError} /> : null}
          <Button
            label="Se connecter"
            onPress={handleSubmit}
            isLoading={isSubmitting}
            variant="primary"
          />
          <View style={styles.signupRow}>
            <Text style={styles.mutedText}>Pas encore membre ?  </Text>
            <Pressable onPress={() => navigation.navigate('Register')}>
              <Text style={styles.linkBold}>Créer un compte</Text>
            </Pressable>
          </View>
        </View>

        {/* Mountain decoration */}
        <View style={styles.mountainContainer}>
          <MountainSilhouette />
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
  },
  header: {
    alignItems: 'center',
    paddingTop: 28,
    paddingBottom: 24,
    gap: 8,
  },
  logoBox: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.28,
    shadowRadius: 18,
    elevation: 6,
  },
  brandName: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.primaryDark,
    letterSpacing: 1.2,
    marginTop: 4,
  },
  brandSub: {
    fontSize: 11,
    color: Colors.subtle,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    fontWeight: '500',
  },
  headingBlock: {
    paddingHorizontal: 24,
    marginBottom: 8,
    gap: 6,
  },
  heading: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.primaryDark,
    letterSpacing: -0.6,
    lineHeight: 32,
  },
  subheading: {
    fontSize: 14,
    color: Colors.subtle,
    lineHeight: 21,
  },
  form: {
    paddingHorizontal: 24,
    gap: 14,
    zIndex: 2,
  },
  forgotRow: {
    alignItems: 'flex-end',
    marginTop: -4,
  },
  link: {
    fontSize: 13,
    color: Colors.primary,
    fontWeight: '600',
  },
  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
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
  mountainContainer: {
    flex: 1,
    minHeight: 120,
    position: 'relative',
    marginTop: 24,
  },
  mountainWrap: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 140,
    overflow: 'hidden',
  },
  mountainSvg: {
    width: '100%',
    height: '100%',
  },
});
