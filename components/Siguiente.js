import React, {useState} from 'react'
import { View, Image,Text, StyleSheet, TouchableOpacity } from 'react-native'
import { UseOpcionContext, UseNivelContext, UsePreguntaContext, UseTemaContext} from "../Contexts/InfoProvider";
import { UseDbContext, UseCountContext } from '../Contexts/DataContext'; 
import { infoTema, completeTema } from '../utils/temaModel';
import { StackActions } from '@react-navigation/native';

function random(min, max) { 
    min = Math.ceil(min);
    max = Math.floor(max);
    var val = Math.floor((Math.random() * (max - min + 1)) + min)-1; 
    if(val<0){val=0}
    return val
  }

export default function Siguiente({cantidad, id, prueba, visto, navigation}) {
    
    
  const {tema, handleTema} = UseTemaContext();
    const {nivel, handleNivel} =  UseNivelContext() 
    const {pregunta, handlePregunta} = UsePreguntaContext()
    const {opcion, handleOpcion} =  UseOpcionContext() 
    const {db, counte} = UseDbContext()
    const {count, handleCount} = UseCountContext()
    const [info, setInfo] = useState([])

    const handleChange = () =>{
        var val= random(nivel[1], (parseInt(nivel[1])+1)*3)
        const popAction = StackActions.pop(2);
        handlePregunta([opcion[0], val]) 
        if(pregunta[0]!='Onboarding'){
           
            if(prueba && !visto){
                let id= tema[1]+1 
                completeTema(db, id, true)
                navigation.navigate('PreguntaB')
            }else{
                let id= tema[1]+1 
                completeTema(db, id, true)
                navigation.dispatch(popAction)
            }
        }else{
            handleCount(1)
            navigation.navigate('Example')
            
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