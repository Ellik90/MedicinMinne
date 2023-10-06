import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import * as Permissions from "expo-permissions";
import { RootStackParamList } from "./Navigator";
import { useUserContext } from "../Contexts/UserContext";
import { RouteProp, useRoute } from "@react-navigation/native";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import {
  NotificationModal,
  useNotificationContext,
} from "../Contexts/NotificationContext";
import * as SMS from 'expo-sms';


import DateTimePicker from "@react-native-community/datetimepicker";

type Props = RouteProp<RootStackParamList, "MedicationNote">;

export default function MedicationNotificationScreen() {
  const { scheduleNotification } = useNotificationContext();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [repetition, setRepetition] = useState("Dagligen");
  const [showRepetitionPicker, setShowRepetitionPicker] = useState(false);
  const { user, setUser, removeMedicationFromUser } = useUserContext();
  const route = useRoute<Props>();
  const { id } = route.params;
  const medication = user?.medications?.find((m) => m.id === id);
  const { addNotificationToUser } = useUserContext();
  const { addNotification } = useNotificationContext();

  useEffect(() => {
    checkNotificationPermission();
  }, []);

  const checkNotificationPermission = async () => {
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);

    if (status !== "granted") {
      const { status: newStatus } = await Permissions.askAsync(
        Permissions.NOTIFICATIONS
      );

      if (newStatus !== "granted") {
        console.log("Användaren har nekat tillstånd för notiser");
      }
    }
  };

  const handleDateChange = (event: DateTimePickerEvent, date?: Date) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleConfirmNotification = async () => {
    if (selectedDate) {
      setDatePickerVisible(false);
      setShowRepetitionPicker(false);

      const newNotification: NotificationModal = {
        id: medication?.id || "",
        url: medication?.url || "",
        name: medication?.name || "",
        comment: medication?.comment || "",
        dose: medication?.dose || "",
        time: medication?.time || "",
        selectedDate: selectedDate,
      };

      const newNotificationId = await addNotification(
        newNotification,
        repetition
      );

      addNotificationToUser(newNotification, newNotificationId);
    if (user?.caregiverPhoneNumber) {
      const smsResult = await SMS.sendSMSAsync(
        [user.caregiverPhoneNumber],
        `Notis: ${newNotification.name} - ${newNotification.time}`,
        {
          attachments: [], 
        }
      );

      if (smsResult.result === 'sent') {
        console.log('SMS skickades framgångsrikt.');
      } else if (smsResult.result === 'cancelled') {
        console.log('Användaren avbröt SMS-sändningen.');
      } else {
        console.log('Status för SMS är okänt.');
      }
    }
  }
};

  const repetitionOptions = [
    "Dagligen",
    "Varannan dag",
    "Veckovis",
    "Månadsvis",
    "Varje minut",
    "var femte sekund",
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Välj tid för alarm</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setDatePickerVisible(true)}
      >
        <Text style={styles.buttonText}>Öppna DateTime-picker</Text>
      </TouchableOpacity>

      {isDatePickerVisible && (
        <DateTimePicker
          value={selectedDate || new Date()}
          mode="datetime"
          display="spinner"
          onChange={handleDateChange}
        />
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={() => setShowRepetitionPicker(!showRepetitionPicker)}
      >
        <Text style={styles.buttonText}>
          {showRepetitionPicker ? "Dölj Repetition" : "Visa Repetition"}
        </Text>
      </TouchableOpacity>

      {showRepetitionPicker && (
        <Picker
          selectedValue={repetition}
          onValueChange={(itemValue) => setRepetition(itemValue)}
          style={styles.picker}
        >
          {repetitionOptions.map((option, index) => (
            <Picker.Item key={index} label={option} value={option} />
          ))}
        </Picker>
      )}

      {selectedDate && (
        <TouchableOpacity
          style={styles.button}
          onPress={handleConfirmNotification}
        >
          <Text style={styles.buttonText}>Schemalägg påminnelse</Text>
        </TouchableOpacity>
      )}

      <View style={{ flex: 1, flexDirection: "column" }}>
        {selectedDate && (
          <Text style={styles.notificationText}>
            Notis schemalagd för {selectedDate?.toString()}
          </Text>
        )}
        <View style={styles.medicationInfoContainer}>
          <Text style={styles.notificationText}>{medication?.name}</Text>
          <Text style={styles.notificationText}>{medication?.dose}</Text>
          <Text style={styles.notificationText}>{medication?.time}</Text>
          <Text style={styles.notificationText}>{medication?.comment}</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: medication?.url }} />
        </View>
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
  notificationContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  notificationText: {
    fontSize: 20,
  },
  medicationInfoContainer: {
    marginBottom: 10,
    padding: 10,
  },
  image: {
    height: 200,
    width: 200,
    borderRadius: 10,
  },
  imageContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "pink",
    padding: 15,
    borderRadius: 5,
    marginTop: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  picker: {
    width: 200,
    marginTop: -5,
    margin: -50,
    padding: -50,
  },
  infoText: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
});
