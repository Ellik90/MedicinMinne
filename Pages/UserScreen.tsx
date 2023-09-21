import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './Navigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Användarsidan'>;

export default function UserScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Välkommen</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('Fotobibliotek');
        }}
      >
        <Text style={styles.buttonText}>Foto från bibliotek</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', // Vit bakgrundsfärg
    alignItems: 'center',
    justifyContent: 'center', // Centrera både horisontellt och vertikalt
  },
  welcomeText: {
    padding: 10,
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: 'pink', // Bakgrundsfärg (rosa)
    padding: 10,
    alignItems: 'center',
    marginTop: 20, // Avstånd från föregående element
  },
  buttonText: {
    color: 'white', // Textfärg (vit)
    fontSize: 20,
    fontWeight: 'bold',
  },
});



