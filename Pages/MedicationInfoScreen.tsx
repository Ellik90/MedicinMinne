import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useMedicationContext } from "../Contexts/MedicationContext";
import { useUserContext } from "../Contexts/UserContext";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./Navigator";

type Props = NativeStackScreenProps<RootStackParamList, "MedicationInfoScreen">;

interface Medication {
  name: string;
  dose?: string | undefined;
  time?: string | undefined;
  comment?: string | undefined;
  url?: string | undefined;
}

export default function MedicationInfoScreen({ navigation }: Props) {
  const { medication, setMedication } = useMedicationContext();
  const [name, setName] = useState<string>(medication?.name || ""); // Lägg till typer för states
  const [dose, setDose] = useState<string>(medication?.dose || "");
  const [time, setTime] = useState<string>(medication?.time || "");
  const [comment, setComment] = useState<string>(medication?.comment || "");
  const { user, setUser, addMedicationToUser } = useUserContext();

  const handleNameChange = (newName: string) => {
    setName(newName);
    setMedication({ ...medication, name: newName });
  };

  const handleDoseChange = (newDose: string) => {
    setDose(newDose);
    setMedication({ ...medication, dose: newDose });
  };

  const handleTimeChange = (newTime: string) => {
    setTime(newTime);
    setMedication({ ...medication, time: newTime });
  };

  const handleCommentChange = (newComment: string) => {
    setComment(newComment);
    setMedication({ ...medication, comment: newComment });
  };

  const saveMedicationToUser = () => {
    if (medication) {
      addMedicationToUser(medication);
    }
    navigation.navigate("Användarsidan");
  };

  return (
    <ScrollView contentContainerStyle={styles.container} >
      <Text style={styles.text}>Medication Name:</Text>
      <TextInput
        style={styles.input}
        onChangeText={handleNameChange}
        value={name}
        placeholder="Namn"
      />

      <Text style={styles.text}>Dos:</Text>
      <TextInput
        style={styles.input}
        onChangeText={handleDoseChange}
        value={dose}
        placeholder="Dos"
      />

      <Text style={styles.text}>Klockslag:</Text>
      <TextInput
        style={styles.input}
        onChangeText={handleTimeChange}
        value={time}
        placeholder="Klockslag"
      />

      <Text style={styles.text}>Kommentar:</Text>
      <TextInput
        style={styles.input}
        onChangeText={handleCommentChange}
        value={comment}
        placeholder="Kommentar"
      />

      {medication?.url && (
        <Image source={{ uri: medication.url }} style={styles.image} />
      )}

      <TouchableOpacity style={styles.button} onPress={saveMedicationToUser}>
        <Text style={styles.buttonText}>Spara medicin</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  image: {
    width: 100,
    height: 100,
  },
  button: {
    backgroundColor: "pink",
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
