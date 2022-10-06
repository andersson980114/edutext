import React, {useState, useEffect} from 'react'
import { StyleSheet } from 'react-native'
import Navigation from './Navigations';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getFocusedRouteNameFromRoute} from '@react-navigation/native';
import { UseInfoContext, UsePreguntaContext } from './Contexts/InfoProvider';
import { UseDbContext } from './Contexts/DataContext';
import WordScreen from './screens/WordScreen';  
import TemasScreen from './screens/TemasScreen';
import ContenidoScreen from './screens/ContenidoScreen'; 
import PreguntaA from  './screens/PreguntaA';
import PreguntaB from  './screens/PreguntaB';
import OnboardingScreen from './screens/OnboardingScreen';
import SplashScreen from './screens/SplashScreen';
import RegisterScreen from './screens/RegisterScreen';
import ExampleScreen from './screens/ExampleScreen';
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
    const {pregunta, setPregunta} = UsePreguntaContext()
    const {db, count} = UseDbContext() 

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
            options={{ gestureEnabled: false }}
          >
            
          < Stack.Screen name="Splash" component={SplashScreen}  navigation={Navigation} logueo={logueado} options={{header: ()=>null}}/>
          
          <Stack.Screen name="Example" options={() =>( {
                headerTitle:String("Importante"), 
                headerBackVisible:false
          })} component={ExampleScreen}  />

          {
            count == 0? (
              <>
                <Stack.Screen name="Onboarding" component={OnboardingScreen}  options={{header: ()=>null}} />
                <Stack.Screen name="Register" component={RegisterScreen}  navigation={Navigation}  
                    options={{header: ()=>null}}
                  />
                <Stack.Screen name="PreguntaA" options={() =>( {
                    headerTitle:String(pregunta[0]), 
                    headerBackVisible:false
                })} component={PreguntaA}  />
                
              </>
                

            ) : (
              <>
                <Stack.Screen  
                  name="Inicio"
                  component={Navigation}  
                  options={({ route }) => ({
                    headerTitle: getHeaderTitle(route),
                    headerBackVisible:false

                  })} 
                  
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

                <Stack.Screen name="PreguntaB" options={() =>( {
                    headerTitle:String(pregunta[0]), 
                    headerBackVisible:false
                })} component={PreguntaB}  />

                
              </>
              
            )
          }

          </Stack.Navigator> 
            
        </NavigationContainer> 
    );
   

}