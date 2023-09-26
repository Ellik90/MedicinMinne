import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./Navigator";
import { useUserContext } from "../Contexts/UserContext";
import { RouteProp, useRoute } from "@react-navigation/native";
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';

import DateTimePicker from '@react-native-community/datetimepicker'; // Importera DateTimePicker från community-paketet

type Props = RouteProp<RootStackParamList, "MedicationNote">;

export default function MedicationNotificationScreen() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false); // Lägg till state för att hantera synlighet av DateTimePicker
  const { user } = useUserContext();
  const route = useRoute<Props>();
  const { id } = route.params;
  const medication = user?.medications?.find((m) => m.id === id);

  useEffect(() => {
    checkNotificationPermission();
  }, []);

  const checkNotificationPermission = async () => {
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);

    if (status !== 'granted') {
      const { status: newStatus } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

      if (newStatus !== 'granted') {
        console.log('Användaren har nekat tillstånd för notiser');
      }
    }
  };

  const handleDateChange = (event: DateTimePickerEvent, date?: Date) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleConfirmNotification = () => {
    if (selectedDate) {
      scheduleNotification(selectedDate);
      setDatePickerVisible(false); // Stäng DateTimePicker när notisen bekräftas
    }
  };

  let notificationBody = 'Det är dags att ta din medicin!';
  if (medication) {
    notificationBody = `Dags att ta ${medication.time} medicinen ${medication.name}`; // Lägg till din logik för att visa bilden här
  }

  const scheduleNotification = async (date: Date) => {
    const now = new Date();
    const timeDiff = date.getTime() - now.getTime();

    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      })
    })

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Medicinpåminnelse",
        body: notificationBody,
      },
      trigger: {
        seconds: timeDiff / 1000,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Välj tid för alarm</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setDatePickerVisible(true)} // Visa DateTimePicker när knappen trycks
      >
        <Text style={styles.buttonText}>Öppna DateTime-picker</Text>
      </TouchableOpacity>

      {/* Använd DateTimePicker för att välja tid */}
      {isDatePickerVisible && (
        <DateTimePicker
          value={selectedDate || new Date()} // Defaultvärde är nuvarande tid om selectedDate är null
          mode="datetime"
          display="spinner"
          onChange={handleDateChange}
        />
      )}

      {selectedDate && (
        <TouchableOpacity
          style={styles.button}
          onPress={handleConfirmNotification} // Anropa funktionen när användaren bekräftar notisen
        >
          <Text>Bekräfta tid och schemalägg påminnelse</Text>
        </TouchableOpacity>
      )}

      <View style={{ flex: 1, flexDirection: "column" }}>
        {selectedDate && (
          <Text style={styles.notificationText}>
            Notis schemalagd för {selectedDate?.toString()}
          </Text>)}

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
});


{
  /* <Text style={styles.title}>Fyll i tid för alarm</Text>
<TouchableOpacity
  style={styles.button}
 
>
  <Text style={styles.buttonText}>Bekräfta notification</Text>
</TouchableOpacity> */
}
