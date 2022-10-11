import React,{useState} from 'react'
import { View, Image, Text, TouchableOpacity,StyleSheet, Dimensions, } from 'react-native'
import { UseItemsContext, UsePreguntaContext, UseOpcionContext } from '../Contexts/InfoProvider';

const jefes = [
    require("../assets/screenAssets/JefeIntro.png"),
    require("../assets/screenAssets/JefeBronce.png"),
    require("../assets/screenAssets/JefePlata.png"),
    require("../assets/screenAssets/JefeOro.png"),]

function random(min, max) { 
    min = Math.ceil(min);
    if(min>0){
        min=min*5
    }
    max = Math.floor(max);
    var val = Math.floor((Math.random() * (max - min + 1)) + min)-1; 
    if(val<0){val=0}
    return val
}
export default function Jefe({ nivel,nombre, Onchage}) {
    const {items, handleItems} = UseItemsContext()
    const {pregunta, handlePregunta} = UsePreguntaContext()
    const {opcion, handleOpcion} = UseOpcionContext(); 
    const jefe = jefes[nombre[1]]
    let preguntas=[];
    let randomnumbers = new Set, ans;
   
    
    const generarPreguntas =() =>{
        while(randomnumbers.size <4){
            randomnumbers.add(random(nivel[1], (parseInt(nivel[1])+1)*5) ) 
        }
        ans = [...randomnumbers];
        
        ans.map((item)=>{
            preguntas.push({val: item, estado:false})
        })
        handleItems(preguntas) 
        console.log(preguntas)
        return preguntas.pop()
    }

    const handleChange = () =>{
        const val = generarPreguntas() 
        handlePregunta([opcion[0],val.val])
        //console.log(opcion[0],val.val)
        Onchage(nombre)
    } 
    if(nivel[0]!="Favoritos"){
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
  