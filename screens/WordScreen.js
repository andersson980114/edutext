import React,{useContext, useEffect, useState} from "react";
import { Text, View,ScrollView, Image, StyleSheet, Dimensions, Pressable } from "react-native";
import * as data from '../Data/wordNiveles.json';
import { UseNivelContext, UseOpcionContext ,UsePreguntaContext} from "../Contexts/InfoProvider";
import { UseDbContext } from "../Contexts/DataContext";
import Nivel from "../components/Nivel";
import {Niveles} from '../Data/imagenes' 
import { getNivel } from "../utils/nivelModel";

const d1 = "Prueba"
const d2 = ['Prueba',0]
const d3 = require('../assets/screenAssets/bronce.png')

export default function WordScreen({ navigation }) {
  const Nivels = data.Niveles
  const {nivel, handleNivel} =  UseNivelContext() 
  const {opcion, handleOpcion} =  UseOpcionContext() 
  const [niveles, setNiveles] = useState([])
  const {db, count} = UseDbContext()

  useEffect(() => {
    getNivel(db, opcion, setNiveles)
  }, [])
  
  useEffect(() =>
    navigation.addListener('beforeRemove', (e) => {
      const action = e.data.action; 

      e.preventDefault();
      //console.log("word");
      navigation.dispatch(action)
    
  }),
  [navigation])

  const handleChange = (nombre) => {
    handleNivel(nombre)
    navigation.navigate('Temas')
  }

  return ( 
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {
          niveles.map((item, key) => {
            if(item.idOpcion==opcion[1]){
              let id = item.idNivel
              const url = Niveles[id].url
              return(
                  <Nivel  key={key} nivel={item.Nivel} nombre={id}  img={url}  progreso={item.Progreso}  onChange={handleChange} />
                
              )    
            }
          })
        }
         
    </View> 
  )
}

const deviceWidth = (Dimensions.get("window").height) * 0.5
const height = (Dimensions.get("window").height) * 0.5;

const ANCHO_CONTENEDOR = (height / deviceWidth ) * 90 ; 
const ALTO_CONTENEDOR = (height / deviceWidth ) * 90 ;  

const styles = StyleSheet.create({
  topCard:{ 
    height: '90%',
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  imgCard:{
    width: ANCHO_CONTENEDOR,
    height: ALTO_CONTENEDOR,  
    margin: '10%',
  },

  imgContent:{
    width: '30%',
  },

  titleCar:{
    fontSize: 40, 
    width: '70%',
    alignContent: 'center',
    alignSelf: 'center', 
  },

  titleIntro:{
    height: '90%',
    marginTop: '10%',
    fontSize: 40,
    alignContent: 'center',
    alignSelf: 'center',  
    height: 84,
  },


  bottomCard:{   
    height: '10%',
    width: '100%',
    backgroundColor: '#C4C4C4',
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    
  },

  ProgresCard:{ 
    height: '100%',
    width: '50%',
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    backgroundColor: '#33FF00',
  },

  cardContainer:{
    flex: 1,
    flexDirection: 'column',
    width: deviceWidth - 35,
    height: ALTO_CONTENEDOR,
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

})