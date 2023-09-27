import React, { createContext, useContext, useState, ReactNode } from 'react';

type Notification = {
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
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Notification) => {
    setNotifications([...notifications, notification]);
    setSelectedDate(notification.selectedDate); 
    // setUser({ ...user, notifiCations: updatedNotifications });
    
  };

  return (
    <NotificationContext.Provider value={{selectedDate, notifications, addNotification }}>
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
