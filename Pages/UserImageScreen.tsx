import React from "react";
import {
  View,
  StyleSheet,
} from "react-native";

import ImageViewer from "../Components/ImageViewer";
import * as ImagePicker from "expo-image-picker";
import ButtonImageViev from "../Components/ButtonImageViev";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./Navigator";
import { useImageUpload } from "../Contexts/ImageUploadContext";
import { useMedicationContext } from "../Contexts/MedicationContext";

const PlaceholderImage = require("../assets/background-imagee.png");

type Props = NativeStackScreenProps<RootStackParamList, "Fotobibliotek">;

export default function UserImageScreen({ navigation }: Props) {
  const { selectedImage, setSelectedImage } = useImageUpload();
  const { medication, addMedication } = useMedicationContext();

  const selectImage = async () => {
    if (selectedImage) {
      addMedication({ ...medication, url: selectedImage});
      console.log(selectedImage);
      navigation.navigate("MedicationInfoScreen");
    } else {
      alert("You did not select any image.");
    }
  }

  const handleSelectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
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
          onPress={handleSelectImage}
        />
        <ButtonImageViev  theme="primary" label="Use this photo"  onPress={selectImage} />
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

