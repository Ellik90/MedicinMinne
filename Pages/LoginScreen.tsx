import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./Navigator";
import { useUserContext } from "../Contexts/UserContext";

type Props = NativeStackScreenProps<RootStackParamList, "Inloggning">;

export default function LoginScreen({ navigation }: Props) {
  const {  userLogIn } = useUserContext();
  const [loginName, setLoginName] = useState("");
  const [passWord, setPassWord] = useState("");

  const handleLogin = async () => {
    const loggedIn = await userLogIn(passWord, loginName);
    console.log("username i login:", loginName,"password i login:", passWord);
    if (loggedIn) {
      navigation.navigate("Användarsidan");
    } else {
      alert("Inloggningen misslyckades. Kontrollera användarnamn och lösenord.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setLoginName(text)}
        value={loginName}
        placeholder="Användarnamn"
      />

      <TextInput
        style={styles.input}
        onChangeText={(text) => setPassWord(text)}
        value={passWord}
        placeholder="Lösenord"
        secureTextEntry
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Bekräfta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1/2,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "pink",
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
});

