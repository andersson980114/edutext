import React, {useState} from 'react'
import { Text, View, StyleSheet, Dimensions, Pressable } from "react-native";


export default function Respuesta({item, texto, correctaR, pres, onChange}) {
    
  const [color, setColor] = useState("#EBEBEB")
  const [border, setBorder] = useState("#EBEBEB")

  
  const correcta = (opcion) => {
    console.log(opcion[0])
    if(!pres){
        if(correctaR){
            setColor("#ACF6AB")
            setBorder("#16B20C")
        }else {
            setColor("#ED735B")
            setBorder("#D32300") 
        }
        
        onChange(opcion)
    }
  }

  return (
    <View style={{
        width: deviceWidth - 35, 
        borderWidth: 3,
        borderRadius: 15,
        backgroundColor: color,
        borderColor: border,
        shadowOffset: {
          width: 5,
          height: 5,
        },
        shadowColor:'#000',
        shadowOpacity: 0.75,
        shadowRadius: 5,
        elevation: 7,
        margin: 10, 
      }} >
        <Pressable onPress={() => correcta([correctaR, texto])} >   
            <Text style={styles.titleCar} >
              {item} - {texto}
            </Text> 
        </Pressable>
      </View>
  )
}



const deviceWidth = Math.round(Dimensions.get('window').width)

const styles = StyleSheet.create({
  
  titleCar:{
    fontSize: 30,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  })