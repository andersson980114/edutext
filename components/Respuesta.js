import React, {useState, useEffect} from 'react'
import { Text, View, StyleSheet, Dimensions, Pressable } from "react-native";
import { UseDbContext } from '../Contexts/DataContext';
import { UseEvaluadoContext, UsePressContext, UsePuntajeContext } from '../Contexts/InfoProvider';
import { updatePuntaje } from '../utils/userModel';


export default function Respuesta({navigation, item, texto, correctaR, pres, onChange}) {
    
  const [color, setColor] = useState("#EBEBEB")
  const [border, setBorder] = useState("#EBEBEB") 
  const [presi, setPress] = useState(pres)
  const {press, handlePress} = UsePressContext()
  const {db, count} = UseDbContext() 
  const {evaluado, handleEvaluado} = UseEvaluadoContext()
  const {puntaje, handlePuntaje} = UsePuntajeContext()

  const correcta = (opcion) => {   
    if(!press){ 
          if(correctaR ){
              setColor("#ACF6AB")
              setBorder("#16B20C")
              if(!evaluado){
                updatePuntaje(db,5)
                handlePuntaje(puntaje+5)}
          }else {
              setColor("#ED735B")
              setBorder("#D32300") 
          } 
        
        onChange(opcion)
    }
    setPress(true)
    handlePress(true)
  }
  
  useEffect(() => {
    if(press!=presi){
    setColor("#EBEBEB")
    setBorder("#EBEBEB") }
  }, [press])
  
    
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