import React, { useState } from "react";
import { View, TextInput, Text, Image, Button } from "react-native";
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
  const [name, setName] = useState(medication?.name || '');
  const [dose, setDose] = useState(medication?.dose || '');
  const [time, setTime] = useState(medication?.time || '');
  const [comment, setComment] = useState(medication?.comment || '');
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
    if(medication){
      addMedicationToUser(medication);
    }
    navigation.navigate("Användarsidan");
  };

  return (
    <View>
      <Text>Medication Name:</Text>
      <TextInput
        onChangeText={handleNameChange}
        value={name}
        placeholder="Namn"
      />
      <TextInput
        onChangeText={handleDoseChange}
        value={dose}
        placeholder="Dos"
      />
      <TextInput
        onChangeText={handleTimeChange}
        value={time}
        placeholder="Klockslag"
      />
      <TextInput
        onChangeText={handleCommentChange}
        value={comment}
        placeholder="Kommentar"
      />

      {medication?.url && (
        <Image source={{ uri: medication.url }} style={{ width: 100, height: 100 }} />
      )}

      <Button title="Spara medicin" onPress={saveMedicationToUser}></Button>
    </View>
  );
}
  