import React, { createContext, useContext, ReactNode } from 'react';

type ApiContextType = {
  searchMedicine: (search: string) => Promise<any[]>;
};

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const ApiProvider:  React.FC<{ children: ReactNode }> = ({ children }) => {

  const searchMedicine = async (search: string): Promise<any[]> => {
    try {
      const response = await fetch(
        `http://www.lakemedelsboken.se/api/v1/medicinesearch?search=${search}`
      );

      if (!response.ok) {
        throw new Error('Något gick fel vid API-anropet.');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  return (
    <ApiContext.Provider value={{ searchMedicine }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApiContext = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApiContext måste användas inom en ApiProvider');
  }
  return context;
};
