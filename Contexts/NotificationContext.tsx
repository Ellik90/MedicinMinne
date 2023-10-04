import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import * as Notifications from 'expo-notifications';

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
  addNotification: (notification: NotificationModal, repetition:string) => Promise<string>;
  editNotification: (updatedNotification: NotificationModal) => void;
  cancelScheduledNotificationById : (notificationId: string) => void;
 
  scheduleNotification: (date: Date, repetition: string, notificationBody:string, notificationId: string) => Promise<string>; 
  cancelAllScheduledNotifications: () => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [notifications, setNotifications] = useState<NotificationModal[]>([]);
  const [notificationId, setNotificationId] = useState<string | null >(null);
  
  const scheduleNotification = async (date: Date, repetition: string, notificationBody:string) => {
    const now = new Date();

    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });

    let repeatInterval = 0;
    if (repetition === "Dagligen") {
      repeatInterval = 24 * 60 * 60 * 1000
    } else if (repetition === "Varannan dag") {
      repeatInterval = 48 * 60 * 60 * 1000;
    } else if (repetition === "Veckovis") {
      repeatInterval = 7 * 24 * 60 * 60 * 1000;
    } else if (repetition === "Månadsvis") {
    } else if (repetition === "Varje minut") {
      repeatInterval = 60 * 1000;
    }
    
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

    console.log("Notifikationsid", notificationId)
    setNotificationId(notificationId);
    return notificationId;
  };

  const cancelAllScheduledNotifications = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
  };

  const addNotification = (notification: NotificationModal, repetition:string) => {
    console.log("notis in i add not..:", notification.name);
    const notificationBody = `Dags att ta ${notification?.time} medicinen ${notification?.name}`
    setNotifications([...notifications, notification]);
    setSelectedDate(notification.selectedDate);
    const newNotificationId = scheduleNotification(notification.selectedDate, repetition, notificationBody);
    return newNotificationId;
  };


  const editNotification = (updatedNotification: NotificationModal) => {
    const index = notifications.findIndex((n) => n.id === updatedNotification.id);

    if (index !== -1) {
      const updatedNotifications = [...notifications];
      updatedNotifications[index] = updatedNotification;

      setNotifications(updatedNotifications);
    }
  };


  const  cancelScheduledNotificationById  = async (notificationId: string) => {
    try {
      if (notificationId) {
        console.log('Raderar en notis')
        await Notifications.cancelScheduledNotificationAsync(notificationId);
        const updatedNotifications = notifications.filter((n) => n.id !== notificationId);
        setNotifications(updatedNotifications);
      }
    } catch (error) {
      console.error(`Error deleting notification: ${error}`);
    }
  };
  
  return (
    <NotificationContext.Provider value={{selectedDate, notifications, addNotification, editNotification,  cancelScheduledNotificationById , scheduleNotification, cancelAllScheduledNotifications   }}>
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

