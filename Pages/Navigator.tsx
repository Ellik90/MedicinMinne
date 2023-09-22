import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FirstScreen from './FirstScreen';
import UserScreen from './UserScreen';
import UserImageScreen from './UserImageScreen';
import InstallationScreen from './InstallationScreen';
import { NavigationContainer } from '@react-navigation/native';
import { ImageUploadProvider } from '../Contexts/ImageUploadContext';
import MedicationInfoScreen from './MedicationInfoScreen';
import LoginScreen from './LoginScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
export type RootStackParamList = {
  FirstScreen: undefined;
  Registrering: undefined;
  UserImageScreen: undefined;
  Användarsidan: undefined;
  Fotobibliotek: undefined;
  Hem: undefined;
  Inloggning: undefined; 
  MedicationInfoScreen: undefined;
};

const Navigator: React.FC = () => {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Hem" component={FirstScreen} />
        <Stack.Screen name="Registrering" component={InstallationScreen} />
        <Stack.Screen name="Inloggning" component={LoginScreen} />
        <Stack.Screen name="Användarsidan" component={UserScreen} />
        <Stack.Screen name="Fotobibliotek" component={UserImageScreen} />
        <Stack.Screen name="MedicationInfoScreen" component={MedicationInfoScreen} />
      </Stack.Navigator>
  );
};

export default Navigator;

