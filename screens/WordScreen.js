import React from "react";
import { Text, View,Button, Image, StyleSheet, Dimensions, Pressable } from "react-native";
import { Card} from 'react-native-elements'


export default function WordScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        
        <View style={styles.cardContainer} >
          <Pressable onPressIn={() => navigation.navigate('Temas')} >
            <View style={styles.topCard} > 
              <Text style={styles.titleIntro} >
                INTRODUCCIÓN
              </Text>
            </View>
            <View  style={styles.bottomCard} >
              <View style={styles.ProgresCard}>
              </View>
            </View>
          </Pressable>
        </View>

        <View style={styles.cardContainer} >
          <Pressable onPressIn={() => navigation.navigate('Temas')} >
            <View style={styles.topCard} >
              <View style={styles.imgContent}>
                <Image 
                  resizeMode="cover"
                  source={require('../assets/screenAssets/bronce.png')}
                  style={styles.imgCard}
                  />
              </View>
              <Text style={styles.titleCar} >
                BRONCE
              </Text>
            </View>
            <View  style={styles.bottomCard} >
              <View style={styles.ProgresCard}>
              </View>
            </View>
          </Pressable>
        </View>

        <View style={styles.cardContainer} >
          <Pressable onPressIn={() => navigation.navigate('Temas')} >
            <View style={styles.topCard} >
              <View style={styles.imgContent}>
                <Image 
                  resizeMode="cover"
                  style={styles.imgCard}
                  source={require('../assets/screenAssets/Plata.png')}
                  />
              </View>
              <Text style={styles.titleCar} >
               PLATA
              </Text>
            </View>
            <View  style={styles.bottomCard} >
              <View style={styles.ProgresCard}>
              </View>
            </View>
          </Pressable>
        </View>

        <View style={styles.cardContainer} >
          <Pressable onPressIn={() => navigation.navigate('Temas')} >
            <View style={styles.topCard} >
              <View style={styles.imgContent}>
                <Image 
                  resizeMode="cover"
                  source={require('../assets/screenAssets/oro.png')}
                  style={styles.imgCard}
                  />
              </View>
              <Text style={styles.titleCar} >
                ORO
              </Text>
            </View>
            <View  style={styles.bottomCard} >
              <View style={styles.ProgresCard}>
              </View>
            </View>
          </Pressable>
        </View>

        <View style={styles.cardContainer} >
          <Pressable onPressIn={() => navigation.navigate('Temas')} >
            <View style={styles.topCard} >
              <View style={styles.imgContent}>
                <Image 
                  resizeMode="cover"
                  source={require('../assets/screenAssets/diamante.png')}
                  style={styles.imgCard}
                  />
              </View>
              <Text style={styles.titleCar} >
               DIAMANTE
              </Text>
            </View>
            <View  style={styles.bottomCard} >
              <View style={styles.ProgresCard}>
              </View>
            </View>
          </Pressable>
        </View>
  
    </View>
  )
}

const deviceWidth = (Dimensions.get("window").height) * 0.5
const height = (Dimensions.get("window").height) * 0.5;

const ANCHO_CONTENEDOR = (height / deviceWidth ) * 90 ; 
const ALTO_CONTENEDOR = (height / deviceWidth ) * 90 ;  

const styles = StyleSheet.create({
  topCard:{ 
    height: '90%',
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  imgCard:{
    width: ANCHO_CONTENEDOR,
    height: ALTO_CONTENEDOR,  
    margin: '10%',
  },

  imgContent:{
    width: '30%',
  },

  titleCar:{
    fontSize: 40, 
    width: '70%',
    alignContent: 'center',
    alignSelf: 'center', 
  },

  titleIntro:{
    height: '90%',
    marginTop: '10%',
    fontSize: 40,
    alignContent: 'center',
    alignSelf: 'center',  
    height: 84,
  },


  bottomCard:{   
    height: '10%',
    width: '100%',
    backgroundColor: '#C4C4C4',
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    
  },

  ProgresCard:{ 
    height: '100%',
    width: '50%',
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    backgroundColor: '#33FF00',
  },

  cardContainer:{
    flex: 1,
    flexDirection: 'column',
    width: deviceWidth - 35,
    height: ALTO_CONTENEDOR,
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