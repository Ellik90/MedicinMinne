import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { getData } from '../asyncStorage';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
// import { useUserContext } from './UserContext';
export type NotificationModal = {
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
  removeNotificationById: (notificationId: string) => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [notifications, setNotifications] = useState<NotificationModal[]>([]);
  // const { removeNotificationFromUser } = useUserContext();


  
  // useEffect(() => {
  //   // Hämta data från async storage när komponenten laddas
  //   const fetchData = async () => {
  //     const storedData = await getData(); // Anpassa getData till ditt behov
  //     if (storedData) {
  //       // Om det finns lagrad data, uppdatera state
  //       setNotifications(storedData.notifiCations);
  //       // setSelectedDate(storedData.selectedDate);
  //     }
  //   };

  //   fetchData(); // Anropa fetchData vid komponentladdning
  // }, []);

  const addNotification = (notification: NotificationModal) => {
    setNotifications([...notifications, notification]);
    setSelectedDate(notification.selectedDate); 

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

  const removeNotificationById = async (notificationId: string) => {
    try {
      // Cancel the notification by its identifier
      await Notifications.cancelScheduledNotificationAsync(notificationId);
      // Remove the notification from your user context or data store
      // removeNotificationFromUser(notificationId);
    } catch (error) {
      // Handle any errors that occur during notification deletion
      console.error(`Error deleting notification: ${error}`);
    }
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
    <NotificationContext.Provider value={{selectedDate, notifications, addNotification, editNotification, deleteNotification, removeNotificationById }}>
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
