import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, Image, Dimensions, Pressable, Button, Animated} from "react-native";
import {  } from "react-native-elements";


export default function OnboardingScreen({navigation})  {
   

  return (
    <View  style={Styles.container}>    
            <View style={Styles.mensajes}>
              <Animated.View style={Styles.Bienvenido}> 
                  <Text style={Styles.textUser}>¡HOLA!</Text>
                  <Text style={Styles.textUser}>Bienvenido a EDUTEXT</Text> 
              </Animated.View>

              <Animated.View style={Styles.info}> 
                    <Text Text style={Styles.textInfo}>Aquí aprenderás a identificar e implementar los procesadores de textos que mas requieres en la actualidad</Text>  
              </Animated.View>

              <Animated.View style={Styles.info}> 
                  <Text style={Styles.textInfo}>¡Ingresa ya! Completa los desafios y obtén las reco m pe nsas</Text>  
              </Animated.View>

              <Animated.View>
                <Button title="Iniciar Aventura" onPress={() => navigation.navigate('Register')} />
              </Animated.View>
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