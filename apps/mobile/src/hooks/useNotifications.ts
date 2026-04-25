import { useEffect, useState } from 'react';

import * as notificationService from '../services/notifications.service';
import { useNotificationsStore } from '../store/notifications.store';
import type { Notification } from '../types';

export const useNotifications = (userId?: string) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const setUnreadCount = useNotificationsStore((state) => state.setUnreadCount);

  const syncUnread = (items: Notification[]): void => {
    setUnreadCount(items.filter((item) => !item.lu).length);
  };

  const loadNotifications = async (): Promise<void> => {
    if (!userId) {
      setNotifications([]);
      syncUnread([]);
      setIsLoading(false);
      return;
    }

    setError(null);
    setIsLoading(true);
    try {
      const items = await notificationService.getUserNotifications(userId);
      setNotifications(items);
      syncUnread(items);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Impossible de charger les notifications.');
    } finally {
      setIsLoading(false);
    }
  };

  const markRead = async (notificationId: string): Promise<void> => {
    await notificationService.markAsRead(notificationId);
    await loadNotifications();
  };

  const markAllRead = async (): Promise<void> => {
    if (!userId) {
      return;
    }

    await notificationService.markAllAsRead(userId);
    await loadNotifications();
  };

  useEffect(() => {
    void loadNotifications();
  }, [userId]);

  return { notifications, isLoading, error, retry: loadNotifications, markRead, markAllRead };
};
