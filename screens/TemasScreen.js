import React from "react";
import { Text, View,Button, Image, StyleSheet, Dimensions, Pressable } from "react-native";
import { Card} from 'react-native-elements'


export default function TemasScreen({navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

        <View  >
          <Pressable onPressIn={() => navigation.navigate('Contenido')}  style={styles.cardContainer}>
            
            <Text style={styles.titleCar} >
                ABRIR WORD
            </Text>

            <Image 
                resizeMode="cover"
                source={require('../assets/screenAssets/noFavorite.png')}
                style={styles.imgCard}
            /> 
          </Pressable>
        </View> 

        <View  >
          <Pressable onPressIn={() => navigation.navigate('Contenido')}  style={styles.cardContainer}>
            
            <Text style={styles.titleCar} >
                ABRIR WORD
            </Text>

            <Image 
                resizeMode="cover"
                source={require('../assets/screenAssets/noFavorite.png')}
                style={styles.imgCard}
            /> 
          </Pressable>
        </View> 

        <View  >
          <Pressable onPressIn={() => navigation.navigate('Contenido')}  style={styles.cardContainer}>
            
            <Text style={styles.titleCar} >
                ABRIR WORD
            </Text>

            <Image 
                resizeMode="cover"
                source={require('../assets/screenAssets/favorite.png')}
                style={styles.imgCard}
            /> 
          </Pressable>
        </View> 
        

    </View>
  )
}

const deviceWidth = Math.round(Dimensions.get('window').width)

const styles = StyleSheet.create({


  imgCard:{
    width: 43,
    height: 40,  
      
  },

  titleCar:{
    fontSize: 40,  
    marginTop: '20%', 
  },
 
  cardContainer:{   
    flexWrap: 'wrap',
    flexDirection: 'row', 
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: deviceWidth - 35,
    height: 140, 
    backgroundColor: '#EBEBEB',
    borderRadius: 15,
    shadowColor:'#000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.75,
    shadowRadius: 5,
    elevation: 10,  
    margin: 10,
  },

  })
  