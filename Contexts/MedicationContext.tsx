import React, { createContext, useContext, useState, ReactNode } from 'react';


export interface Medication {
  url?: string;
  name?: string;
  comment?: string;   
}


type MedicationContextType = {
  medication: Medication | null;
  setMedication: (medication: Medication | null) => void; 
};


const MedicationContext = createContext<MedicationContextType | undefined>(undefined);

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

export const useMedicationContext = () => {
  const context = useContext(MedicationContext);
  if (!context) {
    throw new Error('useUserContext måste användas inom en UserProvider');
  }
  return context;
};
