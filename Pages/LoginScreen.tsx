import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./Navigator";

type Props = NativeStackScreenProps<RootStackParamList, "Inloggning">;

export default function LoginScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("Användarsidan");
        }}
      >
        <Text style={styles.buttonText}>Bekräfta</Text>
      </TouchableOpacity>
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
    backgroundColor: "pink", // Bakgrundsfärg för knappen
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
});
