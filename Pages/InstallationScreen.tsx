import React, { useState } from 'react';
import { View, ScrollView, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './Navigator';
import { useUserContext,  } from '../Contexts/UserContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Registrering'>;

export default function InstallationScreen({ navigation }: Props) {
  const { user, addUser } = useUserContext();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [personnummer, setPersonnummer] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [logInName, setLogInName] = useState('');
  const [passWord, setPassWord] = useState('');
 

  const handleSubmit = () => {
    const newUser = {
      id: user?.id ?? "", // Behåll befintligt användar-ID om det finns
      name: `${firstName} ${lastName}`,
      username: `${logInName}`,
      phoneNumber:`${phoneNumber}`,
      password: `${passWord}`,
      personnummer:`${personnummer}`,
      medications: [], 
      notifiCations:[]
    };

   addUser(newUser);
    navigation.navigate('Hem');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}>Förnamn:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setFirstName(text)}
        value={firstName}
      />

      <Text style={styles.text}>Efternamn:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setLastName(text)}
        value={lastName}
      />

      <Text style={styles.text}>Personnummer:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setPersonnummer(text)}
        value={personnummer}
      />

      <Text style={styles.text}>Telefonnummer:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setPhoneNumber(text)}
        value={phoneNumber}
      />
      <Text style={styles.text}>Välj Användarnamn:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setLogInName(text)}
        value={logInName}
      />

      <Text style={styles.text}>Välj Lösenord:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setPassWord(text)}
        value={passWord}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>Registrera</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: 'pink', // Bakgrundsfärg (rosa)
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white', // Textfärg (vit)
    fontSize: 20,
    fontWeight: 'bold',
  },
});



