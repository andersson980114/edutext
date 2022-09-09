import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, Image, Dimensions, Pressable} from "react-native";


export default function OnboardingScreen({navigation})  {
   

  return (
    <View  style={Styles.container}>    
            <View style={Styles.mensajes}>
              <View style={Styles.Bienvenido}>
                <Pressable onPress={()=> navigation.navigate('Register')}>
                  <Text style={Styles.textUser}>¡HOLA!</Text>
                  <Text style={Styles.textUser}>Bienvenido a EDUTEXT</Text>
                </Pressable>
              </View>

              <View style={Styles.info}>
                  <Pressable onPress={()=> navigation.navigate('Register')}>
                    <Text Text style={Styles.textInfo}>Aquí aprenderás a identificar e implementar los procesadores de textos que mas requieres en la actualidad</Text> 
                  </Pressable>
              </View>

              <View style={Styles.info}>
                <Pressable onPress={()=> navigation.navigate('Register')}>
                  <Text style={Styles.textInfo}>¡Ingresa ya! Completa los desafios y obtén las reco m pe nsas</Text> 
                </Pressable>
              </View>

            </View>  
    </View>

  )
}



const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(82, 172, 185, 0.61)'
  }, 

  mensajes: {
    flex: 1,
    marginTop:'30%',
  },
  textUser:{
    fontSize:40,  
    marginLeft: '10%',
  }, 
  Bienvenido:{
    backgroundColor:"#FCFFFD",
    
    height: 150,
    width: 310, 
  },
  info:{
    marginTop:20,
    backgroundColor:"#FCFFFD",
    width: 310,  
  },
  textInfo:{
    fontSize:30,  
    marginLeft: '10%',
  },
});