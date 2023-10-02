import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./Navigator";
import { useUserContext } from "../Contexts/UserContext";
import { useMedicationContext } from "../Contexts/MedicationContext";
import { useNotificationContext } from "../Contexts/NotificationContext";
import { useTheme } from "../Contexts/ThemeContext";

type Props = NativeStackScreenProps<RootStackParamList, "Användarsidan">;

export default function UserScreen({ navigation }: Props) {
  const { user, removeMedicationFromUser } = useUserContext();
  const { notifications } = useNotificationContext();
  const theme = useTheme();

  if (user && user.medications) {
    user.medications.forEach((medication, index) => {
      console.log(
        `Medicin ${index + 1}: ID: ${medication.id}, Namn: ${medication.name}`
      );
    });
  }

  const handleRemoveMedication = (medicationId: string) => {
    removeMedicationFromUser(medicationId);
  };

  return (

    <View style={styles.container}>
      <Text style={styles.welcomeText}>Välkommen {user?.name}</Text>
      <Text></Text>
      <View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("Kamera");
        }}
      >
        <Text style={styles.buttonText}>Kamera</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("Fotobibliotek");
        }}
      >
        <Text style={styles.buttonText}>Foto från bibliotek</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (user && user.id) {
            navigation.navigate("Notiser", { id: user.id });
          }
        }}
      >
        <Text style={styles.buttonText}>Mina Notiser</Text>
      </TouchableOpacity>
      </View>

        <View style={styles.flatListContainer}>
      <FlatList
        data={user?.medications || []}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.medicationItem}>
            <Text style={styles.MedicationName}>{item.name}</Text>
            
            {
              <Image
                source={{ uri: item.url }}
                style={{ width: 190, height: 170, marginStart: 70, borderRadius: 10  }}
              />
            }
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                if (item.id) {
                  navigation.navigate("MedicationNote", { id: item.id });
                }
              }}
            >
              <Text style={styles.buttonText}>Ställ in påminnelse</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={[styles.button, { backgroundColor: "#C08081" }]}
            onPress={() => {
              if (user && item.id) {
                handleRemoveMedication(item.id); 
              }
            }}
          >
            <Text style={styles.buttonText}>Radera</Text>
          </TouchableOpacity>
          </View>
        )}
        extraData={user?.medications}
      />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  welcomeText: {
    padding: 15,
    color: "black",
    fontSize: 26,
    fontWeight: "bold",
    
    marginTop: 10,
  },
  button: {
    backgroundColor: "pink",
    padding: 15,
    alignItems: "center",
    margin: 5,
    borderRadius: 10,
    top: 5,
   
  },
  MedicationName: {
    padding: 10,
    color: "black",
    fontSize: 25,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  medicationItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  
  medicationContent: {
    flex: 1, 
  },
  flatListContainer: {
    flex: 1, 
    width: "95%",
    borderWidth: 1,      
    borderColor: "#ccc", 
    shadowOpacity: 0.10,      
    shadowRadius: 3.84,       
    elevation: 5, 
    margin: 10, 
  },
});
