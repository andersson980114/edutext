import React, {useState} from 'react'
import { View, Image,Text, StyleSheet, TouchableOpacity } from 'react-native'
import { UseOpcionContext, UseNivelContext, UsePreguntaContext} from "../Contexts/InfoProvider";


function random(min, max) { 
    min = Math.ceil(min);
    max = Math.floor(max);
    var val = Math.floor((Math.random() * (max - min + 1)) + min)-1; 
    if(val<0){val=0}
    return val
  }

export default function Siguiente({cantidad, id, prueba, visto, navigation}) {
    
    
    const {nivel, handleNivel} =  UseNivelContext() 
    const {pregunta, handlePregunta} = UsePreguntaContext()
    const {opcion, handleOpcion} =  UseOpcionContext() 

    const handleChange = () =>{
        var val= random(nivel[1], (parseInt(nivel[1])+1)*3)
        console.log(nivel)
        handlePregunta([opcion[0], val])
        if(pregunta[0]!='Onboarding'){
            if(prueba && !visto){
                navigation.navigate('PreguntaA')
            }else{
                navigation.navigate('Temas')
            }
        }else{
            navigation.navigate('Inicio')
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