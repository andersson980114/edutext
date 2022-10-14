import React, {useState, useEffect, useRef} from "react";
import { StyleSheet, Text, View, Image, Alert, Dimensions, Pressable, Button, Animated} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const ANCHO_CONTENEDOR = width * 0.5;
const ALTURA_CONTENEDOR = height * 0.5;
const ESPACIO_CONTENEDOR = (width - ANCHO_CONTENEDOR) / 2;
//componente de onboarding
export default function OnboardingScreen({navigation})  {
   
  const startAnimation = useRef(new Animated.Value(0)).current;
  const endAnimation = useRef(new Animated.Value(350)).current;
  const edges = useSafeAreaInsets()
  const timeAnimation = 8000;
  
  useEffect(() => {
    setTimeout(() =>{
      Animated.sequence([
          Animated.timing(
            startAnimation,
            {
              toValue:-Dimensions.get('window').height + (edges.top + 10),
              useNativeDriver: true
            }
          ),
          Animated.timing(
            endAnimation,
            {
              toValue:-700,
              useNativeDriver: true
            }
          )
      ]) 
      .start();
    }, timeAnimation)
  }, [])

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
          onPress: () => {},
        },
      ]
    );
  
}),
[navigation])
  

  return (
    <View  style={Styles.container}>    
        <View style={Styles.mensajes}>
          <Animated.View style={{
            transform: [
              {translateY: startAnimation}
            ]
          }}>
            <View style={{
              backgroundColor:"#FCFFFD",
              height: 150,
              width: 310, 
              
            }}> 
                <Text style={Styles.textUser}>¡HOLA!</Text>
                <Text style={Styles.textUser}>Bienvenido a EDUTEXT</Text> 
            </View>

            <View style={{
              marginTop:20,
              backgroundColor:"#FCFFFD",
              width: 310,   
              }}> 
                  <Text Text style={Styles.textInfo}>Aquí aprenderás a identificar e implementar los procesadores de textos que mas requieres en la actualidad</Text>  
            </View>
            <Image  source={require("../assets/screenAssets/oboarding1.png")}
              style={{
                padding: 20,
                margin: 70,
              }}
            ></Image>
          </Animated.View>


          <Animated.View style={{
            transform: [
              {translateY: endAnimation}
            ]
          }}>
            <View style={Styles.info}> 
                <Text style={Styles.textInfo}>¡Ingresa ya! Completa los desafios y obtén las recompensas</Text>  
                <Image  source={require("../assets/screenAssets/oboarding2.png")} 
                style={{
                  margin: 15,
                  marginLeft: 20,
                }}></Image>
            </View>
  
            <Pressable style={Styles.button}  onPress={() => navigation.navigate('Register')}>
              <Text style={Styles.textBut}>
              Iniciar Aventura
              </Text>
            </Pressable> 

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
    backgroundColor:"#FCFFFD",
    width: 310, 
  },
  infod:{
      
  },
  textInfo:{
    fontSize:30,  
    marginLeft: '10%',
  }, 
  textBut:{
    fontSize:30,   
    textAlign: 'center',
    color: "#FFFFFF"
  }, 
  button:{
    backgroundColor: "#2C6B80",
    width: 150,
    textAlign: 'center',
    borderRadius: 15,
    position: 'absolute',
    top: ALTURA_CONTENEDOR,
    left: ANCHO_CONTENEDOR-75,
  }
});