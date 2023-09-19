import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FirstScreen from './FirstScreen';
import SecondScreen from './SecondScreen';


const Stack = createStackNavigator();

const Navigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Hem" component={FirstScreen} />
      <Stack.Screen name="Inställningar" component={SecondScreen} />
    </Stack.Navigator>
  );
};

export default Navigator;


