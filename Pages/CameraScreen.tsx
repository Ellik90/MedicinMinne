import React, { useState, useRef } from 'react';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { useMedicationContext } from '../Contexts/MedicationContext';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./Navigator";

type Props = NativeStackScreenProps<RootStackParamList, "Kamera">;

export default function CameraScreen({navigation}: Props): JSX.Element {

  const cameraRef = useRef<Camera | null>(null);
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [showRetakeButton, setShowRetakeButton] = useState(false);
  const { medication, addMedication } = useMedicationContext();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>Vi behöver din tillåtelse för att använda kameran</Text>
        <Button onPress={requestPermission} title="Bevilja tillstånd" />
      </View>
    );
  }

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  const handleTakePhoto = async () => {
    if (cameraRef.current) {
      const { uri } = await cameraRef.current.takePictureAsync();
      if (uri) {
        console.log(`Bild tagen: ${uri}`);
        setCapturedPhoto(uri);
        setShowRetakeButton(true);
      }
    }
  };

  const handleRetakePhoto = () => {
    setCapturedPhoto(null);
    setShowRetakeButton(false);
  };
  const handleUsePhoto = () => {
    if (capturedPhoto) {
        addMedication({ ...medication, url: capturedPhoto});
      console.log(capturedPhoto);
      navigation.navigate('MedicationInfoScreen');
    } else {
      alert('Du valde ingen bild.');
    }
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.text}>Byt kamera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
            <Text style={styles.text}>Ta kort</Text>
          </TouchableOpacity>
        </View>
      </Camera>

      {showRetakeButton && (
        <View style={styles.retakeButtonContainer}>
          <TouchableOpacity style={styles.retakeButton} onPress={handleRetakePhoto}>
            <Text style={styles.text}>Ta om</Text>
          </TouchableOpacity>
        </View>
      )}

      {capturedPhoto && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: capturedPhoto }} style={styles.image} />
        </View>
      )}

      {capturedPhoto && (
        <TouchableOpacity style={styles.usePhotoButton} onPress={handleUsePhoto}>
          <Text style={styles.text}>Använd foto</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1 / 1.4,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    width: '100%',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    marginHorizontal: 10,
  },
  retakeButtonContainer: {
    position: 'absolute',
    bottom: 107,
    left: 160,
    right: 10,
    alignItems: 'center',
  },
  retakeButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageContainer: {
    position: 'absolute',
    bottom: 150,
    left: 10,
    right: 10,
    alignItems: 'center',
  },
  image: {
    width: 390,
    height: 500,
    borderRadius: 10,
  },
  usePhotoButton: {
    position: 'absolute',
    bottom: 35,
    alignSelf: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
});



