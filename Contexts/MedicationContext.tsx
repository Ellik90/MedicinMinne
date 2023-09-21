import React, { createContext, useContext, useState, ReactNode } from 'react';

//en medicin ska ha ett klockslag och antal eller mängd
export interface Medication {
  url?: string;
  name?: string;
  comment?: string;   
}

// Skapa en kontext för användaren
type MedicationContextType = {
  medication: Medication | null;
  setMedication: (medication: Medication | null) => void; // Lägg till parameter för att sätta användaren
};


const MedicationContext = createContext<MedicationContextType | undefined>(undefined);

// Skapa en anpassad komponent som använder kontexten
export const MedicationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [medication, setMedication] = useState<Medication | null>(
    {url:"", name:"", comment:""}
  );

  return (
    <MedicationContext.Provider value={{ medication, setMedication }}>
      {children}
    </MedicationContext.Provider>
  );
};

// Använd en egen hook för att enkelt komma åt kontexten
export const useMedicationContext = () => {
  const context = useContext(MedicationContext);
  if (!context) {
    throw new Error('useUserContext måste användas inom en UserProvider');
  }
  return context;
};
