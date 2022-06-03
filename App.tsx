import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar'; 
import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NativeStack } from './NativeStack';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer> 
          <StatusBar style="auto" />
          <NativeStack/> 
      </NavigationContainer>

    </SafeAreaProvider>
  );
}


