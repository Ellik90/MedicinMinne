import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { RootStackParamList } from "./Navigator";
import { useUserContext } from "../Contexts/UserContext";
import { RouteProp, useRoute } from "@react-navigation/native";
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

import DateTimePicker from '@react-native-community/datetimepicker'; 

type Props = RouteProp<RootStackParamList, "MedicationNote">;

export default function MedicationNotificationScreen() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [repetition, setRepetition] = useState("Dagligen");
  const [showRepetitionPicker, setShowRepetitionPicker] = useState(false); 
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
      scheduleNotification(selectedDate, repetition); 
      setDatePickerVisible(false); 
      setShowRepetitionPicker(false); 
    }
  };

  const repetitionOptions = ["Dagligen", "Varannan dag", "Veckovis", "Månadsvis", "Varje minut"];

  let notificationBody = 'Det är dags att ta din medicin!';
  if (medication) {
    notificationBody = `Dags att ta ${medication.time} medicinen ${medication.name}`; 
  }

  const scheduleNotification = async (date: Date, repetition: string) => {
    const now = new Date();
    const timeDiff = date.getTime() - now.getTime();

    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      })
    });

    let repeatInterval = 0;

  if (repetition === "Dagligen") {
    repeatInterval = 24 * 60 * 60 * 1000; 
  } else if (repetition === "Varannan dag") {
    repeatInterval = 48 * 60 * 60 * 1000; 
  } else if (repetition === "Veckovis") {
    repeatInterval = 7 * 24 * 60 * 60 * 1000; 
  } else if (repetition === "Månadsvis") {
 
  } else if (repetition === "Varje minut") {
    repeatInterval = 60 * 1000; 
  }
    

    const scheduleNotification = () => {
      Notifications.scheduleNotificationAsync({
        content: {
          title: "Medicinpåminnelse",
          body: notificationBody,
        },
        trigger: null, 
      });
  
      setTimeout(scheduleNotification, repeatInterval);
    };
  
    setTimeout(scheduleNotification, timeDiff);
  };

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
  picker: {
    width: 200,
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
