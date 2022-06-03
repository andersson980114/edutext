import React from "react";
import { Text, View,Button, Image, StyleSheet, Dimensions, Pressable } from "react-native";
import { Card} from 'react-native-elements'


export default function WordScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        
        <View style={styles.cardContainer} >
          <Pressable onPressIn={() => navigation.navigate('Temas')} >
            <View style={styles.titleIntro} >
              
              <Text style={styles.titleCar} >
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
              <Image 
                resizeMode="cover"
                source={require('../assets/screenAssets/bronce.png')}
                style={styles.imgCard}
                />
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
              <Image 
                resizeMode="cover"
                source={require('../assets/screenAssets/Plata.png')}
                style={styles.imgCard}
                />
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
              <Image 
                resizeMode="cover"
                source={require('../assets/screenAssets/oro.png')}
                style={styles.imgCard}
                />
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
              <Image 
                resizeMode="cover"
                source={require('../assets/screenAssets/diamante.png')}
                style={styles.imgCard}
                />
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

const deviceWidth = Math.round(Dimensions.get('window').width)

const styles = StyleSheet.create({

  
  topCard:{ 
    flexWrap: 'wrap',
    flexDirection: 'row'
  },

  imgCard:{
    width: 110,
    height: 120,
    alignContent: 'flex-start',
    alignSelf: 'flex-start',
  },

  titleCar:{
    fontSize: 40,
    alignContent: 'center',
    alignSelf: 'center',
    marginLeft: '10%',
  },

  titleIntro:{
    fontSize: 40,
    alignContent: 'center',
    alignSelf: 'center', 
    marginTop: '10%',
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
    height: 160,
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