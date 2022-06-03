import React from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";;


export default function InsigniaScreen() {
  return (
    <View  style={Styles.container}>  
        <Text style={Styles.textUser}>Mis Insignias</Text>
        <View style={Styles.boxContainer}>
          <Image style={Styles.box}></Image> 
          <Image style={Styles.box}></Image> 
          <Image style={Styles.box}></Image> 
          <Image style={Styles.box}></Image> 
          <Image style={Styles.box}></Image> 
          <Image style={Styles.box}></Image> 
          <Image style={Styles.box}></Image> 
          <Image style={Styles.box}></Image> 
          <Image style={Styles.box}></Image> 
          <Image style={Styles.box}></Image> 
          <Image style={Styles.box}></Image> 
          <Image style={Styles.box}></Image> 
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
  },

});