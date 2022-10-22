import React,{useContext, useEffect, useState} from "react";
import { Text, View,ScrollView, Image, StyleSheet, Dimensions, Pressable } from "react-native";
import * as data from '../Data/wordNiveles.json';
import { UseCompletadoContext, UseNivelContext, UseOpcionContext ,UseEvaluadoContext, UseProgresoContext, UsePuntajeContext} from "../Contexts/InfoProvider";
import { UseDbContext } from "../Contexts/DataContext";
import Nivel from "../components/Nivel";
import {Niveles} from '../Data/imagenes' 
import { completedNivel, getCompletados, getNivels } from "../utils/nivelModel";
import { useIsFocused } from '@react-navigation/native';
import ModalPoup from "../components/ModalPoup"; 
import { Insignias, Avatars } from "../Data/imagenes";
import { getCaminos, updateInsignia } from "../utils/insigniaModel";
import { getAvatarStatus, updateAvatar } from "../utils/avatarModel";

const d1 = "Prueba"
const d2 = ['Prueba',0]
const d3 = require('../assets/screenAssets/bronce.png')
let ni;

export default function WordScreen({ navigation }) {
  //const
  const Nivels = data.Niveles
  const isFocused = useIsFocused();
  //context
  const {nivel, handleNivel} =  UseNivelContext() 
  const {opcion, handleOpcion} =  UseOpcionContext() 
  const {db, count} = UseDbContext()
  const {progreso, handleProgreso} = UseProgresoContext();
  const {completado, handleCompletado} =  UseCompletadoContext();
  const {evaluado, handleEvaluado} = UseEvaluadoContext()
  const {puntaje, handlePuntaje} = UsePuntajeContext()
  //states
  const [bloqueado, setBloqueado] = useState([])
  const [caminos, setCaminos] = useState([])//indica si los dos caminos estan bloqueados
  const [niveles, setNiveles] = useState([])
  const [completados,setCompletados] = useState(0)
  //alert
  const [show, setShow] = useState(false)
  const [show2, setShow2] = useState(false)
  const [titulo, setTitulo] = useState("Intentelo de Nuevo")
  const [texto, setTexto] = useState("")
  const [imagen, setImagen] = useState(require("../assets/screenAssets/prohibited.png"))
  const [botones, setBotones] = useState([])  
  const [titulo2, setTitulo2] = useState("Intentelo de Nuevo")
  const [texto2, setTexto2] = useState("")
  const [imagen2, setImagen2] = useState(require("../assets/screenAssets/prohibited.png"))
  const [botones2, setBotones2] = useState([]) 
  const [success, setSuccess] = useState(false)

  const cerrar = () =>{
    handleEvaluado(true) 
    handleCompletado(true)
    setShow(false)  
    setSuccess(true)
  }

  const cerrar2 = () =>{
    handleEvaluado(true) 
    handleCompletado(true) 
    setShow2(false) 
    setSuccess(true) 
  }

  const insignia = (db, id) =>{
    // console.log("desbloqueada insignia: ", id, nivel)
      updateInsignia(db, id+1, false)
      setTexto(Insignias[id].Descripcion)
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
      setTexto2("Nuevo AVATAR desbloqueado por tus puntos")
      setShow2(true)
      setTitulo2('¡AVATAR Desbloqueado!') 
      setImagen2(Avatars[id-1].url)
      setSuccess(true)
      setBotones2([
      {
          texto: "Aceptar",
          id: 0,  
          success: false,
          boton: "succes"

      }
      ]) 
  }

  useEffect(() => {
    getNivels(db, opcion, setNiveles)
    getCompletados(db, setCompletados)
    getCaminos(db, 12, setCaminos)
    getAvatarStatus(db, puntaje-(puntaje%20), setBloqueado)
    if(opcion[1]>0){
      ni = nivel[1]+1+5
    }else{
        ni = nivel[1]+1
    } 

    if(!completado && progreso>=100){
      console.log("completado")
      insignia(db, ni)
      completedNivel(db, ni, true)
      setShow(true)
    } 
    if(bloqueado[0]==1){
      setShow2(true)
      setBloqueado[0]
      avatar(db, bloqueado[1])
      updateAvatar(db, puntaje-(puntaje%20), 0)
      //console.log("desbloqueado Avaatar Nivel")
    }
   
  }, [isFocused])
  
  useEffect(() => { 
     
    if(bloqueado[0]==1){
      setShow2(true)
      setBloqueado[0]
      avatar(db, bloqueado[1])
      updateAvatar(db, puntaje-(puntaje%20), 0)
      //console.log("desbloqueado Avaatar Nivel")
    }
  }, [navigation])
  
  useEffect(() => { 
     
    if(bloqueado[0]==1){
      setShow2(true)
      setBloqueado[0]
      avatar(db, bloqueado[1])
      updateAvatar(db, puntaje-(puntaje%20), 0)
      //console.log("desbloqueado Avaatar Nivel")
    }
  }, [bloqueado[0], bloqueado[1]])

  useEffect(() => { 
    if(completados>=8 && caminos==1){
      console.log("completados")
      insignia(db, 11)
    }
  }, [completados, caminos])
  

  const handleChange = (nombre,Evaluado, progreso,Completed) => { 
    handleEvaluado(Evaluado)
    handleProgreso(progreso)
    handleCompletado(Completed)   
    handleNivel(nombre)
    navigation.navigate('Temas')
  }

  return ( 
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}> 
        <ModalPoup visible={show} titulo={titulo} texto={texto} imagen={imagen} botones={botones}  onChange={cerrar} />
        <ModalPoup visible={show2} titulo={titulo2} texto={texto2} imagen={imagen2} botones={botones2}  onChange={cerrar2} />
          {
            niveles.map((item, key) => {
              if(item.idOpcion==opcion[1]){
                let id = item.idNivel
                const url = Niveles[id].url
                return(
                    <Nivel  key={key} id={item.id} nivel={item.Nivel} nombre={id}  img={url} Evaluado={item.Evaluado} Completed={item.Completed} progreso={item.Progreso}  onChange={handleChange} />
                  
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