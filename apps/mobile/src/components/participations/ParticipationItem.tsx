import { Feather } from '@expo/vector-icons';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';

import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { AsataImages } from '../../constants/asataImages';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { FontSize, FontWeight } from '../../constants/typography';
import type { Participation } from '../../types';
import { formatDate } from '../../utils/date';
import { getEventImageSource } from '../../utils/eventImages';

interface ParticipationItemProps {
  participation: Participation;
  canCancel: boolean;
  onPress?: () => void;
  onCancel: () => void;
  isCancelling?: boolean;
}

export function ParticipationItem({
  participation,
  canCancel,
  onPress,
  onCancel,
  isCancelling = false,
}: ParticipationItemProps) {
  const statusStyle = statusToneStyles[participation.statut];
  const isCancelled = participation.statut === 'annule';
  const title = participation.evenement?.titre ?? 'Événement';
  const imageSource = participation.evenement ? getEventImageSource(participation.evenement) : AsataImages.association;

  return (
    <Pressable
      accessibilityRole={onPress ? 'button' : undefined}
      disabled={!onPress}
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        isCancelled && styles.cancelledCard,
        pressed && onPress && styles.pressed,
      ]}
    >
      <View style={styles.main}>
        <ImageBackground source={imageSource} resizeMode="cover" style={[styles.thumbnail, statusStyle]} imageStyle={styles.thumbnailImage}>
          <View style={styles.thumbnailOverlay} />
          <Feather name={isCancelled ? 'x-circle' : 'calendar'} size={28} color={isCancelled ? Colors.error : Colors.surface} />
        </ImageBackground>
        <View style={styles.copy}>
          <Text numberOfLines={1} style={[styles.title, isCancelled && styles.cancelledText]}>
            {title}
          </Text>
          <View style={styles.metaRow}>
            <Feather name="calendar" size={18} color={Colors.textSecondary} />
            <Text style={styles.date}>{participation.evenement ? formatDate(participation.evenement.date) : ''}</Text>
          </View>
          <View style={styles.metaRow}>
            <Feather name={isCancelled ? 'x-circle' : 'map-pin'} size={18} color={isCancelled ? Colors.danger : Colors.textSecondary} />
            <Text numberOfLines={1} style={[styles.date, isCancelled && styles.reason]}>
              {isCancelled ? "Annulé par l'organisateur" : participation.evenement?.lieu ?? 'Lieu à confirmer'}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.actions}>
        <Badge label={participation.statut.replace('_', ' ')} status={participation.statut} />
        {canCancel ? (
          <View style={styles.cancelButton}>
            <Button label="Annuler" onPress={onCancel} isLoading={isCancelling} variant="dangerOutline" />
          </View>
        ) : null}
        {participation.statut === 'en_attente' ? (
          <View style={styles.pendingTime}>
            <Feather name="clock" size={16} color={Colors.textSecondary} />
            <Text style={styles.pendingText}>72h max.</Text>
          </View>
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  cancelledCard: {
    backgroundColor: Colors.surfaceContainer,
    opacity: 0.72,
  },
  pressed: {
    opacity: 0.82,
  },
  main: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  thumbnailImage: {
    borderRadius: 8,
  },
  thumbnailOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.blackOverlay20,
  },
  copy: {
    flex: 1,
    gap: Spacing.xs,
    minWidth: 0,
  },
  title: {
    color: Colors.textPrimary,
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    lineHeight: 26,
  },
  cancelledText: {
    color: Colors.textMuted,
  },
  date: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  reason: {
    color: '#DE7D7D',
  },
  actions: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
    marginTop: Spacing.md,
    paddingTop: Spacing.sm,
  },
  cancelButton: {
    minWidth: 90,
    maxWidth: 120,
  },
  pendingTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  pendingText: {
    color: Colors.textSecondary,
    fontSize: FontSize.md,
    fontWeight: FontWeight.medium,
  },
});

const statusToneStyles = StyleSheet.create({
  confirme: { backgroundColor: Colors.primary },
  annule: { backgroundColor: Colors.errorContainer },
  en_attente: { backgroundColor: Colors.slate },
});
