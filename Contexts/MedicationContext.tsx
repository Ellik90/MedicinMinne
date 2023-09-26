import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Timespan } from 'react-native/Libraries/Utilities/IPerformanceLogger';


export interface Medication {
    id?: string;
  url?: string;
  name?: string;
  comment?: string;
  dose?: string;
  time?: string;    
}


type MedicationContextType = {
  medication: Medication | null;
  setMedication: (medication: Medication | null) => void; 
  addMedication: (medication: Medication) => void; 
  
};


const MedicationContext = createContext<MedicationContextType | undefined>(undefined);

export const MedicationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [medication, setMedication] = useState<Medication | null>(
    {id:"", url:"", name:"", comment:"", dose: "", time: "" }
  );

   function addMedication(medication: Medication){
    const milliseconds = Date.now().toString();
    const id = milliseconds.slice(-4);
    medication.id = id;
    setMedication({...medication, id: medication.id});
    console.log(medication)
   }



  return (
    <MedicationContext.Provider value={{ medication, setMedication, addMedication }}>
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
