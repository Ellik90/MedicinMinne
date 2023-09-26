
interface Medication {
    name: string;
    url?: string | undefined; 
    comment?: string | undefined;
  }

  import React, { useState } from "react";
  import { View, TextInput, Text, Image, Button } from "react-native";
  import { useMedicationContext } from "../Contexts/MedicationContext";
import { useUserContext } from "../Contexts/UserContext";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./Navigator";

type Props = NativeStackScreenProps<RootStackParamList, "MedicationInfoScreen">;

  export default function MedicationInfoScreen({navigation}: Props) {
    const { medication, setMedication } = useMedicationContext();
    const [text, setText] = useState(medication?.name || ''); // Lokal state för texten
    const { user, addUser, setUser} = useUserContext();

    const handleTextChange = (newText: string) => {
        setText(newText); 
        setMedication({ ...medication,id:medication?.id, name: newText, comment: newText });
      };

        
      const saveMedicationToUser = () => {
        const updatedMedications = user?.medications ? [...user.medications] : [];
      
 
        if (medication) {
          console.log(updatedMedications);
          updatedMedications.push(medication);
        }
      
        
        setUser({ ...user, medications: updatedMedications });
        navigation.navigate("Användarsidan");
      };
      
      
    return (
      <View>
        <Text>Medication Name:</Text>
        
        <TextInput
          onChangeText={handleTextChange}
          value={text}
          placeholder="Namn"
        />
    <TextInput
          onChangeText={handleTextChange}
          value={text}
          placeholder="Kommentar"
        />

        {/* <Text>{medication?.comment}</Text>
        {medication?.url && (
        <Image source={{ uri: medication.url }} style={{ width: 100, height: 100 }} />
      )} */}

      <Button title="Spara medicin" onPress={saveMedicationToUser}></Button>
      </View>
    );
  }
  