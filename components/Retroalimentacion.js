import React from 'react'
import { Text, View,Button, Image, StyleSheet, Dimensions, Pressable } from "react-native";

export default function Retroalimentacion({respuesta, estado}) {
    if(estado){
        return (
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
              
            }}>
              <Text style={styles.retoText}>{respuesta ? "Respuesta correcta" : "Error, la respuesta es incorrecta" }</Text>
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
 
  })