import { useEffect, useState } from 'react';

import { getEvents } from '../services/events.service';
import type { Evenement } from '../types';

export const useEvents = () => {
  const [events, setEvents] = useState<Evenement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadEvents = async (refreshing = false): Promise<void> => {
    setError(null);
    refreshing ? setIsRefreshing(true) : setIsLoading(true);
    try {
      setEvents(await getEvents());
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Impossible de charger les activites.');
    } finally {
      refreshing ? setIsRefreshing(false) : setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadEvents();
  }, []);

  return { events, isLoading, isRefreshing, error, refresh: () => loadEvents(true), retry: () => loadEvents() };
};
