import React from "react";
import { Text, View,Button, Image, StyleSheet, Dimensions, Pressable } from "react-native";
import { Card} from 'react-native-elements'


export default function PreguntaA({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        
        <View style={styles.pregunta} >
            <Text style={{ fontWeight: "bold", fontSize: 26 }}> 
                Acá se realizará una pregunta, puede ser larga o corta, lo que importa es que se entienda
            </Text>
        </View>

        <View style={styles.cardContainer} >
          <Pressable onPressIn={() => navigation.navigate('Temas')} >
            <View style={styles.titleIntro} >
              
              <Text style={styles.titleCar} >
                a- Opción
              </Text>
            </View> 
          </Pressable>
        </View>

        <View style={styles.cardContainer} >
        <Pressable onPressIn={() => navigation.navigate('Temas')} >
            <View style={styles.titleIntro} >
            
            <Text style={styles.titleCar} >
                a- Opción
            </Text>
            </View> 
        </Pressable>
        </View>

        <View style={styles.cardContainer} >
        <Pressable onPressIn={() => navigation.navigate('Temas')} >
            <View style={styles.titleIntro} >
            
            <Text style={styles.titleCar} >
                a- Opción
            </Text>
            </View> 
        </Pressable>
        </View>

        <View style={styles.cardContainer} >
        <Pressable onPressIn={() => navigation.navigate('Temas')} >
            <View style={styles.titleIntro} >
            
            <Text style={styles.titleCar} >
                a- Opción
            </Text>
            </View> 
        </Pressable>
        </View>

 
    </View>
  )
}


const deviceWidth = Math.round(Dimensions.get('window').width)

const styles = StyleSheet.create({

  
  topCard:{ 
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
 

  titleCar:{
    fontSize: 30,
    alignContent: 'center',
    alignSelf: 'center',
    marginLeft: '10%',
  },

  titleIntro:{
    fontSize: 40,
    alignContent: 'center',
    alignSelf: 'center', 
    marginTop: '10%', 
  },
 
  pregunta:{
      margin: 20,
  },


  cardContainer:{ 
    flexDirection: 'column',
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