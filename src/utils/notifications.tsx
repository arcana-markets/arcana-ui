import useNotificationStore from "@/stores/useNotificationStore";

export function notify(newNotification: {
  type?: string;
  title: string;
  message: React.ReactNode;
  description?: string;
  txid?: string;
  autoClose?: number;
}) {
  const { notifications, set: setNotificationStore } = useNotificationStore.getState();

  setNotificationStore((state: { notifications: any[] }) => {
    state.notifications = [
      ...notifications,
      { type: 'success', ...newNotification },
    ];
  });
}
