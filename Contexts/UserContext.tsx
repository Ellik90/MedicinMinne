import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, users } from '../Data';


type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  userLogIn: (password: string, username:string) => boolean;
  addUser: (user: User | null) => void;
  };
  //en metod som lägger till en medication till listan 


const UserContext = createContext<UserContextType | undefined>(undefined);


export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>({id:"", name:"", medications:[], notifiCations:[]});

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

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext måste användas inom en UserProvider');
  }
  return context;
};
