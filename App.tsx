import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigator from './Pages/Navigator';
import { ImageUploadProvider } from './Contexts/ImageUploadContext';
import { UserProvider } from './Contexts/UserContext';
import { MedicationProvider } from './Contexts/MedicationContext';
import { NotificationProvider } from './Contexts/NotificationContext';


const App: React.FC = () => {

  return (
    <NotificationProvider>
    <ImageUploadProvider>
      <MedicationProvider>
      <UserProvider>
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
    </UserProvider>
    </MedicationProvider>
    </ImageUploadProvider>
    </NotificationProvider>
  );
};

export default App;



