import React, {useState, useEffect} from 'react'
import { StyleSheet } from 'react-native'
import Navigation from './Navigations';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getFocusedRouteNameFromRoute} from '@react-navigation/native';
import { UseInfoContext } from './Contexts/InfoProvider';

import WordScreen from './screens/WordScreen';  
import TemasScreen from './screens/TemasScreen';
import ContenidoScreen from './screens/ContenidoScreen'; 
import PreguntaA from  './screens/PreguntaA';
import OnboardingScreen from './screens/OnboardingScreen';
import SplashScreen from './screens/SplashScreen';
import RegisterScreen from './screens/RegisterScreen';
import {initDb} from './utils/db' 
//import {initDatadabase} from './utils/db' 
const Stack = createNativeStackNavigator();
  

function getHeaderTitle(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Inicio'; 
  switch (routeName) {
    case 'Avatar':
      return 'Avatar';
    case 'Inicio':
      return 'Inicio';
    case 'Insignias':
      return 'Insignias'; 
  }
}
 
export default function App() {
    const [logueado, setLogueado] = useState(true);
    const {opcion, nivel, tema} = UseInfoContext()
    useEffect(function() {
       function init(){
         const db = initDb();
        console.log("db")
        
    db.transaction(
    (tx) => {
      tx.executeSql(
      ".tables",
      [],
      (tx, results) => {
        console.log(results)
      },
      error => {console.log("falle")})
    }
    )
      }
      init();
    }, []);
    

    return (
        <NavigationContainer > 
        
          <Stack.Navigator    initialRouteName='Inicio'
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
                headerBackVisible:false 
              })
            }
            />
            
            <Stack.Screen name="Word" options={() =>( {
                headerTitle:String(opcion[0]) 
            })} component={WordScreen}  />

            <Stack.Screen name="Temas" options={() =>( {
                headerTitle:String(nivel[0])
            })} component={TemasScreen}  />
    
            < Stack.Screen name="Contenido" options={() =>( {
                headerTitle:String(tema[0])
            })} component={ContenidoScreen}  /> 
    
            <Stack.Screen name="PreguntaA" component={PreguntaA}  />
  
            <Stack.Screen name="Onboarding" component={OnboardingScreen}  options={{header: ()=>null}} />
            
            <Stack.Screen name="Splash" component={SplashScreen}  navigation={Navigation} logueo={logueado} options={{header: ()=>null}}/>

            <Stack.Screen name="Register" component={RegisterScreen}  navigation={Navigation}  options={{header: ()=>null}}/>
              
            
          </Stack.Navigator> 
            
        </NavigationContainer> 
    );
   

}
