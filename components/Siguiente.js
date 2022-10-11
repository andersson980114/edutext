import React, {useState, useEffect} from 'react'
import { View, Image,Text, StyleSheet, TouchableOpacity } from 'react-native'
import { UseOpcionContext, UseNivelContext, UsePreguntaContext, UseTemaContext, UseInfoTemaContext, UseItemsContext, UseEvaluadoContext, UseCompletadoContext, UseProgresoContext, UsePressContext} from "../Contexts/InfoProvider";
import { UseDbContext, UseCountContext } from '../Contexts/DataContext'; 
import { infoTema, completeTema, updateTema } from '../utils/temaModel';
import { StackActions } from '@react-navigation/native';
import { completedNivel, evaluatedNivel, getNivel, updateNivel } from '../utils/nivelModel';
var ni;
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

export default function Siguiente({cantidad, id, prueba, visto, navigation}) {
    
    
    const {tema, handleTema} = UseTemaContext();
    const  {info,handleInfoTema} = UseInfoTemaContext()
    const {nivel, handleNivel} =  UseNivelContext() 
    const {pregunta, handlePregunta} = UsePreguntaContext()
    const {opcion, handleOpcion} =  UseOpcionContext() 
    const {db, counte} = UseDbContext()
    const {count, handleCount} = UseCountContext()
    const {items, handleItems} = UseItemsContext()
    const {evaluado, handleEvaluado} = UseEvaluadoContext()
    const {completado, handleCompletado} = UseCompletadoContext()
    const {progreso, handleProgreso} = UseProgresoContext()
    const {press, handlePress} = UsePressContext()

    useEffect(() => {
        if(opcion[1]>0){
            ni = nivel[1]+1+5
        }else{
            ni = nivel[1]+1
        }
        
      if(progreso>=80 && !completado){
        completedNivel(db, ni, true)
        handleCompletado(true)
        
        console.log(progreso)
        console.log("\n--------------------------------------------------------\n")
      }
      
      console.log(progreso)
    }, [progreso])
    

    const handleChange = () =>{
        var val= random(nivel[1], (parseInt(nivel[1])+1)*3)
        //console.log("nivel:", nivel[1]," \ninfo:",info[1], info[0],"\ntema", tema);
        
        if(opcion[1]>0){
            ni = nivel[1]+1+5
        }else{
            ni = nivel[1]+1
        }
        
        console.log("ni----",ni)
        //console.log(tema)
        handlePregunta([opcion[0], val]) 
        //console.log("get:", info[0])
        if(pregunta[0]!='Onboarding'){
            if(info[0] && !info[1]){  
                if(progreso<100){
                updateNivel(db,  ni, 20)
                handleProgreso(progreso+20)}
                console.log(progreso)
            }
            
            if(prueba && !info[1]){
                let id= tema[1]+1  
                handleInfoTema([false, true]) 
                completeTema(db, id, true) 
                navigation.navigate('PreguntaB')
            }else if(tema[0]=="Prueba" ){ 
                if(items.length>0 ){
                    handlePress(false)
                    handlePregunta([opcion[0], items.pop().val]) 
                    navigation.navigate('PreguntaB')
                }else{
                    if(!evaluado){
                       // console.log("Opcion:---",opcion[1]);
                       if(progreso<100){
                        handleProgreso(progreso+20)
                        updateNivel(db,  ni, 20)}
                        handleEvaluado(true)
                        evaluatedNivel(db, nivel[1]+1, true)
                    }
                    navigation.dispatch(StackActions.pop(3))
                }
               
            }else{
                let id= tema[1]+1 
                completeTema(db, id, true)
                if(prueba && !info[0]){
                    handleInfoTema([true, true]) 
                    navigation.dispatch(StackActions.pop(4))
                }else{
                    navigation.dispatch(StackActions.pop(3))
                }
                
            }
        }else{
            handleCount(1)
            navigation.navigate('Example')
            
        }
    }

    if(id==cantidad){
        return (
            <TouchableOpacity  onPress={()=> handleChange()}>
                <Image source={require('../assets/screenAssets/flechaD.png')} style={styles.img}/>
            </TouchableOpacity>
          )
    }
    return (
        <View>

        </View>
      )
  
}

const styles = StyleSheet.create({
    
    img:{
        backgroundColor: "#2C6B80",
        width: 83,
        height: 42,
        resizeMode: "contain",
        borderRadius: 25,
        margin: 15, 

    }
})