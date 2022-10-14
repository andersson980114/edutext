import React, {useState, useEffect} from 'react' 
import { StyleSheet, View, Image } from "react-native";
//Componente encargado en la splach screen
export default function Splach() {
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
 