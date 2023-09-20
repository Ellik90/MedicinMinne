import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar  } from "react-native";
import { useNavigation, NavigationProp, useNavigationState } from "@react-navigation/native";


type UserScreenProps = {
  navigation: NavigationProp<any>;
};

const UserScreen: React.FC<UserScreenProps> = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  


  return (
    <View style={styles.container}>
     
      
    <Text>Välkommen</Text>

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
    backgroundColor: '#ffff',
    alignItems: 'center',
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

export default UserScreen;
