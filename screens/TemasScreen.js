import React , { useEffect, useState } from "react";
import { Text, View,ScrollView, Alert, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import * as data from '../Data/wordTemas.json';
import { UseInfoContext, UseTemaContext,UsePreguntaContext, UseProgresoContext, UseCompletadoContext} from "../Contexts/InfoProvider";
import { UseDbContext } from "../Contexts/DataContext";
import Tema from "../components/Tema"; 
import { getTema, updateTema } from "../utils/temaModel";
import Jefe from "../components/Jefe";
import { completedNivel } from "../utils/nivelModel";

const deviceWidth = Math.round(Dimensions.get('window').width)
const deviceHeight = Math.round(Dimensions.get('window').height)
let ni;
export default function TemasScreen({navigation }) {
  const {opcion, nivel, tema} = UseInfoContext();
  const {mytema, handleTema} = UseTemaContext();
  const {db, count} = UseDbContext()
  const favorite = require('../assets/screenAssets/favorite.png') ;
  const noFavorite =  require('../assets/screenAssets/noFavorite.png');
  const temasA = data.Temas
  const {pregunta, handlePregunta} = UsePreguntaContext()
  const  [fav, setFav] = useState(false)
  const [temasD, setTemasD] = useState([])
  const {progreso, handleProgreso} = UseProgresoContext()
  const {completado, handleCompletado} = UseCompletadoContext()
 
  useEffect(() => { 
    getTema(db, setTemasD)
    if(opcion[1]>0){
            ni = nivel[1]+1+5
        }else{
            ni = nivel[1]+1
    }
      
    if(progreso>=100 && !completado){
       
      completedNivel(db, ni, true)
      handleCompletado(true)
      
      console.log(progreso)
      console.log("\n--------------------------------------------------------\n")
    }
      
      console.log(progreso)
  }, [])


  useEffect(() =>
    navigation.addListener('beforeRemove', (e) => {
      const action = e.data.action; 

      e.preventDefault();
      //console.log("word");
      navigation.dispatch(action)
      navigation.navigate('Word')
    
  }),
  [navigation])


  const handleChange = (nombre) => { 
    handleTema(nombre)
    navigation.navigate('Contenido')
  }

  const prueba = (nombre) => { 
    handleTema(nombre)
    navigation.navigate('PreguntaB')
  }
  
  const updateChage = (data) =>{
    let bol;
    if(data[1]){
      bol=1
    }else{
      bol=0
    }

    updateTema(db ,data[0]+1,bol,data[2],data[3])
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'  }}>
      <ScrollView  >
        {
          temasD.map((item, key) => {
            //console.log(item.Nivel, ", ", item.Opcion)
            //console.log(nivel[1], " - ", opcion[1])
            let id = item.id-1
            if(nivel[0]=="Favoritos"){
              //console.log("Favoritos");
              if(item.Favorito && item.Opcion == opcion[1] ){
                return(
                  <Tema  key={key} db={db} nombre={[item.Nombre, id]} Texto={item.Nombre} favo={item.Favorito} completado={item.Completado} visto={item.Visto} Onchage={handleChange} update={updateChage}/>
                )
              }
            }
            else if(item.Nivel == nivel[1] && item.Opcion == opcion[1] ){ 
              //console.log(item.id,"  - Fav:", item.Favorito,"  - vis:", item.Visto,"  - com:", item.Completado)
              return(
                <Tema  key={key} db={db} nombre={[item.Nombre, id]} Texto={item.Nombre} favo={item.Favorito} completado={item.Completado} visto={item.Visto} Onchage={handleChange} update={updateChage}/>
              )
            }
          })
        }
        <Jefe nivel={nivel} nombre={["Prueba", nivel[1]]} Onchage={prueba}  />
      </ScrollView>

    </View>
  )
}

const styles = StyleSheet.create({
  imgCard:{
    width: 43,
    height: 40,  
      
  },

  titleCar:{
    fontSize: 40,  
    marginTop: '20%', 
  },
 
  cardContainer:{   
    flexWrap: 'wrap',
    flexDirection: 'row', 
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: deviceWidth - 35,
    height: 140, 
    backgroundColor: '#EBEBEB',
    borderRadius: 15,
    shadowColor:'#000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.75,
    shadowRadius: 5,
    elevation: 10,  
    margin: 10,
  },

})