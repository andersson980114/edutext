import React, {useState,useEffect} from 'react'
import {View, StyleSheet, Text, Pressable, Dimensions,TouchableOpacity} from 'react-native'
import Respuesta from '../components/Respuesta.js'

//componente correspondiente a las preguntas de falso y verdadero.
export default function PreguntaOpciones({navigation, onChange, tema, index, pres}) {
     
    const [presi, setPress] = useState(pres)  

    //callback
    const correcta = (opcion) => {     
        setPress(true)
        onChange(opcion)
    } 

    //retornamos el componente
    return (
        <View>
            <View style={styles.pregunta} >
                <Text  allowFontScaling = {false} style={styles.textPregunta}> 
                {tema[index].Pregunta}
                </Text>
            </View>

            <View style={styles.opciones}>
            {
                tema[index].Opciones.map((item, key) => {
                    return(
                    <View key={key}> 
                        <Respuesta    onChange={correcta} item={item.item} texto={item.text} correctaR={item.correcta}  pres={pres} navigation={navigation} />  
                    </View>
                    )
                })
            } 
            </View>
        </View>
    )
}

const deviceWidth = Math.round(Dimensions.get('window').width)

const styles = StyleSheet.create({

  pregunta:{  
    alignItems: 'center', 
    height: '25%',
  },

  textPregunta:{
    fontWeight: "bold", 
    fontSize: 26,    
    paddingHorizontal:5,  
  },
  opciones:{
    height: '55%', 
  },
 
  })