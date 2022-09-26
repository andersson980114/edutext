import React, {useState} from 'react'
import {View, StyleSheet, Text, Pressable, Dimensions,TouchableOpacity} from 'react-native'
import Respuesta from '../components/Respuesta.js'

export default function PreguntaOpciones({onChange, tema, index, pres}) {
    
    
    const [presi, setPress] = useState(pres)  

    const correcta = (opcion) => { 
        setPress(true)   
        onChange(opcion)
    }
    return (
        <View>
            <View style={styles.pregunta} >
                <Text style={styles.textPregunta}> 
                {tema[index].Pregunta}
                </Text>
            </View>

            <View style={styles.opciones}>
            {
                tema[index].Opciones.map((item, key) => {
                    return(
                    <View key={key}>
                        <Pressable  >  
                            <Respuesta    onChange={correcta} item={item.item} texto={item.text} correctaR={item.correcta}  pres={presi}/> 
                        </Pressable>
                        
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
    justifyContent: 'center',
    height: '25%',
  },

  textPregunta:{
    fontWeight: "bold", 
    fontSize: 26,   
    alignItems: 'center',
    justifyContent: 'center',
  },
  opciones:{
    height: '55%', 
  },
 
  })