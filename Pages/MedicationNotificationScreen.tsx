import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions'; // Importera Permissions från Expo

export default function MedicationNotificationScreen() {
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    // Kontrollera användarens tillstånd för notiser vid komponentens montering
    checkNotificationPermission();
  }, []);

  const checkNotificationPermission = async () => {
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);

    if (status !== 'granted') {
      // Om användaren inte har gett tillstånd, fråga om det
      const { status: newStatus } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

      if (newStatus !== 'granted') {
        console.log('Användaren har nekat tillstånd för notiser');
      }
    }
  };

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (date: Date) => {
    setSelectedDate(date);
    hideDatePicker();
    scheduleNotification(date);
  };

  const scheduleNotification = async (date: Date) => {
    const now = new Date();
    const timeDiff = date.getTime() - now.getTime();

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Din påminnelse',
        body: 'Det är dags att ta din medicin!',
      },
      trigger: {
        seconds: timeDiff / 1000,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Välj tid för alarm</Text>
      <TouchableOpacity style={styles.button} onPress={showDatePicker}>
        <Text style={styles.buttonText}>Öppna DateTime-picker</Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

      {selectedDate && (
        <Text style={styles.notificationText}>
          Notis schemalagd för {selectedDate.toString()}
        </Text>
      )}
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
