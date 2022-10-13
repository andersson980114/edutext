import React , { useEffect, useState } from "react";
import { Text, View,ScrollView, Alert, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import * as data from '../Data/wordTemas.json';
import { UseInfoContext, UseTemaContext,UsePreguntaContext, UseProgresoContext, UseCompletadoContext, UseEvaluadoContext, UsePuntajeContext} from "../Contexts/InfoProvider";
import { UseDbContext } from "../Contexts/DataContext";
import Tema from "../components/Tema"; 
import { getTema, updateTema } from "../utils/temaModel";
import Jefe from "../components/Jefe";
import { completedNivel, getNivels } from "../utils/nivelModel";
import { useIsFocused } from "@react-navigation/native";
import ModalPoup from "../components/ModalPoup";
import { getAvatarStatus, updateAvatar } from "../utils/avatarModel";
import { updateInsignia } from "../utils/insigniaModel";
import { Insignias, Avatars } from "../Data/imagenes";


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
  const {progreso, handleProgreso} = UseProgresoContext()
  const {completado, handleCompletado} = UseCompletadoContext()
  const  [fav, setFav] = useState(false)
  const [temasD, setTemasD] = useState([])
   
  const {evaluado, handleEvaluado} = UseEvaluadoContext ()
  const {puntaje, handlePuntaje} = UsePuntajeContext()
  const isFocused = useIsFocused();
  const [bloqueado, setBloqueado] = useState([0,0])
  const [niveles, setNiveles] = useState([])
  
  //alert
  const [show, setShow] = useState(false)
  const [show2, setShow2] = useState(false)
  const [titulo, setTitulo] = useState("Intentelo de Nuevo")
  const [texto, setTexto] = useState("")
  const [imagen, setImagen] = useState(require("../assets/screenAssets/prohibited.png"))
  const [botones, setBotones] = useState([]) 
  const [success, setSuccess] = useState(false)

  const cerrar = () =>{
    handleEvaluado(true) 
    handleCompletado(true)
    setShow(false) 
  }

  const cerrar2 = () =>{
    handleEvaluado(true) 
    handleCompletado(true) 
    setShow2(false)
  }

  const insignia = (db, id) =>{
    // console.log("desbloqueada insignia: ", id, nivel)
      updateInsignia(db, id+1, false)
      handleEvaluado(true)
      setTexto(Insignias[id-1].Descripcion)
      setShow(true)
      setTitulo('¡Insignia Desbloqueada!') 
      setImagen(Insignias[id].url)
      setSuccess(true)
      setBotones([
      {
          texto: "Aceptar",
          id: 0,  
          success: false,
          boton: "succes"

      }
      ]) 
  }

  const avatar = (db, id) =>{
    
      updateAvatar(db, id, 1)
      setTexto("Nuevo AVATAR consegudo por tus puntos")
      setShow2(true)
      setTitulo('¡AVATAR Desbloqueado!') 
      setImagen(Avatars[id-1].url)
      setSuccess(true)
      setBotones([
      {
          texto: "Aceptar",
          id: 0,  
          success: false,
          boton: "succes"

      }
      ]) 
  }

  useEffect(() => {
    getTema(db, setTemasD)
    getNivels(db, opcion, setNiveles)
    getAvatarStatus(db, puntaje-(puntaje%20), setBloqueado)
    if(opcion[1]>0){
      ni = nivel[1]+1+5
    }else{
        ni = nivel[1]+1
    }
    console.log("=====================================prueba Temas============================")
    console.log("opcion: ", opcion[0], opcion[1])
    console.log("Nivel: ",nivel[0], nivel[1])
    console.log("Progeso: ", progreso)
    console.log("evaluado: ", evaluado)
    console.log("completado: ", completado)
    console.log("puntaje: ", puntaje)
    console.log(puntaje-(puntaje%20)) 

    if(!completado && progreso>=100){
      console.log("completado")
      insignia(db, ni)
      completedNivel(db, ni, true)
      setShow(true)
    }
    
    console.log("Bloqueado?",bloqueado[0], bloqueado[1])
    if(bloqueado[0]==1){
      setShow2(true)
      avatar(db, bloqueado[1])
      updateAvatar(db, 100, 0)
      console.log("desbloqueado avatar tema")
    }
  
  }, [isFocused])
  
  useEffect(() => {
    console.log("--------------////////////////////////------------//////////////------");
    console.log("------------------------------NAVIGATION------------------");
    if(bloqueado[0]==1){
      setShow2(true)
      setBloqueado[0]
      avatar(db, bloqueado[1])
      updateAvatar(db, puntaje-(puntaje%20), 0)
      console.log("desbloqueado Avaatar Nivel")
    }
  }, [navigation])
  useEffect(() => {
    console.log("--------------////////////////////////------------//////////////------");
    console.log("------------------------------BLOQUEADO------------------");
    if(bloqueado[0]==1){
      setShow2(true)
      setBloqueado[0]
      avatar(db, bloqueado[1])
      updateAvatar(db, puntaje-(puntaje%20), 0)
      console.log("desbloqueado Avaatar Nivel")
    }
  }, [bloqueado[0], bloqueado[1]])
  



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
      <ModalPoup visible={show} titulo={titulo} texto={texto} imagen={imagen} botones={botones}  onChange={cerrar} />
      <ModalPoup visible={show2} titulo={titulo} texto={texto} imagen={imagen} botones={botones}  onChange={cerrar2} />
        
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