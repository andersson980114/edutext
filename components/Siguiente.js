import React, {useState} from 'react'
import { View, Image,Text, StyleSheet, TouchableOpacity } from 'react-native'
 
export default function Siguiente({cantidad, id, prueba, visto, navigation}) {

      
    const handleChange = () =>{
        if(prueba && !visto){
            navigation.navigate('PreguntaA')
        }else{
            navigation.navigate('Temas')
        }
    }

    if(id==cantidad){
        return (
            <TouchableOpacity  onPress={()=> handleChange()}>
                <Image source={require('../assets/screenAssets/flechaD.png')} style={styles.img}/>
            </TouchableOpacity>
          )
    }
    return (
        <View>

        </View>
      )
  
}

const styles = StyleSheet.create({
    
    img:{
        backgroundColor: "#2C6B80",
        width: 83,
        height: 42,
        resizeMode: "contain",
        borderRadius: 25,
        margin: 15, 

    }
})