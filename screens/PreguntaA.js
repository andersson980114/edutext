import React,{useState} from "react";
import { Text, View,Button, Image, StyleSheet, Dimensions, Pressable } from "react-native";
import { Card} from 'react-native-elements'
import * as data from  '../Data/preguntas.json'
import Retroalimentacion from "../components/Retroalimentacion";
import {UsePreguntaContext} from '../Contexts/InfoProvider';
import PreguntaOpciones from '../components/PreguntaOpciones.js'
import PreguntaFV from '../components/PreguntaFV.js'
import PreguntaImagenes from '../components/PreguntaImagenes.js'

let tema;
let index;
let tipo; 
export default function PreguntaA({ navigation }) {
  const {pregunta, setPregunta} = UsePreguntaContext() 
  const [estado, setEstado] = useState(false) //si se activo una respuesta o no
  const [respuesta, setRespuesta] = useState(false)
  const [pres, setPress] = useState(false)

  index = pregunta[1] 
  switch(pregunta[0]){
    case 'Word':
      tema = data.Word
      break;
    case 'Docs':
      tema = data.Docs
      break;
    default:
      tema = data.Onboarding
      break;
  }
  tipo = tema[index].Tipo

   
  //console.log(tema[index].Opciones);

  const correcta = (opcion) => {
    setEstado(true)
    setRespuesta(opcion[0]) 
    setPress(true)   
  }
  
  if(tipo == 0){
    return (
      <View style={styles.container}>
          
          <PreguntaOpciones onChange={correcta} tema={tema} index={index} />
          
          <View style={styles.notificacion}  >
            <Retroalimentacion respuesta={respuesta} estado={estado} navigation={navigation} pres={pres} />
          </View>
   
      </View>
    )
    
  }else if(tipo == 1){
    return (
      <View style={styles.container}>
          
          <PreguntaFV onChange={correcta} tema={tema} index={index} />
          
          <View style={styles.notificacion}  >
            <Retroalimentacion respuesta={respuesta} estado={estado} navigation={navigation} pres={pres} />
          </View>
   
      </View>
    )
  }else{
    return (
      <View style={styles.container}>
          
          <PreguntaImagenes onChange={correcta} tema={tema} index={index} />
          
          <View style={styles.notificacion}  >
            <Retroalimentacion respuesta={respuesta} estado={estado} navigation={navigation} pres={pres} />
          </View>
   
      </View>
    )
  }

}


const deviceWidth = Math.round(Dimensions.get('window').width)

const styles = StyleSheet.create({

  container:{
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center' ,
    height: '90%',
    width: '100%', 
  }, 
  
  titleCar:{
    fontSize: 30,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },

  retoText:{
    fontSize: 23,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },

  opciones:{
    height: '55%', 
  },
  notificacion:{
    height: '10%', 
  },
 
  pregunta:{  
    alignItems: 'center',
    justifyContent: 'center',
    height: '25%',
  },

  textPregunta:{
    fontWeight: "bold", 
    fontSize: 26,   
    alignItems: 'center',
    justifyContent: 'center',
  },
 
  cardContainer:{ 
    width: deviceWidth - 35, 
    backgroundColor: '#EBEBEB',
    borderRadius: 15,
    shadowColor:'#000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.75,
    shadowRadius: 5,
    elevation: 7,
    margin: 10, 

  },

  retroalimentacion:{
    width: deviceWidth - 35, 
    borderWidth: 3,
    borderRadius: 15,
    backgroundColor: '#ACF6AB',
    borderColor: '#16B20C',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowColor:'#000',
    shadowOpacity: 0.75,
    shadowRadius: 5,
    elevation: 7,
    margin: 10, 
  },

  })