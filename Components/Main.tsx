import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const Main: React.FC = () => {
  return (
    <View style={styles.main}>
      <Text style={styles.title}>
        Välkommen till Medicinminnesappen
      </Text>


      <TouchableOpacity
        onPress={() => {
          // Lägg till navigering till nästa skärm här
        }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Kom igång</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  
});

export default Main;
