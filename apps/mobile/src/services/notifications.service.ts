const USE_MOCK = true; // Set to false when real backend is ready

import { apiClient } from '../api/client';
import { mockNotifications } from '../mocks/notifications.mock';
import type { Notification } from '../types';

const delay = async (): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 200 + Math.random() * 300));
};

export const getUserNotifications = async (userId: string): Promise<Notification[]> => {
  if (!USE_MOCK) {
    return apiClient.request<Notification[]>(`/users/${userId}/notifications`);
  }

  await delay();
  return mockNotifications
    .filter((item) => item.userId === userId)
    .sort((first, second) => Date.parse(second.dateEnvoi) - Date.parse(first.dateEnvoi));
};

export const markAsRead = async (notificationId: string): Promise<void> => {
  if (!USE_MOCK) {
    await apiClient.request<void>(`/notifications/${notificationId}/read`, { method: 'PATCH' });
    return;
  }

  await delay();
  const notification = mockNotifications.find((item) => item.id === notificationId);
  if (notification) {
    notification.lu = true;
  }
};

export const markAllAsRead = async (userId: string): Promise<void> => {
  if (!USE_MOCK) {
    await apiClient.request<void>(`/users/${userId}/notifications/read-all`, { method: 'PATCH' });
    return;
  }

  await delay();
  mockNotifications.forEach((item) => {
    if (item.userId === userId) {
      item.lu = true;
    }
  });
};
