import React,{useState} from "react";
import { Text, View,Button, Image, StyleSheet, Dimensions, Pressable } from "react-native";
import { Card} from 'react-native-elements'
import * as data from  '../Data/preguntas.json'
import Retroalimentacion from "../components/Retroalimentacion";
import {UsePreguntaContext} from '../Contexts/InfoProvider';
import Respuesta from '../components/Respuesta.js'

let tema;
let index;

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
  //console.log(tema[index].Opciones);

  const correcta = (opcion) => {
    setEstado(true)
    setRespuesta(opcion) 
    setPress(true)  
  }
  return (
    <View style={styles.container}>
        
        <View style={styles.pregunta} >
            <Text style={styles.textPregunta}> 
               {tema[index].Pregunta}
            </Text>
        </View>

        <View style={styles.opciones}>

          {
            tema[index].Opciones.map((item, key) => {
                return(
                  <View key={key}>
                    <Pressable  >  
                      <Respuesta onChange={correcta} item={item.item} texto={item.text} correctaR={item.correcta} pres={pres}/> 
                    </Pressable>
                    
                  </View>
                )
            })
          }
          
        </View>
        
        <View style={styles.notificacion}  >
          <Retroalimentacion respuesta={respuesta} estado={estado} navigation={navigation} />
        </View>
 
    </View>
  )
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