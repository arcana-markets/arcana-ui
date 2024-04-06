import React from 'react';
import useNotificationStore from "../stores/useNotificationStore";

export function notify(newNotification: {
    type?: string;
    message: React.ReactNode;
    description?: string;
    txid?: string;
    title?: string;
  }) {
  const {
    notifications,
    set: setNotificationStore,
  } = useNotificationStore.getState()

  setNotificationStore((state: { notifications: any[] }) => {
    state.notifications = [
      ...notifications,
      { type: 'success', ...newNotification },
    ]
  })
}