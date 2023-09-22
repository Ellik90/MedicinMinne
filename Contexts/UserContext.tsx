import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, users } from '../Data';

// Skapa en kontext för användaren
type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  userLogIn: (password: string, username:string) => boolean;
  addUser: (user: User | null) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

// Skapa en anpassad komponent som använder kontexten
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>({id:"", name:"", medications:[]});

  function userLogIn(password:string, username: string){
    const userFound = users.find(u => u.password == password && u.username == username);
    console.log(userFound);
    if(userFound){
        console.log(userFound);
        setUser(userFound);
        return true;
    }
    return false;
  }
  function addUser(){

  }

  return (
    <UserContext.Provider value={{ user, setUser, userLogIn, addUser}}>
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
