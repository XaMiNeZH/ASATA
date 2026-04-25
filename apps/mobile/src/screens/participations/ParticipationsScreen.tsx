import { useState } from 'react';
import { Alert, SectionList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
      <SafeAreaView style={styles.screen}>
        <ErrorMessage message={error} onRetry={retry} />
      </SafeAreaView>
    );
  }

  const sections: ParticipationSection[] = [
    { title: 'Confirmees', data: participations.filter((item) => item.statut === 'confirme' && !isPast(item)) },
    { title: 'Annulees', data: participations.filter((item) => item.statut === 'annule') },
    { title: 'Passees', data: participations.filter((item) => isPast(item) || item.statut === 'en_attente') },
  ].filter((section) => section.data.length > 0);

  return (
    <SafeAreaView style={styles.screen}>
      {message ? <Text style={styles.success}>{message}</Text> : null}
      {actionError ? <ErrorMessage message={actionError} /> : null}
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeader}>
            <View style={styles.accentBar} />
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
          <EmptyState icon="check-circle" title="Aucune participation" subtitle="Vos inscriptions apparaitront ici." />
        }
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}
