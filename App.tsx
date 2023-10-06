import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Navigator from "./Pages/Navigator";
import { ImageUploadProvider } from "./Contexts/ImageUploadContext";
import { UserProvider } from "./Contexts/UserContext";
import { MedicationProvider } from "./Contexts/MedicationContext";
import { NotificationProvider } from "./Contexts/NotificationContext";
import { ThemeProvider } from "./Contexts/ThemeContext";
import { ApiProvider } from "./Contexts/ApiMedicineContext";

const App: React.FC = () => {
  return (
    <ApiProvider>
      <ThemeProvider>
        <MedicationProvider>
          <UserProvider>
            <NotificationProvider>
              <ImageUploadProvider>
                <NavigationContainer>
                  <Navigator />
                </NavigationContainer>
              </ImageUploadProvider>
            </NotificationProvider>
          </UserProvider>
        </MedicationProvider>
      </ThemeProvider>
    </ApiProvider>
  );
};

export default App;
