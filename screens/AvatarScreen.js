import React,{useEffect, useState} from "react";
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, Alert } from "react-native";
import * as data from '../Data/avatars.json';
import { Avatars } from "../Data/imagenes";
import {conectionDb} from "../utils/db"

export default function AvatarScreen({}) {  
  const avatar = data.Avatars
  const [user, setUser] = useState(0)//imagen de usuario


  useEffect(() => {
    avatar.map((item) => {
      if(item.Selected){
        setUser(item.id)
      }
    })
  }, [])
  
  const cambioUser =(id, bloqueado) =>{
    if(!bloqueado){
      Alert.alert(
        'Seleccionar Avatar',
        'Usted ha cambiado de avatar',
        [
          {
            text: 'OK', 
          }
        ],
        {cancelable: false}
      ); 
      setUser(id)
    }else{
      Alert.alert(
        'Avatar Bloqueado',
        'Este avatar aun no puede ser elegido',
        [
          {
            text: 'OK', 
          }
        ],
        {cancelable: false}
      ); 
    }
  }



  return (
    <View  style={Styles.container}> 
        <View style={Styles.topContainer}>
          <Image source={Avatars[user].url} style={Styles.Ubox}></Image> 
          <Text style={Styles.textUser}></Text>
        </View>
        <Text style={Styles.textUser}>Mis Avatares</Text>
        <View style={Styles.boxContainer}>
          {
            avatar.map((item) => { 
              let url=""
              if(item.Bloqueado){
                url = require("../assets/screenAssets/Bloqueado.png")
              }else{
                url = Avatars[item.id].url
              }
              return(
                <View key={item.id}>
                  <TouchableOpacity onPress={() => cambioUser(item.id, item.Bloqueado)}>
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
    fontSize:40,  
    marginLeft: '10%',
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