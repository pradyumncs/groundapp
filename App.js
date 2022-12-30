import 'expo-dev-client';
import { TailwindProvider } from 'tailwind-rn';
import utilities from './tailwind.json';
import { Button, Text, View } from 'react-native';
import React, { useState, useRef, useEffect } from 'react'
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();
import StackNavigator from './StackNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './hooks/useAuth';
import { useTailwind } from "tailwind-rn";
import Purchases, { PurchasesOffering } from 'react-native-purchases';
const APIKeys = {
  apple: "goog_QOKCJJKzoThDlOPNGGZdfBxQPic",
  google: "goog_QOKCJJKzoThDlOPNGGZdfBxQPic",
};
const entitlement_id = 'pro';

export default function App() {
  const tailwind = useTailwind();

  useEffect(() => {
    Purchases.setDebugLogsEnabled(true);
    Purchases.configure({ apiKey: APIKeys.google });
  }, [])


  return (

    <TailwindProvider utilities={utilities}>

      <NavigationContainer>
        <AuthProvider>
          <StackNavigator />
        </AuthProvider>
      </NavigationContainer>
    </TailwindProvider>






  );
}

