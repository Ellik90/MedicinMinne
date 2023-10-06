import React, { createContext, useContext } from "react";


type Theme = {
  backgroundColor: string;
  buttonColor: string;
  buttonTextColor: string;
  buttonTextSize: number;
};

const ThemeContext = createContext<Theme | undefined>(undefined);

export const useTheme = (): Theme => {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error("useTheme måste användas inom en ThemeProvider");
  }
  return theme;
};

type ThemeProviderProps = {
  children: React.ReactNode;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  
  const theme: Theme = {
    backgroundColor: "#ffffff",
    buttonColor: "#C08081",
    buttonTextColor: "white",
    buttonTextSize: 20,
 
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};
