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

type Props = NativeStackScreenProps<RootStackParamList, "Användarsidan">;

export default function UserScreen({ navigation }: Props) {
  const { user } = useUserContext();

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Välkommen {user?.name}</Text>
      <Text></Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("Fotobibliotek");
        }}
      >
        <Text style={styles.buttonText}>Foto från bibliotek</Text>
      </TouchableOpacity>

      <FlatList
        data={user?.medications || []} 
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.medicationItem}>
            <Text>{item.name}</Text>
            <Text>{item.comment}</Text>
            {
              <Image
                source={{ uri: item.url }}
                style={{ width: 100, height: 100 }}
              />
            }
              <TouchableOpacity
              style={styles.button}
              onPress={() => {
                // Navigera till formulärsidan och skicka med information om medicinen
                navigation.navigate('MedicationNote');
              }}
            >
              <Text style={styles.buttonText}>Ställ in påminnelse</Text>
            </TouchableOpacity>
          </View>
        )}
      />
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
    padding: 10,
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "pink",
    padding: 10,
    alignItems: "center",
    marginTop: 20, 
  },
  buttonText: {
    color: "white", 
    fontSize: 20,
    fontWeight: "bold",
  },
  medicationItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
});
