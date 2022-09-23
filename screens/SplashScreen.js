import React, {useState, useEffect} from 'react' 
import { StyleSheet, View, Image } from "react-native";
import { useDbContext } from '../Context/DbContext';
import {countUsers} from '../utils/db'  

export default function SplashScreen ({navigation, logueo})  {
    const [authLoaded, setAuthLoaded] = useState(false) 
    const context = useDbContext();
    useEffect(() => {
        setTimeout(() =>{
        setAuthLoaded(true);
        }, 1000);
    }, []);
   
    useEffect(() => { 
        const count =  context.count; 
        if(authLoaded){
            if(True){
                navigation.navigate('Home')
            }else{
                navigation.navigate('Onboarding') 
            } 
        }
    }, [authLoaded, navigation, logueo]);
  
  return (
    <View style={styles.container}>
        <Image 
                style={styles.posterImage}
                source={require('../assets/screenAssets/Logo.png')} 
        />  
    </View>
  )
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',  
        backgroundColor: 'rgba(82, 172, 185, 0.61)'
    },
    posterImage: {  
        margin: 0,
        marginBottom: 10,
    },
});
 