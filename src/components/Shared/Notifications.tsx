import React, { useEffect } from 'react';
import useNotificationStore from "@/stores/useNotificationStore";

const Notifications = () => {
  const notifications = useNotificationStore((state) => state.notifications);

  useEffect(() => {
    notifications.forEach((notification) => {
      // Logic to display notifications
      // This can be a toast message, modal, alert, etc., depending on your UI library
      console.log(notification); // Replace this with actual UI logic
    });
  }, [notifications]);

  return null; // This component does not render anything itself
};

export default Notifications;
