import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type FirstScreenProps = {
  navigation: NavigationProp<any>;
};

const FirstScreen: React.FC<FirstScreenProps> = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Välkommen till Medicinminnesappen</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('Inställningar');
        }}
      >
        <Text style={styles.buttonText}>Kom igång</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'pink', // Bakgrundsfärg för knappen
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
});

export default FirstScreen;



