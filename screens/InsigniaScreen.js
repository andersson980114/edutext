import React from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";

const Insignias = [
  {
      id: 0,
      url: require("../assets/insigniasAssets/RegistroExito.png"),
      Bloqueado: true
  },
  {
      id: 1,
      url: require("../assets/insigniasAssets/PrimerCambioAvatar.png"),
      Bloqueado: true
  },
  {
      id: 2,
      url:  require("../assets/insigniasAssets/PrimerDesafio.png"),
      Bloqueado: true
  },
  {
      id: 3,
      url: require("../assets/insigniasAssets/BronceWord.png" ),
      Bloqueado: true
  },
  {
      id: 4,
      url:  require("../assets/insigniasAssets/CincoDesafio.png"),
      Bloqueado: true
  },
  {
      id: 5,
      url:  require("../assets/insigniasAssets/DesbloqueoAvatares.png"),
      Bloqueado: true
  },
  {
      id: 6,
      url: require("../assets/insigniasAssets/DiezDesafio.png") ,
      Bloqueado: true
  },
  {
      id: 7,
      url: require("../assets/insigniasAssets/HoraApp.png" ),
      Bloqueado: true
  },
  {
      id: 8,
      url: require("../assets/insigniasAssets/NivelMenos24H.png") ,
      Bloqueado: true
  },
  {
      id: 9,
      url:  require("../assets/insigniasAssets/OroWord.png"),
      Bloqueado: true
  },
  {
      id: 10,
      url:  require("../assets/insigniasAssets/PlataWord.png"),
      Bloqueado: true
  },
  {
      id: 11,
      url:  require("../assets/insigniasAssets/TresDesafio.png"),
      Bloqueado: true
  }
  
]



export default function InsigniaScreen() {
  return (
    <View  style={Styles.container}>  
        <Text style={Styles.textUser}>Mis Insignias</Text>
        <View style={Styles.boxContainer}>
          {
            Insignias.map((item,  key) => { 
              return(
                <Image style={Styles.box} key={key} source={item.url}></Image> 
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
const ALTO_CONTENEDOR = (height / width ) *60 ; 
const Espacio = (height / width ) *3 ; 

const Styles = StyleSheet.create({
  container: {
    flex: 1,  
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
  box:{
    height: ALTO_CONTENEDOR,
    width: ANCHO_CONTENEDOR,  
    backgroundColor: '#D9D9D9',  
    borderRadius: 20,
    margin:  Espacio, 
    borderColor: "#2C6B80",
    borderWidth: 3
  },

});