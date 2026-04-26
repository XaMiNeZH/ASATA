import { useState } from 'react';
import { Alert, SectionList, Text, View } from 'react-native';

import { AppHeader } from '../../components/common/AppHeader';
import { EmptyState } from '../../components/common/EmptyState';
import { ErrorMessage } from '../../components/common/ErrorMessage';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { ParticipationItem } from '../../components/participations/ParticipationItem';
import { useParticipations } from '../../hooks/useParticipations';
import { useAuthStore } from '../../store/auth.store';
import type { Participation } from '../../types';
import { styles } from './ParticipationsScreen.styles';

interface ParticipationSection {
  title: string;
  data: Participation[];
}

const isPast = (participation: Participation): boolean => {
  if (!participation.evenement) {
    return false;
  }

  return participation.evenement.statut === 'termine' || Date.parse(participation.evenement.date) < Date.now();
};

export function ParticipationsScreen() {
  const user = useAuthStore((state) => state.user);
  const { participations, isLoading, error, retry, cancelById } = useParticipations(user?.id);
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const handleCancel = (participationId: string): void => {
    Alert.alert("Confirmer l'annulation", 'Voulez-vous vraiment annuler votre participation ?', [
      { text: 'Non', style: 'cancel' },
      {
        text: 'Oui, annuler',
        style: 'destructive',
        onPress: () => {
          void cancel(participationId);
        },
      },
    ]);
  };

  const cancel = async (participationId: string): Promise<void> => {
    setCancellingId(participationId);
    setActionError(null);
    setMessage(null);
    try {
      await cancelById(participationId);
      setMessage('Participation annulée.');
    } catch (caught) {
      setActionError(caught instanceof Error ? caught.message : 'Annulation impossible.');
    } finally {
      setCancellingId(null);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <View style={styles.screen}>
        <ErrorMessage message={error} onRetry={retry} />
      </View>
    );
  }

  const sections: ParticipationSection[] = [
    { title: 'CONFIRMÉES', data: participations.filter((item) => item.statut === 'confirme' && !isPast(item)) },
    { title: 'EN ATTENTE', data: participations.filter((item) => item.statut === 'en_attente' && !isPast(item)) },
    { title: 'ANNULÉES', data: participations.filter((item) => item.statut === 'annule') },
    { title: 'PASSÉES', data: participations.filter((item) => isPast(item) && item.statut !== 'annule') },
  ].filter((section) => section.data.length > 0);

  return (
    <View style={styles.screen}>
      <AppHeader title="Mes Participations" />
      <View style={styles.feedback}>
        {message ? <Text style={styles.success}>{message}</Text> : null}
        {actionError ? <ErrorMessage message={actionError} /> : null}
      </View>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <ParticipationItem
            participation={item}
            canCancel={item.statut === 'confirme' && !isPast(item)}
            onCancel={() => handleCancel(item.id)}
            isCancelling={cancellingId === item.id}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        SectionSeparatorComponent={() => <View style={styles.sectionGap} />}
        ListEmptyComponent={
          <EmptyState icon="check-circle" title="Aucune participation" subtitle="Vos inscriptions apparaîtront ici." />
        }
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}
