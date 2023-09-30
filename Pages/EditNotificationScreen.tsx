import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { RootStackParamList } from "./Navigator";
import { useUserContext } from "../Contexts/UserContext";
import * as Notifications from 'expo-notifications';
import { RouteProp, useRoute } from "@react-navigation/native";

type Props = RouteProp<RootStackParamList, "Redigera">;

export default function EditNotificationScreen() {
  const { removeNotificationFromUser } = useUserContext();
  const { user } = useUserContext();
  const route = useRoute<Props>();
  const { id } = route.params;
  const notificationToEdit = user?.notifiCations.find((n) => n.id === id);
  const [notificationId, setNotificationId] = useState<string | null>(null);


  //anropas av ta bort alla-knapp i ACTIVENOTIFICATIONLIST... o denna sidan bort 
  const handleDeleteNotification = async (notificationId: string | undefined) => {
    if (notificationId) {
      await Notifications.cancelScheduledNotificationAsync(notificationId);
      // Ta bort notis-ID från state eller databasen
      setNotificationId(null);
   
        // Remove the notification from your user context or data store
        removeNotificationFromUser(notificationId);
    }
        
   
  };

  // const cancelScheduledNotification = async () => {
  //   if (notificationId) {
  //     await Notifications.cancelScheduledNotificationAsync(notificationId);
  //     setNotificationId(null); // Återställ notis-ID
  //   }
  // };

  const removeNotification = async () => {
    if (notificationId) {
      await Notifications.cancelScheduledNotificationAsync(notificationId);
      // Ta bort notis-ID från state eller databasen
      setNotificationId(null);
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.medicationItem}>
        <Text>{notificationToEdit?.name}</Text>
        {/* Other notification details */}
        {/* {notificationId && (
        <TouchableOpacity
          style={styles.button}
          onPress={cancelScheduledNotification}
        >
          <Text>Radera notis</Text>
        </TouchableOpacity>
      )} */}
        <TouchableOpacity onPress={() => handleDeleteNotification(notificationToEdit?.id)}>
          <Text>Radera</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "pink",
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  medicationItem: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  notificationText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
});


