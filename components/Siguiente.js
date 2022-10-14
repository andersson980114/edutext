import React, {useState, useEffect} from 'react'
import { View, Image,Text, StyleSheet, TouchableOpacity } from 'react-native'
import { StackActions } from '@react-navigation/native';
import { UseOpcionContext, UseNivelContext, UsePreguntaContext, UseTemaContext, UseInfoTemaContext, UseItemsContext, UseEvaluadoContext, UseCompletadoContext, UseProgresoContext, UsePressContext, UsePuntajeContext} from "../Contexts/InfoProvider";
import { UseDbContext, UseCountContext } from '../Contexts/DataContext'; 
import { completedNivel, evaluatedNivel, getEvaluado, getNivel, getProgreso, updateNivel } from '../utils/nivelModel';
import { infoTema, completeTema, updateTema } from '../utils/temaModel';
import { getDescripcion, updateInsignia } from '../utils/insigniaModel';
import { getAvatarID, updateAvatar } from '../utils/avatarModel';
import { Insignias } from "../Data/imagenes";
import ModalPoup from './ModalPoup'; 
var ni;

//generar un numero random
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

//componente complicado de control: puede redirigir a ciertas screens, alterar datos o desbloquear elementos
export default function Siguiente({cantidad, id, prueba, visto, navigation}) {
    
    //contexts
    const {db, counte} = UseDbContext()
    const {tema, handleTema} = UseTemaContext();
    const {info,handleInfoTema} = UseInfoTemaContext()
    const {nivel, handleNivel} =  UseNivelContext() 
    const {pregunta, handlePregunta} = UsePreguntaContext()
    const {opcion, handleOpcion} =  UseOpcionContext() 
    const {count, handleCount} = UseCountContext()
    const {items, handleItems} = UseItemsContext()
    const {evaluado,  handleEvaluado} = UseEvaluadoContext()
    const {completado, handleCompletado} = UseCompletadoContext()
    const {progreso, handleProgreso} = UseProgresoContext()
    const {press, handlePress} = UsePressContext()
    const {puntaje, handlePuntaje} = UsePuntajeContext()
    //useStates
    const [avatars, setAvatars] = useState([])
    const [Progreso, setProgreso] = useState(0) 
    //alert
    const [show, setShow] = useState(false)
    const [titulo, setTitulo] = useState("Intentelo de Nuevo")
    const [texto, setTexto] = useState("")
    const [imagen, setImagen] = useState(require("../assets/screenAssets/prohibited.png"))
    const [botones, setBotones] = useState([]) 
    const [success, setSuccess] = useState(false)

    const cerrar = () =>{
        handleEvaluado(true) 
        setShow(false)
        if(nivel[0]=="Introducción"){
            
            navigation.dispatch(StackActions.pop(1))
        }else{ 
            navigation.dispatch(StackActions.pop(3))
        }
    }

    
    const insignia = (db, id) =>{
       // console.log("desbloqueada insignia: ", id, nivel)
        updateInsignia(db, id, false)
        setTexto(Insignias[id-1].Descripcion)
        setShow(true)
        setTitulo('¡Insignia Desbloqueada!') 
        setImagen(Insignias[id-1].url)
        setSuccess(true)
        setBotones([
        {
            texto: "Aceptar",
            id: 0,  
            success: false,
            boton: "succes"

        }
        ]) 
    }
 

    const handleChange = () =>{
        var val= random(nivel[1], (parseInt(nivel[1])+1)*3) 
        
        if(opcion[1]>0){
            ni = nivel[1]+1+5
        }else{
            ni = nivel[1]+1
        }
         
        handlePregunta([opcion[0], val]) 
        //console.log("get:", info[0])
        //si no es onboarding
        if(pregunta[0]!='Onboarding'){
            //info[0] = visto, info[1]= completado
            if(info[0] && !info[1]){  
                if(progreso<100){
                updateNivel(db,  ni, 20)
                handleProgreso(progreso+20)}
                console.log(progreso)
            }
            //si el tema tiene prueba y el tema no esta visto
            if(prueba && !info[1]){
                let id= tema[1]+1  
                handleInfoTema([false, true]) //tema visto(para que no se repita una prueba en el tema)
                completeTema(db, id, true) 
                navigation.navigate('PreguntaB')//nos dirigimos a prueba
            
            //si estamos en la prueba
            }else if(tema[0]=="Prueba" ){ 
                
                //las pruebas se dan por un array de 1 a 5 puestos. Por ende si hay pruebas en el array se ejecuta lo siguiente 
                if(items.length>0 ){
                    handlePress(false)
                    //se reasigna la nueva pregunta
                    console.log("residuo:",items)
                    handlePregunta([opcion[0], items.pop().val])  
                    //se navega de nuevo a la prueba con la nueva pregunta
                    navigation.navigate('PreguntaB')
                
                //si ya no hay pruebas se ejecuta lo siguiente
                }else {
                //console.log("evaluado llega", evaluado)
                    //preguntamos si ya se realizó por primera vez(para no seguir aumentando puntos)
                    if(evaluado==0 || evaluado==false){
                        //si no se ha realizado se aumenta el progreso en 20 
                        //    se cambia el estado de evaluado a true
                        //    se navega a la ventana anterior
                        handleProgreso(progreso+20)
                        updateNivel(db,  ni, 20)
                        evaluatedNivel(db, ni, true)
                        //verificamos si es introducción si es así se desvloquea y mostramos el modal
                        if(nivel[0]=="Introducción" && opcion[0]=="Word"){
                            insignia(db, 10)
                        }else if(nivel[0]=="Introducción" && opcion[0]=="Word"){
                            insignia(db, 11)
                        }else{
                            navigation.dispatch(StackActions.pop(1))
                        }
                    }else{
                        //si ya se evaluó solo se dirije a una ventana anterior
                        handleEvaluado(false)
                        navigation.dispatch(StackActions.pop(1))
                    }
                    //console.log("handleEvaluado", evaluado)
                         
                }
            //si no estamos en una prueba se realiza lo siguienta   
            }else{
                console.log("info:", info, " Tema:", tema, " nivel:",nivel, " opcion:", opcion[0]) 
 
                let id= tema[1]+1 
                completeTema(db, id, true)
                //preguntamos si es prueba y si ya fue realizada
                if(prueba && !info[0]){
                    //como ya fue realizada se completa y se va a la ventana anterior
                    handleInfoTema([true, true]) 
                    navigation.dispatch(StackActions.pop(4))

                //si no es prueba solo se va hacia atrás
                }else{

                    //preguntamos si estamos en Abrir word o Abrir docs, si es así, se desbloquea la insignia correspondiente
                    console.log("info", info)
                    if(tema[0]=="Abrir Word" && info[1]==0){
                        insignia(db, 2)
                        setShow(true)
                    }else if(tema[0]=="Abrir Docs" && info[1]==0){
                        insignia(db, 6)
                        setShow(true)
                    //si nos prueba ni introduccion solo se devuelve
                    }else{
                        navigation.dispatch(StackActions.pop(3))
                    }
                }
                
            }
        }else{
            //si estamos en Onboarding pasamos a la ventana Example
            handleCount(1)
            navigation.navigate('Example')
            
        }
    }

    const getAvatares =()=>{
        getAvatarID(db, puntaje, setAvatars)
        avatars.map((item) => {
            updateAvatar(db, item.id, true )
        })
    }

    if(id==cantidad){
        return (
            <View>
                <ModalPoup visible={show} titulo={titulo} texto={texto} imagen={imagen} botones={botones}  onChange={cerrar} />
                <TouchableOpacity  onPress={()=> handleChange()}>
                    <Image source={require('../assets/screenAssets/flechaD.png')} style={styles.img}/>
                </TouchableOpacity>
            </View>
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
 