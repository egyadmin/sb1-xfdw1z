import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: Date;
}

interface AppState {
  user: User | null;
  notifications: Notification[];
  unreadCount: number;
  darkMode: boolean;
  pendingRegistrations: any[];
  login: (user: User) => void;
  logout: () => void;
  addNotification: (notification: Omit<Notification, 'id' | 'read' | 'createdAt'>) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  toggleDarkMode: () => void;
  addPendingRegistration: (registration: any) => void;
  approvePendingRegistration: (id: string) => void;
  rejectPendingRegistration: (id: string) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      notifications: [],
      unreadCount: 0,
      darkMode: false,
      pendingRegistrations: [],
      login: (user) => set({ user }),
      logout: () => set({ user: null }),
      addNotification: (notification) =>
        set((state) => ({
          notifications: [
            {
              id: Math.random().toString(36).substr(2, 9),
              read: false,
              createdAt: new Date(),
              ...notification,
            },
            ...state.notifications,
          ],
          unreadCount: state.unreadCount + 1,
        })),
      markNotificationAsRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
          unreadCount: state.unreadCount - 1,
        })),
      markAllNotificationsAsRead: () =>
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
          unreadCount: 0,
        })),
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
      addPendingRegistration: (registration) =>
        set((state) => ({
          pendingRegistrations: [...state.pendingRegistrations, registration],
        })),
      approvePendingRegistration: (id) =>
        set((state) => ({
          pendingRegistrations: state.pendingRegistrations.filter((r) => r.id !== id),
        })),
      rejectPendingRegistration: (id) =>
        set((state) => ({
          pendingRegistrations: state.pendingRegistrations.filter((r) => r.id !== id),
        })),
    }),
    {
      name: 'app-storage',
    }
  )
);