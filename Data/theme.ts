

import {
    DarkTheme,
    DefaultTheme,
  } from "@react-navigation/native";
  
  export const AppLightTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "rgb(255, 45, 85)",
      background: "rgb(242, 242, 242)",
    },
  };
  
  export const AppDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: "rgb(255, 45, 85)",
      background: "rgb(10, 10, 10)",
    },
  };