import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Medication } from './MedicationContext';

interface User {
  id?: number; // Ändra från 'string' till 'number'
  name?: string;
  medications?: Medication[];
}

// Skapa en kontext för användaren
type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void; // Lägg till parameter för att sätta användaren
};

// Skapa en dummyanvändare
// const mockedUser: User | null = {
//   id: 1,
//   name: 'Elina',
//   medications: [{ url: "data:image/jpeg;base64,...", name: "Sertralin", comment: "Ta 1 gång på morgonen, 50 mg." }]
// };

const UserContext = createContext<UserContextType | undefined>(undefined);

// Skapa en anpassad komponent som använder kontexten
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>({id:0, name:"", medications:[]});

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Använd en egen hook för att enkelt komma åt kontexten
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext måste användas inom en UserProvider');
  }
  return context;
};
