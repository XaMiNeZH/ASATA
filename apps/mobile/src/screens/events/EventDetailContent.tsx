import { Feather } from '@expo/vector-icons';
import { Text, View } from 'react-native';

import { Badge } from '../../components/common/Badge';
import { ErrorMessage } from '../../components/common/ErrorMessage';
import { CapacityBar } from '../../components/events/CapacityBar';
import { Colors } from '../../constants/colors';
import type { Evenement } from '../../types';
import { formatDate } from '../../utils/date';
import { contentStyles as styles } from './EventDetailContent.styles';

interface EventDetailContentProps {
  event: Evenement;
  isRegistered: boolean;
  isCancelled: boolean;
  message: string | null;
  error: string | null;
}

export function EventDetailContent({
  event,
  isRegistered,
  isCancelled,
  message,
  error,
}: EventDetailContentProps) {
  const capacityPercent = Math.round((event.inscrits / event.capacite) * 100);

  return (
    <View style={styles.card}>
      <View style={styles.statusRow}>
        <View style={styles.statusLeft}>
          <View style={[styles.statusDot, isCancelled && styles.statusDotDanger]} />
          <Text style={[styles.statusText, isCancelled && styles.statusTextDanger]}>
            {isCancelled ? 'ÉVÉNEMENT ANNULÉ' : isRegistered ? 'INSCRIPTION CONFIRMÉE' : 'OUVERT AUX INSCRIPTIONS'}
          </Text>
        </View>
        <View style={styles.participantPill}>
          <Feather name="users" size={16} color={Colors.textSecondary} />
          <Text style={styles.participantText}>{event.inscrits} inscrits</Text>
        </View>
      </View>
      <View style={styles.detailGrid}>
        <View style={styles.detailItem}>
          <View style={styles.detailIcon}>
            <Feather name="calendar" size={22} color={Colors.primary} />
          </View>
          <View style={styles.detailCopy}>
            <Text style={styles.detailLabel}>DATE & HEURE</Text>
            <Text style={styles.detailValue}>{formatDate(event.date)}</Text>
            <Text style={styles.detailMeta}>09:00 - 18:30</Text>
          </View>
        </View>
        <View style={styles.detailItem}>
          <View style={styles.detailIcon}>
            <Feather name="map-pin" size={22} color={Colors.primary} />
          </View>
          <View style={styles.detailCopy}>
            <Text style={styles.detailLabel}>LIEU</Text>
            <Text style={styles.detailValue}>{event.lieu}</Text>
            <Text style={styles.detailMeta}>ASATA Connect</Text>
          </View>
        </View>
      </View>
      <View style={styles.capacity}>
        <View style={styles.capacityHeader}>
          <Text style={styles.label}>CAPACITÉ DE L'ÉVÉNEMENT</Text>
          <Text style={styles.capacityText}>{capacityPercent}% / {event.capacite} places</Text>
        </View>
        <CapacityBar total={event.capacite} filled={event.inscrits} />
      </View>
      <View style={styles.descriptionBlock}>
        <Text style={styles.sectionTitle}>À propos de l'événement</Text>
        <Text style={styles.description}>{event.description}</Text>
      </View>
      <View style={styles.speakersBlock}>
        <Text style={styles.sectionTitle}>Intervenants</Text>
        <View style={styles.speakerGrid}>
          <View style={styles.speakerCard}>
            <View style={styles.speakerAvatar}>
              <Text style={styles.speakerInitials}>JD</Text>
            </View>
            <View>
              <Text style={styles.speakerName}>Jean Dupont</Text>
              <Text style={styles.speakerRole}>Directeur Technique</Text>
            </View>
          </View>
          <View style={styles.speakerCardSmall}>
            <Badge label="+12" status="membre" />
          </View>
        </View>
      </View>
      {message ? <Text style={styles.success}>{message}</Text> : null}
      {error ? <ErrorMessage message={error} /> : null}
    </View>
  );
}
