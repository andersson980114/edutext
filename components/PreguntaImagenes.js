import React, {useState,useEffect} from 'react' 
import {View, StyleSheet, Text, Pressable, Dimensions,TouchableOpacity} from 'react-native'
import { UsePressContext } from '../Contexts/InfoProvider';
import Respuesta from '../components/Respuesta.js'
import Completado from './Completado.js'

//componente correspondiente a las preguntas de completar la frase
export default function PreguntaImagenes({navigation ,onChange, tema, index, pres}) {
    
    
    const [presi, setPress] = useState(pres)  
    const [texto, setTexto] = useState("            ")
    const {press, handlePress} = UsePressContext()

    //callback
    const correcta = (opcion) => {  
        setPress(true) 
        setTexto(opcion[1])
        onChange(opcion)
    }
    
    useEffect(() => {
        if(press!=presi){
            setTexto("            ") }
      }, [press])
      

    //retornamos el componente
    return (
        <View>
            <View style={styles.pregunta} >
                <Text allowFontScaling = {false}  style={styles.textPregunta}> 
                    {tema[index].Inicio} <Completado texto={texto}/> {tema[index].Fin}
                </Text>
            </View>

            <View style={styles.opciones}>
            {
                tema[index].Opciones.map((item, key) => {
                    return(
                    <View key={key}  > 
                        <Respuesta    onChange={correcta}   item={item.item} texto={item.text} correctaR={item.correcta} navigation={navigation}  pres={pres}/>  
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
    paddingHorizontal:4,  
  },
  opciones:{
    height: '55%', 
  },
 
  })