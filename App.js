import 'expo-dev-client';
import { TailwindProvider } from 'tailwind-rn';
import utilities from './tailwind.json';
import { Button, Text, View } from 'react-native';
import React from 'react';
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();
import StackNavigator from './StackNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { useTailwind } from "tailwind-rn";


export default function App() {
  const tailwind = useTailwind();
  return (

    <TailwindProvider utilities={utilities}>

      <NavigationContainer>

        <StackNavigator />

      </NavigationContainer>
    </TailwindProvider>






  );
}

