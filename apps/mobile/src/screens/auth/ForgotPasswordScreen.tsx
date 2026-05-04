import { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path, Circle } from 'react-native-svg';

import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Colors } from '../../constants/colors';
import { isValidEmail } from '../../utils/validators';
import type { AuthStackParamList } from '../../types';

type ForgotNavigation = NativeStackNavigationProp<AuthStackParamList, 'ForgotPassword'>;

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

export function ForgotPasswordScreen() {
  const navigation = useNavigation<ForgotNavigation>();
  const insets = useSafeAreaInsets();

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
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Back */}
        <View style={styles.backRow}>
          <Pressable style={styles.backButton} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.backIcon}>‹</Text>
          </Pressable>
        </View>

        {/* Icon + heading */}
        <View style={styles.headingBlock}>
          <View style={styles.iconBox}>
            <Feather name="lock" size={26} color={Colors.primary} />
          </View>
          <Text style={styles.heading}>Mot de passe oublié ?</Text>
          <Text style={styles.subheading}>
            Entrez votre adresse email, nous vous enverrons un lien de réinitialisation.
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
            error={error}
            leftIcon="mail"
          />
          {success && (
            <View style={styles.successBox}>
              <Feather name="check-circle" size={16} color={Colors.statusEnCours} />
              <Text style={styles.successText}>
                Un lien de réinitialisation a été envoyé.
              </Text>
            </View>
          )}
          <Button label="Envoyer le lien" onPress={handleSubmit} variant="primary" />
          <View style={styles.backLinkRow}>
            <Pressable onPress={() => navigation.navigate('Login')}>
              <Text style={styles.backLink}>← Retour à la connexion</Text>
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
    paddingTop: 24,
    paddingBottom: 16,
    gap: 14,
  },
  iconBox: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: Colors.primaryPale,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.primaryDark,
    letterSpacing: -0.5,
    lineHeight: 30,
  },
  subheading: {
    fontSize: 14,
    color: Colors.subtle,
    lineHeight: 22,
  },
  form: {
    paddingHorizontal: 24,
    gap: 14,
  },
  successBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.statusEnCoursBg,
    borderRadius: 12,
    padding: 12,
  },
  successText: {
    fontSize: 13,
    color: Colors.statusEnCours,
    fontWeight: '500',
    flex: 1,
  },
  backLinkRow: {
    alignItems: 'center',
    marginTop: 4,
  },
  backLink: {
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
