import React , { useEffect } from "react";
import { Text, View,ScrollView, Image, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import * as data from '../Data/wordTemas.json';
import { UseInfoContext, UseTemaContext} from "../Contexts/InfoProvider";

export default function TemasScreen({navigation }) {
  const {opcion, nivel, tema} = UseInfoContext();
  const {mytema, handleTema} = UseTemaContext();
  const favorite = require('../assets/screenAssets/favorite.png') ;
  const noFavorite =  require('../assets/screenAssets/noFavorite.png');
  const temas = data.Temas

  const handleChange = (nombre) => {
    handleTema(nombre)
    navigation.navigate('Contenido')
  }
  
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ScrollView >
        {
          temas.map((item, key) => {
            //console.log(item.Nivel, ", ", item.Opcion)
            //console.log(nivel[1], " - ", opcion[1])
            if(item.Nivel == nivel[1] && item.Opcion == opcion[1] ){
             return(
                <View key={key} >
                  <TouchableOpacity onPress={() => handleChange([item.Nombre, item.id])}  style={styles.cardContainer}>
                    
                    <Text style={styles.titleCar} >
                        {item.Nombre}
                    </Text>

                    <Image 
                        resizeMode="cover"
                        source={item.Favorito ? favorite: noFavorite}
                        style={styles.imgCard}
                    /> 
                  </TouchableOpacity>
                </View> 
             )
            }
          })
        }
      </ScrollView>

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
  