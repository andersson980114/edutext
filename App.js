import React from 'react'
import Navigation from './Navigations';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getFocusedRouteNameFromRoute} from '@react-navigation/native'; 

import WordScreen from './screens/WordScreen';
import TemasScreen from './screens/TemasScreen';
import ContenidoScreen from './screens/ContenidoScreen'; 
import PreguntaA from './screens/PreguntaA';

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
    <NavigationContainer> 
      <Stack.Navigator >
        <Stack.Screen  
          name="Inicio"
          component={Navigation}
          
          options={({ route }) => ({
            headerTitle: getHeaderTitle(route),
            
            headerStyle: {
              backgroundColor: '#52ACB9',   
              
            },
            headerTintColor: '#fff',
            headerTitleAlign: "center",
            headerTitleStyle:{
              fontSize:44, 
            }
          })} 
        />
        <Stack.Screen name="Word" component={WordScreen} 
          options ={{ 
            
            headerStyle: {
              backgroundColor: '#52ACB9',   
              
            },
            headerTintColor: '#fff',
            headerTitleAlign: "center",
            headerTitleStyle:{
              fontSize:44, 
            },
          }}
        />

        <Stack.Screen name="Temas" component={TemasScreen} 
          options ={{ 
            
            headerStyle: {
              backgroundColor: '#52ACB9',   
              
            },
            headerTintColor: '#fff',
            headerTitleAlign: "center",
            headerTitleStyle:{
              fontSize:44, 
            },
          }}
        />

        < Stack.Screen name="Contenido" component={ContenidoScreen} 
          options ={{ 
            
            headerStyle: {
              backgroundColor: '#52ACB9',   
              
            },
            headerTintColor: '#fff',
            headerTitleAlign: "center",
            headerTitleStyle:{
              fontSize:44, 
            },
          }}
        />

        < Stack.Screen name="PreguntaA" component={PreguntaA} 
          options ={{ 
            
            headerStyle: {
              backgroundColor: '#52ACB9',   
              
            },
            headerTintColor: '#fff',
            headerTitleAlign: "center",
            headerTitleStyle:{
              fontSize:44, 
            },
          }}
        />
      </Stack.Navigator> 
        
    </NavigationContainer>    
  );
}




