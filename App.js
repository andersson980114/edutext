import React from 'react'
import { StyleSheet } from 'react-native'
import Navigation from './Navigations';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getFocusedRouteNameFromRoute} from '@react-navigation/native';

import WordScreen from './screens/WordScreen'; 
import TemasScreen from './screens/TemasScreen';
import ContenidoScreen from './screens/ContenidoScreen'; 
import PreguntaA from  './screens/PreguntaA';

const Stack = createNativeStackNavigator();


function getHeaderTitle(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Avatar';

  switch (routeName) {
    case 'Avatar':
      return 'Avatar';
    case 'Home':
      return 'Home';
    case 'Insignias':
      return 'Insignias';
  }
}

export default function App() {
  return (
    <NavigationContainer > 
      <Stack.Navigator 
         screenOptions ={{ 
            
          headerStyle: {
            backgroundColor: '#52ACB9',     
          }, 
          headerTintColor: '#fff',
          headerTitleAlign: "center",
          headerTitleStyle:{
            fontSize:44, 
          }, 
        }}
      >
        <Stack.Screen  
          name="Inicio"
          component={Navigation} 
          options={({ route }) => ({
            headerTitle: getHeaderTitle(route),  
          })}
        />
        <Stack.Screen name="Word" component={WordScreen}  />

        <Stack.Screen name="Temas" component={TemasScreen}  />

        < Stack.Screen name="Contenido" component={ContenidoScreen}  /> 

        <Stack.Screen name="PreguntaA" component={PreguntaA}  />

      </Stack.Navigator> 
        
    </NavigationContainer>    
  );
}



