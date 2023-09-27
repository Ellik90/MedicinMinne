import React, { createContext, useContext, useState, ReactNode } from 'react';

type NotificationModal = {
  id: string;
  url: string;
  name: string;
  comment: string;
  dose: string;
  time: string;
  selectedDate: Date;
};

type NotificationContextType = {
  selectedDate: Date | null; 
  notifications: NotificationModal[];
  addNotification: (notification: NotificationModal) => void;
  editNotification: (updatedNotification: NotificationModal) => void;
  deleteNotification: (notificationId: string) => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [notifications, setNotifications] = useState<NotificationModal[]>([]);

  const addNotification = (notification: NotificationModal) => {
    setNotifications([...notifications, notification]);
    setSelectedDate(notification.selectedDate); 
    // setUser({ ...user, notifiCations: updatedNotifications });
    
  };

  const editNotification = (updatedNotification: NotificationModal) => {
    // Hitta indexet för den notis som ska redigeras
    const index = notifications.findIndex((n) => n.id === updatedNotification.id);

    if (index !== -1) {
      // Skapa en kopia av notislistan och ersätt den gamla notisen med den uppdaterade notisen
      const updatedNotifications = [...notifications];
      updatedNotifications[index] = updatedNotification;

      setNotifications(updatedNotifications);
    }
  };

  const deleteNotification = (notificationId: string) => {
    // Filtrera bort den notis som ska tas bort
    const updatedNotifications = notifications.filter((n) => n.id !== notificationId);
    setNotifications(updatedNotifications);
  };

  // const editNotification = (updatedNotification: Notification) => {
  //   const updatedNotifications = notifications.map((notification) =>
  //     notification.id === updatedNotification.id ? updatedNotification : notification
  //   );
  //   setNotifications(updatedNotifications);
  // };

  // const deleteNotification = (notificationId: string) => {
  //   const updatedNotifications = notifications.filter(
  //     (notification) => notification.id !== notificationId
  //   );
  //   setNotifications(updatedNotifications);
  // };

  return (
    <NotificationContext.Provider value={{selectedDate, notifications, addNotification, editNotification, deleteNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotificationContext must be used within a NotificationProvider');
  }
  return context;
};
