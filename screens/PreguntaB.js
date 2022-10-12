import React,{useState, useEffect} from "react";
import { Text, View,Button, Alert, StyleSheet, Dimensions, Pressable } from "react-native";
import { Card} from 'react-native-elements'
import * as data from  '../Data/preguntas.json'
import Retroalimentacion from "../components/Retroalimentacion";
import {UseInfoContext, UseItemsContext, UsePreguntaContext, UsePressContext} from '../Contexts/InfoProvider';
import PreguntaOpciones from '../components/PreguntaOpciones.js'
import PreguntaFV from '../components/PreguntaFV.js'
import PreguntaImagenes from '../components/PreguntaImagenes.js'
import ModalPoup from "../components/ModalPoup";
import { updatePuntaje } from "../utils/userModel";

let tema;
let index;
let tipo; 
export default function PreguntaB({ navigation }) {
  const {pregunta, setPregunta} = UsePreguntaContext() 
  const {press, handlePress} = UsePressContext()
  const [estado, setEstado] = useState(false) //si se activo una respuesta o no
  const [respuesta, setRespuesta] = useState(false)
  const [pres, setPress] = useState(false)
  //
  const [show, setShow] = useState(false)
  const [titulo, setTitulo] = useState("")
  const [texto, setTexto] = useState("")
  const [imagen, setImagen] = useState(require("../assets/screenAssets/correcto.png"))
  const [botones, setBotones] = useState([])
  const [success, setSuccess] = useState(false)
  const {items, handleItems} = UseItemsContext()

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

  const cerrrar = () =>{  
    setShow(false)
  }
  
  const setRetro = (respuesta) =>{
    if(!respuesta){  
      const repite = {val: pregunta[1], estado:false}
      let actual = items
      actual.unshift(repite)  
      setShow(true)
      setTitulo('Incorrecto')
      setTexto(tema[index].Retro)
      setImagen(require("../assets/screenAssets/incorrecto.png"))
      setSuccess(true)
      setBotones([
        {
          texto: "Aceptar",
          id: 0,  
          success: false,
          boton: "danger"

        }
      ])
    }
  }

  useEffect(() => { 
    handlePress(false)
    setEstado(false)  
  }, [ tema])
  
  const correcta = (opcion) => {
    handlePress(true) 
    setPress(true)
    setEstado(true)
    setRespuesta(opcion[0])  
    setRetro(opcion[0])
    //console.log("Press:",pres);
  }
 
  useEffect(() => {
    handlePress(false)
    setPress(false) 
    setEstado(false)
  }, [index])
  
  useEffect(() => { 
    setPress(false)
    handlePress(false)
  }, [])
   

  useEffect(() =>
    navigation.addListener('beforeRemove', (e) => {
        const action = e.data.action; 
        //console.log("validate: ",pres)
        e.preventDefault();
        //console.log("word");
        navigation.dispatch(action)
        /*
        if(estado){ 
        
            Alert.alert(
                '¡Cuidado!',
                'No puedes salir sin contestar la pregunta',
                [
                { text: "Aceptar", style: 'destructive', onPress: () => {} },
                ]
            );
        }else{
            navigation.dispatch(action)
        }
        */
    }
    
  ),
  [navigation])
  if(tipo == 0){
    return (
      <View style={styles.container}>

          <PreguntaOpciones onChange={correcta} tema={tema} index={index} pres={pres} navigation={navigation}/>

          <View>
              <ModalPoup visible={show} titulo={titulo} texto={texto} imagen={imagen} botones={botones}  onChange={cerrrar} />
          </View>
          
          <View style={styles.notificacion}  >
            <Retroalimentacion respuesta={respuesta} estado={estado} navigation={navigation} pres={pres} />
          </View>
   
      </View>
    )
    
  }else if(tipo == 1){
    return (
      <View style={styles.container}>
          
          <View>
              <ModalPoup visible={show} titulo={titulo} texto={texto} imagen={imagen} botones={botones}  onChange={cerrrar} />
          </View>
          
          <PreguntaFV onChange={correcta} tema={tema} index={index} pres={pres} navigation={navigation}/>
          
          <View style={styles.notificacion}  >
            <Retroalimentacion respuesta={respuesta} estado={estado} navigation={navigation} pres={pres} />
          </View>
   
      </View>
    )
  }else{
    return (
      <View style={styles.container}>
          
          <View>
              <ModalPoup visible={show} titulo={titulo} texto={texto} imagen={imagen} botones={botones}  onChange={cerrrar} />
          </View>
          
          <PreguntaImagenes onChange={correcta} tema={tema} index={index} pres={pres} navigation={navigation}/>
          
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