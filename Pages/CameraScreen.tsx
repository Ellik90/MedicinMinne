import React, { useState, useRef } from 'react';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Camera, CameraType } from 'expo-camera';

export default function App(): JSX.Element {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef = useRef<Camera | null>(null);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);

  const [showRetakeButton, setShowRetakeButton] = useState(false);

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
});

