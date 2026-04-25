import { useEffect, useState } from 'react';

import { cancelParticipation, getUserParticipations } from '../services/participations.service';
import type { Participation } from '../types';

export const useParticipations = (userId?: string) => {
  const [participations, setParticipations] = useState<Participation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadParticipations = async (): Promise<void> => {
    if (!userId) {
      setParticipations([]);
      setIsLoading(false);
      return;
    }

    setError(null);
    setIsLoading(true);
    try {
      setParticipations(await getUserParticipations(userId));
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Impossible de charger les participations.');
    } finally {
      setIsLoading(false);
    }
  };

  const cancelById = async (participationId: string): Promise<void> => {
    await cancelParticipation(participationId);
    await loadParticipations();
  };

  useEffect(() => {
    void loadParticipations();
  }, [userId]);

  return { participations, isLoading, error, retry: loadParticipations, cancelById };
};
