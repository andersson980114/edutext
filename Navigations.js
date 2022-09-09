import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from './screens/HomeScreen';
import AvatarScreen from './screens/AvatarScreen';
import InsigniaScreen from './screens/InsigniaScreen';  

//iconos
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Colors, Header } from 'react-native/Libraries/NewAppScreen'; 

//constantes de navegacion
const Tab = createBottomTabNavigator();//tab o footer  

export default function Navigation(){
 
    return(
        
        <Tab.Navigator initialRouteName='Home'
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: { height: 70 },
                tabBarActiveBackgroundColor:'#2C6B80',
                tabBarInactiveBackgroundColor:'#2C6B80',
                tabBarShowLabel: false,
                tabBarIcon: ({ focused, color, size}) => {
                    let iconName;
                    size= 40;
                    color= focused ?  '#0BC4FF' :"white" 
                    if(route.name === "Home"){
                        iconName = 'home';
                    }else if(route.name === "Avatar"){
                        iconName =  "smile"; 
                    }else if(route.name === "Insignias"){
                        iconName = "medal";
                    }
                    
                    return <FontAwesome5 name={iconName} size={size} color={color}/>;

                } 
            })}
            >
            
            <Tab.Screen name='Avatar' component={AvatarScreen}/>
            <Tab.Screen name='Home' component={HomeScreen} />
            <Tab.Screen name='Insignias' component={InsigniaScreen}/>
            
        </Tab.Navigator>
    )
}