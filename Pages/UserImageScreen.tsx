import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar  } from "react-native";
import { useNavigation, NavigationProp, useNavigationState } from "@react-navigation/native";
import ImageViewer from "../Components/ImageViewer";
import * as ImagePicker from 'expo-image-picker';
import ButtonImageViev from '../Components/ButtonImageViev';

type UserScreenProps = {
  navigation: NavigationProp<any>;
};

const UserScreen: React.FC<UserScreenProps> = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const PlaceholderImage = require('../assets/background-imagee.png');

  const [selectedImage, setSelectedImage] = useState(null);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result);
    } else {
      alert('You did not select any image.');
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
      <ImageViewer
          placeholderImageSource={PlaceholderImage}
          selectedImage={selectedImage}
        />
      </View>
      <View style={styles.footerContainer}>
      <ButtonImageViev theme="primary" label="Choose a photo" onPress={pickImageAsync} />
        <ButtonImageViev label="Use this photo" />
      </View>
      


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
});

export default UserScreen;
