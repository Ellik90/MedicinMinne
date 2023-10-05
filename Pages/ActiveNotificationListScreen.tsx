import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  Modal,
  TextInput,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./Navigator";
import { useNotificationContext } from "../Contexts/NotificationContext";
import { useNavigation } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import { useUserContext } from "../Contexts/UserContext";
import { useTheme } from "../Contexts/ThemeContext";
import { useState } from "react";

type Props = NativeStackScreenProps<RootStackParamList, "Notiser">;

export default function ActiveNotificationListScreen({ navigation }: Props) {
  const { removeNotificationFromUser } = useUserContext();
  const { user, savecaregiverPhoneNumber } = useUserContext();
  const theme = useTheme();
  const {
    notifications,
    cancelAllScheduledNotifications,
    cancelScheduledNotificationById,
  } = useNotificationContext();
  const { navigate } = useNavigation();

  const handleDeleteNotification = async (
    notificationId: string | undefined
  ) => {
    if (notificationId) {
      try {
        console.log("id på den notisen som raderas här nu: ", notificationId);

        cancelScheduledNotificationById(notificationId);

        await Notifications.cancelScheduledNotificationAsync(notificationId);

        removeNotificationFromUser(notificationId);
      } catch (error) {
        console.error("Fel vid borttagning av notis:", error);
      }
    }
  };

  const [isAddCaregiverModalVisible, setAddCaregiverModalVisible] =
    useState(false);

  const toggleAddCaregiverModal = () => {
    setAddCaregiverModalVisible(!isAddCaregiverModalVisible);
  };

  const handleSaveCaregiver = async () => {
    if (user && user.caregiverPhoneNumber) {
      await savecaregiverPhoneNumber(user.caregiverPhoneNumber);
    }

    toggleAddCaregiverModal();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={toggleAddCaregiverModal}>
        <Text style={styles.buttonText}>Lägg till anhörig</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isAddCaregiverModalVisible}
        onRequestClose={toggleAddCaregiverModal}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.welcomeText}>Ange anhörigens telefonnummer:</Text>
          <TextInput
            placeholder="Telefonnummer"
            onChangeText={(text) => savecaregiverPhoneNumber(text)}
            value={user?.caregiverPhoneNumber || ""} 
            keyboardType="numeric"
          />

          <TouchableOpacity style={styles.button} onPress={handleSaveCaregiver}>
            <Text style={styles.buttonText}>Spara</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: theme.buttonColor }]}onPress={toggleAddCaregiverModal}>
            <Text style={styles.buttonText}>Avbryt</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.buttonColor }]}
        onPress={cancelAllScheduledNotifications}
      >
        <Text style={styles.buttonText}>Radera alla notiser</Text>
      </TouchableOpacity>
      <FlatList
        data={user?.notifiCations || []}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.medicationItem}>
            <Text style={styles.notificationText}>{item.name}</Text>
            <Text style={styles.notificationText}>{item.dose}</Text>
            <Text style={styles.notificationText}>{item.time}</Text>
            <Text style={styles.notificationText}>{item.comment}</Text>
            <Image
              source={{ uri: item.url }}
              style={{ width: 170, height: 150, borderRadius: 10 }}
            />
            <Text style={styles.notificationText}>
              Valt datum: {item.selectedDate?.toString()}
            </Text>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: theme.buttonColor }]}
              onPress={() => handleDeleteNotification(item.id)}
            >
              <Text style={styles.buttonText}>Radera notis</Text>
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
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
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
  welcomeText: {
    padding: 15,
    color: "black",
    fontSize: 26,
    fontWeight: "bold",

    marginTop: 10,
  },
  button: {
    backgroundColor: "pink",
    padding: 13,
    alignItems: "center",
    margin: 5,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  medicationItem: {
    margin: 10,

    borderWidth: 1,
    borderColor: "#ccc",
  },
  notificationText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});
