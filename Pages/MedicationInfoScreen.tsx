// Medication.ts
interface Medication {
    name: string;
    url?: string | undefined; // Gör url valfri
    comment?: string | undefined;
  }
  
  // MedicationInfoScreen.tsx
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
    const { user, setUser } = useUserContext();

    const handleTextChange = (newText: string) => {
        setText(newText); // Uppdatera den lokala texten när användaren ändrar texten
        setMedication({ ...medication, name: newText, comment: newText });
      };

        
      const saveMedicationToUser = () => {
        // Skapa en kopia av användarens mediciner eller en tom lista om användaren inte har några mediciner ännu
        const updatedMedications = user?.medications ? [...user.medications] : [];
      
        // Konvertera Medication till Medicin och lägg till den i listan
        if (medication) {
          const newMedicin: Medication = {
            name: medication.name || "",
            url: medication.url || "", // Du kan lägga till defaultvärde här om det behövs
            comment: medication.comment || "", // Du kan lägga till defaultvärde här om det behövs
          };
          updatedMedications.push(newMedicin);
        }
      
        // Uppdatera användaren med de uppdaterade medicinerna
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
  