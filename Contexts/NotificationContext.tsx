import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { getData } from '../asyncStorage';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { useUserContext } from './UserContext';
import { Medication, useMedicationContext } from './MedicationContext';
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
  addNotification: (notification: NotificationModal, repetition:string) => void;
  editNotification: (updatedNotification: NotificationModal) => void;
  deleteNotification: (notificationId: string) => void;
  
  // removeNotificationById: (notificationId: string) => void;
  scheduleNotification: (date: Date, repetition: string, notificationBody:string) => void; 
  cancelAllScheduledNotifications: () => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [notifications, setNotifications] = useState<NotificationModal[]>([]);
  const [notificationId, setNotificationId] = useState<string | null>(null);
  const { user } = useUserContext();
  const { medication } = useMedicationContext();
 
  const scheduleNotification = async (date: Date, repetition: string, notificationBody:string) => {
    const now = new Date();
    const timeDiff = date.getTime() - now.getTime();

    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });

    let repeatInterval = 0;

    if (repetition === "Dagligen") {
      repeatInterval = 24 * 60 * 60 * 1000;
    } else if (repetition === "Varannan dag") {
      repeatInterval = 48 * 60 * 60 * 1000;
    } else if (repetition === "Veckovis") {
      repeatInterval = 7 * 24 * 60 * 60 * 1000;
    } else if (repetition === "Månadsvis") {
      // Lägg till kod här för att hantera månadsvis repetition
    } else if (repetition === "Varje minut") {
      repeatInterval = 60 * 1000;
    } else if (repetition === "var femte sekund") {
      repeatInterval = 5 * 1000;
    }

    const firstNotificationTime = new Date(date.getTime() - timeDiff);

    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Medicinpåminnelse",
        
        body: notificationBody,
      },
      trigger: {
        seconds: repeatInterval / 1000,
        repeats: repeatInterval > 0,
      },
    });

    setNotificationId(notificationId);
  };

   const cancelScheduledNotification = async () => {
    if (notificationId) {
      await Notifications.cancelScheduledNotificationAsync(notificationId);
      setNotificationId(null); // Återställ notis-ID
    }
  };


 

  // const cancelScheduledNotification = async (notificationId: string) => {
  //   if (notificationId) {
  //     await Notifications.cancelScheduledNotificationAsync(notificationId);
  //     setNotificationId(null);
  //   }
  // };

  const cancelAllScheduledNotifications = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
  };

  const addNotification = (notification: NotificationModal, repetition:string) => {
    console.log("notis in i add not..:", notification.name);
    const notificationBody = `Dags att ta ${notification?.time} medicinen ${notification?.name}`
    setNotifications([...notifications, notification]);
    setSelectedDate(notification.selectedDate);
    scheduleNotification(notification.selectedDate, repetition, notificationBody);
  };

  // const editNotification = (updatedNotification: NotificationModal) => {
  //   const index = notifications.findIndex(
  //     (n) => n.id === updatedNotification.id
  //   );

  //   if (index !== -1) {
  //     const updatedNotifications = [...notifications];
  //     updatedNotifications[index] = updatedNotification;

  //     setNotifications(updatedNotifications);
  //     const notificationId = updatedNotification.id;
  //     scheduleNotification(updatedNotification.selectedDate, "Dagligen", notificationId);
  //   }
  // };



  


  // const addNotification = (notification: NotificationModal) => {
  //   setNotifications([...notifications, notification]);
  //   setSelectedDate(notification.selectedDate); 

  // };

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

  // const deleteNotification = (notificationId: string) => {
 
  //   const updatedNotifications = notifications.filter((n) => n.id !== notificationId);
  //   setNotifications(updatedNotifications);
  // };
  const deleteNotification = (notificationId: string) => {
    const updatedNotifications = notifications.filter(
      (n) => n.id !== notificationId
    );
    setNotifications(updatedNotifications);
    cancelScheduledNotification();
  };


  // const removeNotificationById = async (notificationId: string) => {
  //   try {
  //     await Notifications.cancelScheduledNotificationAsync(notificationId);
  //   } catch (error) {
  //     console.error(`Error deleting notification: ${error}`);
  //   }
  // };
  // const removeNotificationById = async (notificationId: string) => {
  //   try {
    
  //     await Notifications.cancelScheduledNotificationAsync(notificationId);
    
  //   } catch (error) {
     
  //     console.error(`Error deleting notification: ${error}`);
  //   }
  // };



  return (
    <NotificationContext.Provider value={{selectedDate, notifications, addNotification, editNotification, deleteNotification, scheduleNotification, cancelAllScheduledNotifications   }}>
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
