import React,{useEffect, useState} from "react";
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, Alert, BackHandler } from "react-native";
import { Avatars } from "../Data/imagenes";
import { UseDbContext } from '../Contexts/DataContext'; 
import { changeAvatar, getUser } from "../utils/userModel";
import { getAvatar } from "../utils/avatarModel";
import { UsePuntajeContext } from "../Contexts/InfoProvider";
import { useIsFocused } from '@react-navigation/native';       
import * as data from '../Data/avatars.json';                         
import ModalPoup from "../components/ModalPoup"; 
 
//Screen encargada de mostrar los avatares
export default function AvatarScreen({ navigation }) {  
  //context
  const {Puntaje, handlePuntaje} = UsePuntajeContext()
  const {db, count} = UseDbContext()
  //useState
  const [user, setUser] = useState(0)//imagen de usuario
  const [users, setUsers] = useState("")
  const [puntaje, setPuntaje] = useState(0) 
  const [show, setShow] = useState(false)
  const [titulo, setTitulo] = useState("")
  const [texto, setTexto] = useState("")
  const [imagen, setImagen] = useState(require("../assets/screenAssets/success.png"))
  const [botones, setBotones] = useState([])
  const [success, setSuccess] = useState(false)
  const [Avatares, setAvatares] = useState([])
  //var
  const isFocused = useIsFocused();
  const avatar = data.Avatars
  useEffect(() => {
    getUser(db, setUsers, setUser,setPuntaje)
    getAvatar(db, setAvatares) 
     
  }, [])
  
  //salir de la app
  useEffect(() =>
    navigation.addListener('beforeRemove', (e) => {
      const action = e.data.action; 

      e.preventDefault();
      //navigation.dispatch(action),
      Alert.alert(
        '¡Cuidado!',
        '¿Deseas salir de EduText?',
        [
          { text: "No", style: 'cancel', onPress: () => {} },
          {
            text: 'Si',
            style: 'destructive',
            onPress: () => BackHandler.exitApp(),
          },
        ]
      );

  }),
  [navigation])

  //Asignar el avatar del usuario
  const getUserId = (opcion) =>{
    if(opcion[0]){
      setUser(opcion[1])
      changeAvatar(db, opcion[1]+1)
    } 
    setShow(false)
  }
   
  //modal cambio de avatar de usuario
  const cambioUser =(id, bloqueado) =>{
    if(!bloqueado && user != id){
      setShow(true)
      setTitulo('Cambio de Avatar')
      setTexto('¿Deseas cambiar de avatar?')
      setImagen(require("../assets/screenAssets/cambioUser.png"))
      setSuccess(true)
      setBotones([
        {
          texto: "Cancelar",
          id: id,  
          success: false,
          boton: "danger"
        },
        {
          texto: "Aceptar",
          id: id, 
          success: true,
          boton: "success"
          
        },
      ])
    }else if(bloqueado){
      setShow(true)
      setTitulo('Avatar Bloqueado')
      setTexto('Este avatar aun no puede ser elegido')
      setImagen(require("../assets/screenAssets/prohibited.png"))
      setSuccess(true)
      setBotones([
        {
          texto: "Aceptar",
          id: id,  
          success: false,
          boton: "danger"

        }
      ])
    } 
  }
 
  //componente
  return (
    <View  style={Styles.container}> 
        <ModalPoup visible={show} titulo={titulo} texto={texto} imagen={imagen} botones={botones}  onChange={getUserId} />
        <View style={Styles.topContainer}>
          <Image source={Avatars[user].url} style={Styles.Ubox}></Image> 
          <View>
            <Text  allowFontScaling = {false} style={Styles.textUser}>{users}</Text>
            <Text  allowFontScaling = {false} style={Styles.textPuntos}>{puntaje}pts.</Text>
          </View>
        </View>
        <Text  allowFontScaling = {false} style={Styles.textUser}>Mis Avatares</Text>
        <View style={Styles.boxContainer}>
          {
            Avatares.map((item) => { 
              let url=""
              let id = item.id -1
              let bloqueado; 
              if(item.Bloqueado>0){bloqueado=true}else{bloqueado=false}
              if(item.Bloqueado>0 || !!bloqueado){
                url = require("../assets/screenAssets/Bloqueado.png")
              }else{
                url = Avatars[id].url
              }
              return(
                <View key={item.id}>
                  <TouchableOpacity onPress={() => cambioUser(id, bloqueado)}>
                    <Image source={url} style={Styles.box} ></Image>  
                  </TouchableOpacity>
                </View>
              );
            })
          } 
        </View>
        
    </View>
  )
}

const width =( Dimensions.get("window").width) * 0.5 ;
const height = (Dimensions.get("window").height) * 0.5;

const ANCHO_CONTENEDOR = (height / width ) *50 ; 
const Espacio = (height / width ) *3 ; 

const Styles = StyleSheet.create({
  container: {
    flex: 1,  
  },
  topContainer:{
    width: '100%',
    height: '20%',
    padding: '5%', 
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center'
  },
  boxContainer: { 
    flex:1,
    width: '100%',
    height: '70%', 
    alignItems: 'center',
    justifyContent: 'center',   
    flexWrap: 'wrap',  
    flexDirection: 'row',  
  },
  textUser:{
    fontWeight: "bold",
    fontSize:40,  
    marginLeft: '10%',
  },
  textPuntos:{
    backgroundColor:"#2C6B80",
    textAlign: "center", 
    fontSize:20,  
    color: "#fff",
    marginLeft: '45%',
    fontWeight: "bold",
    borderRadius: 15,
    paddingHorizontal: 10
  },
  Ubox:{
    height: 100,
    width: 100,  
    backgroundColor: '#D9D9D9', 
    borderRadius: 50,
    marginTop: 10,
    borderColor: "#2C6B80",
    borderWidth: 3
  },
  box:{
    height: ANCHO_CONTENEDOR,
    width: ANCHO_CONTENEDOR,  
    backgroundColor: '#D9D9D9',  
    borderRadius: 50,
    margin:  Espacio, 
    borderColor: "#2C6B80",
    borderWidth: 3
  },

});