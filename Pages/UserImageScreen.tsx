import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import {
  useNavigation,
  NavigationProp,
  useNavigationState,
} from "@react-navigation/native";
import ImageViewer from "../Components/ImageViewer";
import * as ImagePicker from "expo-image-picker";
import ButtonImageViev from "../Components/ButtonImageViev";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from './Navigator';

const PlaceholderImage = require("../assets/background-imagee.png");

type Props = NativeStackScreenProps<RootStackParamList, "Fotobibliotek">;

export default function UserImageScreen({ navigation }: Props) {
  const [selectedImage, setSelectedImage] = useState<string>('');

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
  
    if (!result.canceled) {
      // setSelectedImage(result.uri); // Uppdatera selectedImage med URI
      console.log('Bild URI:', result);
    } else {
      alert('Du valde inte någon bild.');
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
        <ButtonImageViev
          theme="primary"
          label="Choose a photo"
          onPress={pickImageAsync}
        />
        <ButtonImageViev label="Use this photo" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    alignItems: "center",
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
    alignItems: "center",
  },
});



