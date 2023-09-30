import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./Navigator";
import { useNotificationContext } from "../Contexts/NotificationContext";
import { useNavigation } from "@react-navigation/native";
import { NotificationModal } from "../Contexts/NotificationContext"
import * as Notifications from 'expo-notifications';
import { useUserContext } from "../Contexts/UserContext";


type Props = NativeStackScreenProps<RootStackParamList, "Notiser">;

export default function ActiveNotificationListScreen({ navigation }: Props) {
  const { user } = useUserContext();
  const { cancelAllScheduledNotifications } = useNotificationContext();

  // const [notifications, setNotifications] = useState<NotificationModal[]>([]); // Ange initialtyp här
  const { navigate } = useNavigation();
  // const [refresh, setRefresh] = useState(false);

  // useEffect(() => {
  //   getDeviceNotifications();
  // }, []);

  const handleEditNotification = (notificationId: string) => {
    navigation.navigate("Redigera", {id:notificationId});
  };
  
  

  // const removeAllDeviceNotifications = async () => {
  //   try {
  //     await Notifications.cancelAllScheduledNotificationsAsync();
  //     // Uppdatera komponenten för att visa att notiserna har tagits bort
  //     removeAllDeviceNotifications();
   
  //   } catch (error) {
  //     console.error("Fel vid borttagning av notiser:", error);
  //   }
  // };
  

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={cancelAllScheduledNotifications}>
        <Text>Radera alla notiser från enheten</Text>
      </TouchableOpacity>
      <FlatList
        data={user?.notifiCations || []}
        // extraData={refresh}
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


