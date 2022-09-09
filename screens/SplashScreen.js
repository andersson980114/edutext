import React, {useState, useEffect} from 'react' 
import { StyleSheet, View, Image } from "react-native";

export default function SplashScreen ({navigation, logueo})  {
    const [authLoaded, setAuthLoaded] = useState(false) 
    useEffect(() => {
        setTimeout(() =>{
        setAuthLoaded(true);
        }, 1000);
    }, []);
    
    useEffect(() => { 
        if(authLoaded){
            if(logueo ){
                navigation.navigate('Inicio')
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
 