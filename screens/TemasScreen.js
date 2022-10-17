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

//dimension
const deviceWidth = Math.round(Dimensions.get('window').width)
const deviceHeight = Math.round(Dimensions.get('window').height)
let ni;

//Screen encargada de mostrar los temas
export default function TemasScreen({navigation }) {
  //const
  const favorite = require('../assets/screenAssets/favorite.png') ;
  const noFavorite =  require('../assets/screenAssets/noFavorite.png');
  const temasA = data.Temas
  const isFocused = useIsFocused();
  //context
  const {pregunta, handlePregunta} = UsePreguntaContext()
  const {progreso, handleProgreso} = UseProgresoContext()
  const {completado, handleCompletado} = UseCompletadoContext()
  const {opcion, nivel, tema} = UseInfoContext();
  const {mytema, handleTema} = UseTemaContext();
  const {db, count} = UseDbContext()
  const {evaluado, handleEvaluado} = UseEvaluadoContext ()
  const {puntaje, handlePuntaje} = UsePuntajeContext()
  //states
  const [fav, setFav] = useState(false)
  const [temasD, setTemasD] = useState([])
  const [bloqueado, setBloqueado] = useState([0,0])
  const [niveles, setNiveles] = useState([])
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

  //cerrar
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
  //modal Insignia
  const insignia = (db, id) =>{
    // console.log("desbloqueada Insignia: ", id)
    
        updateInsignia(db, id+2, false)//debloqueamos insignia
        handleEvaluado(true)
        setTexto(""+Insignias[id+1].Descripcion)
        setShow(true)
        setTitulo('¡Insignia Desbloqueada!') 
        setImagen(Insignias[id+1].url)
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

  //modal avatar
  const avatar = (db, id) =>{
      // console.log("desbloqueado Avatar: ", id)
      updateAvatar(db, id, 1)//debloqueamos insignia
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
    getTema(db, setTemasD)
    getNivels(db, opcion, setNiveles)
    getAvatarStatus(db, puntaje-(puntaje%20), setBloqueado)
    if(opcion[1]>0){
      ni = nivel[1]+5
    }else{
        ni = nivel[1]+1
    } 

    if(!completado && progreso>=100){
      console.log("completado")
      let imge =ni+1;
      let IdIns=ni+2;//id insignia
      console.log("id: ",ni, " id+2:",ni+2);

      if( IdIns != 6 && IdIns != 10){
        insignia(db, ni)
        completedNivel(db, ni, true)
        setShow(true)
      }
    }
    
    console.log("Bloqueado?",bloqueado[0], bloqueado[1])
    if(bloqueado[0]==1){
      setShow2(true)
      avatar(db, bloqueado[1])
      updateAvatar(db,  puntaje-(puntaje%20), 0)
      console.log("desbloqueado avatar tema")
    }
  
  }, [isFocused])
  
  useEffect(() => { 
    if(bloqueado[0]==1){
      setShow2(true)
      setBloqueado[0]
      avatar(db, bloqueado[1])
      updateAvatar(db, puntaje-(puntaje%20), 0)
      //console.log("desbloqueado Avaatar ")
    }
  }, [navigation])
  
  useEffect(() => { 
    if(bloqueado[0]==1){
      setShow2(true)
      setBloqueado[0]
      avatar(db, bloqueado[1])
      updateAvatar(db, puntaje-(puntaje%20), 0)
      //console.log("desbloqueado Avaatar")
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

  //componente
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'  }}>
      <ScrollView  >
      <ModalPoup visible={show} titulo={titulo} texto={texto} imagen={imagen} botones={botones}  onChange={cerrar} />
      <ModalPoup visible={show2} titulo={titulo2} texto={texto2} imagen={imagen2} botones={botones2}  onChange={cerrar2} />
        
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