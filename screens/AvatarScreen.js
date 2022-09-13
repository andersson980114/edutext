import React from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";

export default function AvatarScreen({}) {
  return (
    <View  style={Styles.container}> 
        <View style={Styles.topContainer}>
          <View style={Styles.Ubox}></View> 
          <Text style={Styles.textUser}>User Name</Text>
        </View>
        <Text style={Styles.textUser}>Mis Avatares</Text>
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
  },

});