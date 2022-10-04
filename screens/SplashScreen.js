import React, {useState, useEffect} from 'react' 
import { StyleSheet, View, Image } from "react-native";
import { UseDbContext } from '../Contexts/DataContext';
import { getUsers } from '../utils/userModel'; 

export default function SplashScreen ({navigation, logueo})  {
    
    const {db, count, user} = UseDbContext()
    const [authLoaded, setAuthLoaded] = useState(false)  

    useEffect(() => { 
        setTimeout(() =>{
        setAuthLoaded(true);
        }, 1600);
    }, []);
    
    useEffect(() => { 
       
        if(authLoaded){
            if(count<1 ){
                navigation.navigate('Onboarding')
            }else{
                navigation.navigate('Inicio') 
            } 
        }
    }, [authLoaded, navigation]);
  
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
 