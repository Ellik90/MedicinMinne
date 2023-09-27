import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./Navigator";
import { useUserContext } from "../Contexts/UserContext";
import { useNotificationContext } from "../Contexts/NotificationContext";
import { useNavigation } from "@react-navigation/native";
import * as Notifications from 'expo-notifications';

type Props = NativeStackScreenProps<RootStackParamList, "Redigera">;

export default function EditNotificationScreen({ navigation }: Props) {
  const { userLogIn } = useUserContext();
  const [loginName, setLoginName] = useState("");
  const [passWord, setPassWord] = useState("");
  const { notifications, selectedDate, editNotification, deleteNotification } = useNotificationContext();
  const { navigate } = useNavigation();

  useEffect(() => {
    getDeviceNotifications();
  }, []);

  const getDeviceNotifications = async () => {
    try {
      const notifications = await Notifications.getAllScheduledNotificationsAsync();
    } catch (error) {
      console.error("Fel vid hämtning av notiser:", error);
    }
  };

  const handleEditNotification = (notificationId: string) => {
    // ...
  };

  const handleDeleteNotification = async (notificationId: string) => {
    try {
      deleteNotification(notificationId);

      await Notifications.dismissNotificationAsync(notificationId);
    } catch (error) {
      console.error("Fel vid borttagning av notis:", error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications || []}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.medicationItem}>
            <Text>{item.name}</Text>
            <Text>{item.dose}</Text>
            <Text>{item.time}</Text>
            <Text>{item.comment}</Text>
            <Image
              source={{ uri: item.url }}
              style={{ width: 100, height: 100 }}
            />
            <Text>Valt datum: {item.selectedDate?.toString()}</Text>
            <TouchableOpacity onPress={() => handleEditNotification(item.id)}>
              <Text>Redigera</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeleteNotification(item.id)}>
              <Text>Radera</Text>
            </TouchableOpacity>
          </View>
        )}
      />
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


