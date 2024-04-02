import { create } from "zustand";
import { produce } from "immer";

interface NotificationStore {
  notifications: Array<{
    type: string;
    message: string;
    description?: string;
    txid?: string;
  }>;
  set: (fn: (state: NotificationStore) => void) => void;
}

const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  set: (fn) => set(produce((state: NotificationStore) => {
    fn(state);
  })),
}));

export default useNotificationStore;
