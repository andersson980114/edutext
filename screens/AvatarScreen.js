import React,{useEffect, useState} from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import * as data from '../Data/avatars.json';



const Avatars = [
  {
      id: 0,
      url: require("../assets/avatarAssets/Neutro.png"),
      Bloqueado: true
  },
  {
      id: 1,
      url: require("../assets/avatarAssets/Monroe.png"),
      Bloqueado: true
  },
  {
      id: 2,
      url:  require("../assets/avatarAssets/Coraline.png"),
      Bloqueado: true
  },
  {
      id: 3,
      url: require("../assets/avatarAssets/Queen.png" ),
      Bloqueado: true
  },
  {
      id: 4,
      url:  require("../assets/avatarAssets/Gamora.png"),
      Bloqueado: true
  },
  {
      id: 5,
      url:  require("../assets/avatarAssets/Keanu.png"),
      Bloqueado: true
  },
  {
      id: 6,
      url: require("../assets/avatarAssets/Isabel.png") ,
      Bloqueado: true
  },
  {
      id: 7,
      url: require("../assets/avatarAssets/Jackson.png" ),
      Bloqueado: true
  },
  {
      id: 8,
      url: require("../assets/avatarAssets/Tiffany.png") ,
      Bloqueado: true
  },
  {
      id: 9,
      url:  require("../assets/avatarAssets/Queen.png"),
      Bloqueado: true
  },
  {
      id: 10,
      url:  require("../assets/avatarAssets/Monroe.png"),
      Bloqueado: true
  },
  {
      id: 11,
      url:  require("../assets/avatarAssets/Neutro.png"),
      Bloqueado: true
  }
  
]



export default function AvatarScreen({}) {  
  const avatar = data.Avatars

  return (
    <View  style={Styles.container}> 
        <View style={Styles.topContainer}>
          <View style={Styles.Ubox}></View> 
          <Text style={Styles.textUser}>User Name</Text>
        </View>
        <Text style={Styles.textUser}>Mis Avatares</Text>
        <View style={Styles.boxContainer}>
          {
            avatar.map((item,  key) => { 
              const avat = encodeURI(item.url)
              
              return(
                <Image style={Styles.box} key={key} source={{require: avat}}></Image> 
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