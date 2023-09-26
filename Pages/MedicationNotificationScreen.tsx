import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./Navigator";
import { useUserContext } from "../Contexts/UserContext";
import { RouteProp, useRoute } from "@react-navigation/native";

type Props = RouteProp<RootStackParamList, "MedicationNote">;

export default function MedicationNotificationScreen() {
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
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
        <View style={{flex:1, flexDirection:"column"}}>
        <Text style={styles.notificationText}>
          Notis schemalagd för {selectedDate.toString()}
        </Text>
        <Text>{medication?.name}</Text>
        <Text>{medication?.dose}</Text>
        <Text>{medication?.time}</Text>
        <Text>{medication?.comment}</Text>
        <Image source={{ uri: medication?.url }} style={{height:100, width:100}} />
        </View>
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
