import { create } from "zustand";

interface NotificationStore {
  unreadCount: number;
  incrementUnreadCount: () => void;
  resetUnreadCount: () => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  unreadCount: 0,

  incrementUnreadCount: () =>
    set((state) => ({
      unreadCount: state.unreadCount + 1,
    })),

  resetUnreadCount: () => set({ unreadCount: 0 }),
}));
