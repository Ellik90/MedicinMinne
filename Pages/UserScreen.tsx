import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './Navigator';
import { useUserContext } from '../Contexts/UserContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Användarsidan'>;

export default function UserScreen({ navigation }: Props) {
  const { user } = useUserContext();

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

      <FlatList
        data={user?.medications || []} // Användarens mediciner som datakälla
        keyExtractor={(item, index) => index.toString()} // Unika nycklar för varje medicin
        renderItem={({ item }) => (
          <View style={styles.medicationItem}>
            <Text>{item.name}</Text>
            <Text>{item.comment}</Text>
            {<Image source={{ uri: item.url }} style={{ width: 100, height: 100 }} />}
          </View>
        )}
      />


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
  medicationItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
});



