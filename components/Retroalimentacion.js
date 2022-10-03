import React, {useState, useEffect} from 'react'
import { Text, View,Button, Image, StyleSheet, Dimensions, Pressable } from "react-native";
import Siguiente from './Siguiente';

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const ANCHO_CONTENEDOR = width * 0.9;
const ALTURA_CONTENEDOR = height*0.9;

export default function Retroalimentacion({respuesta, estado, navigation}) {
  

  

    if(estado){
        return (
          <View>
            <View style={{
                width: deviceWidth - 35, 
                borderWidth: 3,
                borderRadius: 15,
                backgroundColor: respuesta ? '#ACF6AB' : '#ED735B',
                borderColor: respuesta? '#16B20C' : '#D32300',
                shadowOffset: {
                  width: 5,
                  height: 5,
                },
                shadowColor:'#000',
                shadowOpacity: 0.75,
                shadowRadius: 5,
                elevation: 7,
                margin: 5,
                position: 'absolute',
                top: -30,
                left: -width/2 +10
                
              }}>
                <Text style={styles.retoText}>{respuesta ? "Respuesta correcta" : "Error, la respuesta es incorrecta" }</Text>
          
            </View>
            <View style={styles.boton}>
              <Siguiente cantidad={0} id={0} prueba={true} visto={true} navigation={navigation} />
            </View>
  
          </View>
        )
    }
    return(<View></View>)
}
 


const deviceWidth = Math.round(Dimensions.get('window').width)

const styles = StyleSheet.create({

  
  retoText:{
    fontSize: 23,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },

  
  notificacion:{
    height: '10%', 
    
  },

  boton:{
    position: 'absolute',
    left:30 ,
    top:  30
  },
  })