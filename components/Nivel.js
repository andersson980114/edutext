import React,{ useEffect } from 'react';
import { View, Image, Text, StyleSheet, Dimensions, Pressable} from 'react-native'
import { UseCompletadoContext, UseEvaluadoContext, UseProgresoContext } from '../Contexts/InfoProvider';

const deviceWidth = (Dimensions.get("window").height) * 0.5
const height = (Dimensions.get("window").height) * 0.5;
const progres = deviceWidth-35
const ANCHO_CONTENEDOR = (height / deviceWidth ) * 90 ; 
const ALTO_CONTENEDOR = (height / deviceWidth ) * 90 ;  

export default function Nivel({ id, nivel, nombre, img, progreso, Evaluado, Completed, onChange}) { 
   
    const {evaluado, handleEvaluado} = UseEvaluadoContext()
    const {progresos, handleProgreso} = UseProgresoContext()
    const {completado, handleCompletado} = UseCompletadoContext()
    const porcentaje = progreso>=100 ? (progres*100)/100 :(progres*progreso)/100
    
    useEffect(() => {
      
      handleCompletado(Completed)
      handleProgreso(progreso)
    }, [])
    

    const handleChange = () =>{
        handleEvaluado(Evaluado)
        handleProgreso(progreso)
        handleCompletado(Completed)
        
        onChange([nivel,nombre]) 
    }

   
    if(img == null){
        return(
            <View style={styles.cardContainer} >
                <Pressable onPress={() => {handleChange()}} >
                    <View style={styles.topCard} > 
                    <Text style={styles.titleIntro} >
                    {nivel}
                    </Text>
                    </View>
                    <View  style={styles.bottomCard} >
                    <View style={{
                            height: '100%',
                            width: porcentaje,
                            borderBottomEndRadius: 20,
                            borderBottomStartRadius: 20,
                            backgroundColor: '#33FF00',
                        }}>
                        </View>
                    </View>
                </Pressable>
            </View>
        )
    }
  return (
    <View style={styles.cardContainer} >
        <Pressable onPress={() =>{handleChange()}} >
            <View style={styles.topCard} >
                <View style={styles.imgContent}>
                <Image 
                    resizeMode="cover"
                    source={img}
                    style={styles.imgCard}
                    />
                </View>
                <Text style={styles.titleCar} >
                {nivel}
                </Text>
            </View>
            <View  style={styles.bottomCard} >
                <View style={{
                    height: '100%',
                    width: porcentaje,
                    borderBottomEndRadius: 20,
                    borderBottomStartRadius: 20,
                    backgroundColor: '#33FF00',
                }}>
                </View>
            </View>
        </Pressable>
    </View>
  )
}


 

const styles = StyleSheet.create({
  topCard:{ 
    height: '90%',
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  imgCard:{
    width: ANCHO_CONTENEDOR,
    height: ALTO_CONTENEDOR,  
    margin: '10%',
  },

  imgContent:{
    width: '30%',
  },

  titleCar:{
    fontSize: 40, 
    width: '70%',
    alignContent: 'center',
    alignSelf: 'center', 
  },

  titleIntro:{
    height: '90%',
    marginTop: '10%',
    fontSize: 40,
    alignContent: 'center',
    alignSelf: 'center',  
    height: 84,
  },


  bottomCard:{   
    height: '10%',
    width: '100%',
    backgroundColor: '#C4C4C4',
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    
  },

  ProgresCard:{ 
    height: '100%',
    width: '50%',
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    backgroundColor: '#33FF00',
  },

  cardContainer:{
    flex: 1,
    flexDirection: 'column',
    width: deviceWidth - 35,
    height: ALTO_CONTENEDOR,
    backgroundColor: '#EBEBEB',
    borderRadius: 15,
    shadowColor:'#000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.75,
    shadowRadius: 5,
    elevation: 7,
    margin: 10, 
  },

  })