import React, { createContext, useContext, useState, ReactNode } from "react";
import { User, users } from "../Data";
import { storeData, getData } from "../asyncStorage";
import { Medication } from "./MedicationContext";
import { NotificationModal } from "./NotificationContext";

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  userLogIn: (password: string, username: string) => Promise<boolean>;
  addUser: (user: User | null) => Promise<void>;
  addMedicationToUser: (medication: Medication) => void;
  addNotificationToUser: (
    notification: NotificationModal,
    newNotificationId: string
  ) => Promise<void>;
  removeNotificationFromUser: (id: string) => Promise<void>;
  removeMedicationFromUser: (medicationId: string) => void;
  savecaregiverPhoneNumber: (caregiverPhoneNumber: string) => Promise<void>;
  getUser: () => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  async function userLogIn(password: string, username: string) {
    const userFromAsyncStorage = await getData();

    console.log("userfromasyncstorage:", userFromAsyncStorage);
    if (
      userFromAsyncStorage?.password == password &&
      userFromAsyncStorage?.username == username
    ) {
      console.log(userFromAsyncStorage);
      setUser(userFromAsyncStorage);
      return true;
    }
    return false;
  }

  async function getUser() {
    const userFromAsyncStorage = await getData();

    console.log("userfromasyncstorage:", userFromAsyncStorage);
    
      console.log(userFromAsyncStorage);
      if (userFromAsyncStorage)
      setUser(userFromAsyncStorage);
    }

  async function savecaregiverPhoneNumber(
    caregiverPhoneNumber: string | undefined,
  ) {
   
  }
  

  async function addUser(user: User | null) {
    if (user != null) {
      const milliseconds = Date.now().toString();
      const id = milliseconds.slice(-4);
      user.id = id;
      setUser(user);
      await storeData(user);
    }
  }

  async function addMedicationToUser(medication: Medication) {
    if (user) {
      if (medication) {
        user.medications.push(medication as never);
        await addUser(user);
      }
    }
  }

  async function removeMedicationFromUser(medicationId: string) {
    if (user) {
      user.medications.forEach((med, index) => {
        if (med.id === medicationId) {
          user.medications.splice(index, 1);
        }
      });
      await addUser(user);
    }
  }

  async function addNotificationToUser(
    notification: NotificationModal,
    newNotificationId: string
  ) {
    if (user) {
      if (notification) {
        notification.id = newNotificationId;
        console.log(
          "nu får notisen nya idt till async storage:",
          newNotificationId
        );
        user.notifiCations.push(notification as never);
        await addUser(user);
      }
    }
  }

  async function removeNotificationFromUser(id: string) {
    if (user) {
      const updatedNotifications = user.notifiCations.filter(
        (n) => n.id !== id
      );
      user.notifiCations = updatedNotifications;
      await addUser(user);
    }
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        userLogIn,
        addUser,
        addMedicationToUser,
        addNotificationToUser,
        removeNotificationFromUser,
        removeMedicationFromUser,
        savecaregiverPhoneNumber,
        getUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext måste användas inom en UserProvider");
  }
  return context;
};
