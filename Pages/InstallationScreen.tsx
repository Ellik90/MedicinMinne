import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './Navigator';


type Props = NativeStackScreenProps<RootStackParamList, 'Inställningar'>;

export default function InstallationScreen({navigation}: Props){

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [personnummer, setPersonnummer] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [PassWord, setPassWord] = useState('');

  const handleSubmit = () => {
    // Skicka data till en API eller utför önskade åtgärder med användarens data
    console.log('Förnamn:', firstName);
    console.log('Efternamn:', lastName);
    console.log('Personnummer:', personnummer);
    console.log('Telefonnummer:', phoneNumber);
    console.log('Lösenord:', PassWord);
  };

  return (
    <View style={styles.container}>
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

<Text style={styles.text}>Lösenord:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setPassWord(text)}
        value={phoneNumber}
      />

      

<TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('Användarsidan');
        }}
      >
        <Text style={styles.buttonText}>Registrera</Text>
      </TouchableOpacity>


    </View>
  );
};

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



