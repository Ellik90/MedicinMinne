import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  Button,
} from "react-native";
import * as Notifications from "expo-notifications";
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

import DateTimePicker from "@react-native-community/datetimepicker";

type Props = RouteProp<RootStackParamList, "MedicationNote">;

export default function MedicationNotificationScreen() {
  const  { scheduleNotification } = useNotificationContext()
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [repetition, setRepetition] = useState("Dagligen");
  const [showRepetitionPicker, setShowRepetitionPicker] = useState(false);
  const { user, setUser } = useUserContext();
  const route = useRoute<Props>();
  const { id } = route.params;
  const medication = user?.medications?.find((m) => m.id === id);
  const { addNotificationToUser } = useUserContext();
  const {addNotification } = useNotificationContext();
  const [notificationText, setNotificationText] = useState("");
  const [notificationId, setNotificationId] = useState<string | null>(null); // Håll reda på notisens ID
  const [repeatInterval, setRepeatInterval] = useState<number | undefined>(
    undefined
  ); // Deklarera repeatInterval och setRepeatInterval

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
      // await scheduleNotification(selectedDate, repetition);
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

      addNotificationToUser(newNotification);
      addNotification(newNotification, repetition);
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

  // let notificationBody = "Det är dags att ta din medicin!";
  // if (medication) {
  //   notificationBody = `Dags att ta ${medication.time} medicinen ${medication.name}`;
  // }

  // const scheduleNotification = async (date: Date, repetition: string) => {
  //   const now = new Date();
  //   const timeDiff = date.getTime() - now.getTime();

  //   Notifications.setNotificationHandler({
  //     handleNotification: async () => ({
  //       shouldShowAlert: true,
  //       shouldPlaySound: true,
  //       shouldSetBadge: false,
  //     }),
  //   });

  //   let repeatInterval = 0;

  //   if (repetition === "Dagligen") {
  //     repeatInterval = 24 * 60 * 60 * 1000;
  //   } else if (repetition === "Varannan dag") {
  //     repeatInterval = 48 * 60 * 60 * 1000;
  //   } else if (repetition === "Veckovis") {
  //     repeatInterval = 7 * 24 * 60 * 60 * 1000;
  //   } else if (repetition === "Månadsvis") {
  //     // Lägg till kod här för att hantera månadsvis repetition
  //   } else if (repetition === "Varje minut") {
  //     repeatInterval = 60 * 1000;
  //   } else if (repetition === "var femte sekund") {
  //     repeatInterval = 5 * 1000;
  //   }

  //   // Beräkna när notisen ska visas för första gången
  //   const firstNotificationTime = new Date(date.getTime() - timeDiff);

  //   // Schemalägg notisen och spara notis-ID
  //   const notificationId = await Notifications.scheduleNotificationAsync({
  //     content: {
  //       title: "Medicinpåminnelse",
  //       body: notificationBody,
  //     },
  //     trigger: {
  //       seconds: repeatInterval / 1000,
  //       repeats: repeatInterval > 0,
  //     },
  //   });

  //   // Använd notis-ID för att spara notisen i state eller databas
  //   setNotificationId(notificationId);
  // };

  // const cancelScheduledNotification = async () => {
  //   if (notificationId) {
  //     await Notifications.cancelScheduledNotificationAsync(notificationId);
  //     setNotificationId(null); // Återställ notis-ID
  //   }
  // };
  // const cancelAllScheduledNotifications = async () => {
  //   await Notifications.cancelAllScheduledNotificationsAsync();
  // };


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
          <Text>Bekräfta tid och schemalägg påminnelse</Text>
        </TouchableOpacity>
      )}

      {/* {notificationId && (
        <TouchableOpacity
          style={styles.button}
          onPress={cancelScheduledNotification}
        >
          <Text>Radera notis</Text>
        </TouchableOpacity>
        
      )}
        <TouchableOpacity
          style={styles.button}
          onPress={cancelAllScheduledNotifications}
        >
          <Text>Radera alla notiser</Text>
        </TouchableOpacity> */}

      <View style={{ flex: 1, flexDirection: "column" }}>
        {selectedDate && (
          <Text style={styles.notificationText}>
            Notis schemalagd för {selectedDate?.toString()}
          </Text>
        )}

        <Text>{medication?.name}</Text>
        <Text>{medication?.dose}</Text>
        <Text>{medication?.time}</Text>
        <Text>{medication?.comment}</Text>
        <Image
          source={{ uri: medication?.url }}
          style={{ height: 100, width: 100 }}
        />
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
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  notificationText: {
    marginTop: 20,
    fontSize: 18,
  },
  picker: {
    width: 200,
  },
});
