import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./Navigator";
import { useNotificationContext } from "../Contexts/NotificationContext";
import { useNavigation } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import { useUserContext } from "../Contexts/UserContext";


type Props = NativeStackScreenProps<RootStackParamList, "Notiser">;

export default function ActiveNotificationListScreen({ navigation }: Props) {
  const { removeNotificationFromUser } = useUserContext();
  const { user } = useUserContext();
 
  const { notifications, cancelAllScheduledNotifications,  cancelScheduledNotificationById } =
    useNotificationContext();
  const { navigate } = useNavigation();

  
  const handleDeleteNotification = async (notificationId: string | undefined) => {
    if (notificationId) {
      try {
       
        console.log("id på den notisen som raderas här nu: ", notificationId);
 
        cancelScheduledNotificationById (notificationId);

        await Notifications.cancelScheduledNotificationAsync(notificationId);
       
         removeNotificationFromUser(notificationId);
      
      } catch (error) {
        console.error("Fel vid borttagning av notis:", error);
      }
    }
  };



  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={cancelAllScheduledNotifications}>
        <Text>Radera alla notiser från enheten</Text>
      </TouchableOpacity>
      <FlatList
        data={user?.notifiCations || []}
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

            <TouchableOpacity
                style={styles.button}
                onPress={() => handleDeleteNotification(item.id)}
              >
                <Text>Radera notis</Text>
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
