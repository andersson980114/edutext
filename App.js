import React, {useState, useEffect} from 'react'
import { StyleSheet } from 'react-native'
import Navigation from './Navigations';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getFocusedRouteNameFromRoute} from '@react-navigation/native';

import WordScreen from './screens/WordScreen'; 
import TemasScreen from './screens/TemasScreen';
import ContenidoScreen from './screens/ContenidoScreen'; 
import PreguntaA from  './screens/PreguntaA';
import OnboardingScreen from './screens/OnboardingScreen';
import SplashScreen from './screens/SplashScreen';
import RegisterScreen from './screens/RegisterScreen';

import {initDatadabase} from './utils/db'
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
    const [logueado, setLogueado] = useState(true)
   
    useEffect(function() {
      async function init(){
        await initDatadabase();
      }
    }, []);
    
    return (
      <NavigationContainer > 
        
        <Stack.Navigator    initialRouteName='Register'
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
            
          
            
          <Stack.Screen name="Splash" component={SplashScreen}  navigation={Navigation} logueo={logueado} options={{header: ()=>null}}/>

          <Stack.Screen name="Register" component={RegisterScreen}  navigation={Navigation}  options={{header: ()=>null}}/>
            
          <Stack.Screen name="Onboarding" component={OnboardingScreen}  options={{header: ()=>null}} />
        </Stack.Navigator> 
          
      </NavigationContainer>    
    );
   

}


//<Stack.Screen name="SplashScreen" component={SplashScreen}  logueado={logueado} options={{header: ()=>null}}/>


/*
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
import OnboardingScreen from './screens/OnboardingScreen';
import SplashScreen from './screens/SplashScreen';
const Stack = createNativeStackNavigator();

const logueado = true


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
  
  if(logueado){
    return (
      <NavigationContainer > 
        
        <Stack.Navigator    initialRouteName='Splash'
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
            
          <Stack.Screen name="Splash" component={SplashScreen}  navigation={Navigation} logueo={logueado} options={{header: ()=>null}}/>
            
            
          <Stack.Screen name="Onboarding" component={OnboardingScreen}  navigation={Navigation}  options={{header: ()=>null}} />
        </Stack.Navigator> 
          
      </NavigationContainer>    
    );
  }else{
    return(
      <NavigationContainer > 
        <Stack.Navigator  initialRouteName='SplashS'
            screenOptions ={{
                headerShown: false    
            }}>  

            <Stack.Screen name="Splash" component={SplashScreen} navigation={Navigation}  logueo={logueado} />
            <Stack.Screen name="Onboarding" component={OnboardingScreen}  navigation={Navigation}  options={{header: ()=>null}} />
            
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

}


*/