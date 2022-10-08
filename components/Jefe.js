import React,{useState} from 'react'
import { View, Image, Text, TouchableOpacity,StyleSheet, Dimensions, } from 'react-native'
import { UseInfoTemaContext } from '../Contexts/InfoProvider';

const jefes = [
    require("../assets/screenAssets/JefeIntro.png"),
    require("../assets/screenAssets/JefeBronce.png"),
    require("../assets/screenAssets/JefePlata.png"),
    require("../assets/screenAssets/JefeOro.png"),]

export default function Jefe({ nivel,nombre, Onchage}) {
    const jefe = jefes[nombre[1]]
    const handleChange = () =>{
        Onchage(nombre)
    } 
    if(nivel!="Favoritos"){
        return (
            <View  >
                <TouchableOpacity onPress={() => handleChange()}  style={styles.cardContainer}>
                
                    <Text style={styles.titleCar} >
                        Prueba
                    </Text>
     
                    <Image 
                        resizeMode="cover"
                        source={jefe}
                        style={styles.imgCard}
                    />   
    
                </TouchableOpacity>
            </View> 
        )
    }else{
        return(
            <View></View>
        )
    }

}

const deviceWidth = Math.round(Dimensions.get('window').width)
const styles = StyleSheet.create({
  imgCard:{
    width: 83,
    height: 70,  
      
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
    shadowColor:'#262322',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 7,  
    margin: 12,
  },

  })
  