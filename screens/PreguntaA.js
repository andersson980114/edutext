import React from "react";
import { Text, View,Button, Image, StyleSheet, Dimensions, Pressable } from "react-native";
import { Card} from 'react-native-elements'


export default function PreguntaA({ navigation }) {
  return (
    <View style={styles.container}>
        
        <View style={styles.pregunta} >
            <Text style={styles.textPregunta}> 
                Acá se realizará una pregunta, puede ser larga o corta, lo que importa es que se entienda.
                En este ejemplo se alargará lo mas posibleasssssssssssssssssssssssssssssssssssssssssssssas
            </Text>
        </View>

        <View style={styles.opciones}>
          
          <View style={styles.cardContainer} >
            <Pressable onPressIn={() => navigation.navigate('Temas')} >   
                <Text style={styles.titleCar} >
                  a- Opción
                </Text> 
            </Pressable>
          </View>

          <View style={styles.cardContainer} >
            <Pressable onPressIn={() => navigation.navigate('Temas')} >   
                <Text style={styles.titleCar} >
                  b- Opción
                </Text> 
            </Pressable>
          </View>

          <View style={styles.cardContainer} >
            <Pressable onPressIn={() => navigation.navigate('Temas')} >   
                <Text style={styles.titleCar} >
                  c- Opción
                </Text> 
            </Pressable>
          </View>

          <View style={styles.cardContainer} >
            <Pressable onPressIn={() => navigation.navigate('Temas')} >   
                <Text style={styles.titleCar} >
                  d- Opción
                </Text> 
            </Pressable>
          </View>

        </View>
 
    </View>
  )
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

  opciones:{
     
    height: '60%', 
  },
 
  pregunta:{  
    
    alignItems: 'center',
    justifyContent: 'center',
    height: '30%',
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

  })