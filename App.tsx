import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigator from './Pages/Navigator';
import { ImageUploadProvider } from './Contexts/ImageUploadContext';
import { UserProvider } from './Contexts/UserContext';
import { MedicationProvider } from './Contexts/MedicationContext';


const App: React.FC = () => {
  return (
    <ImageUploadProvider>
      <MedicationProvider>
      <UserProvider>
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
    </UserProvider>
    </MedicationProvider>
    </ImageUploadProvider>
  );
};

export default App;



