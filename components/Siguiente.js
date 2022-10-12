import React, {useState, useEffect} from 'react'
import { View, Image,Text, StyleSheet, TouchableOpacity } from 'react-native'
import { UseOpcionContext, UseNivelContext, UsePreguntaContext, UseTemaContext, UseInfoTemaContext, UseItemsContext, UseEvaluadoContext, UseCompletadoContext, UseProgresoContext, UsePressContext, UsePuntajeContext} from "../Contexts/InfoProvider";
import { UseDbContext, UseCountContext } from '../Contexts/DataContext'; 
import { infoTema, completeTema, updateTema } from '../utils/temaModel';
import { StackActions } from '@react-navigation/native';
import { completedNivel, evaluatedNivel, getEvaluado, getNivel, getProgreso, updateNivel } from '../utils/nivelModel';
import { getAvatarID, updateAvatar } from '../utils/avatarModel';
import ModalPoup from './ModalPoup'; 
import { getDescripcion, updateInsignia } from '../utils/insigniaModel';
import { Insignias } from "../Data/imagenes";

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
    const {info,handleInfoTema} = UseInfoTemaContext()
    const {nivel, handleNivel} =  UseNivelContext() 
    const {pregunta, handlePregunta} = UsePreguntaContext()
    const {opcion, handleOpcion} =  UseOpcionContext() 
    const {db, counte} = UseDbContext()
    const {count, handleCount} = UseCountContext()
    const {items, handleItems} = UseItemsContext()
    const {evaluado,  handleEvaluado} = UseEvaluadoContext()
    const {completado, handleCompletado} = UseCompletadoContext()
    const {progreso, handleProgreso} = UseProgresoContext()
    const {press, handlePress} = UsePressContext()
    const {puntaje, handlePuntaje} = UsePuntajeContext()
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
        navigation.dispatch(StackActions.pop(3))
    }
    const insignia = (db, id) =>{
       // console.log("desbloqueada insignia: ", id, nivel)
        updateInsignia(db, id, false)
        setTexto("¡Por culminar esta prueba exitosamente!")
        setShow(true)
        setTitulo('¡Insignia Desbloqueada!') 
        setImagen(Insignias[id].url)
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
        //console.log("nivel:", nivel[1]," \ninfo:",info[1], info[0],"\ntema", tema);
        
        if(opcion[1]>0){
            ni = nivel[1]+1+5
        }else{
            ni = nivel[1]+1
        }
        
       // console.log("ni----",ni)
        //console.log(tema)
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
            
            if(prueba && !info[1]){
                let id= tema[1]+1  
                handleInfoTema([false, true]) 
                completeTema(db, id, true) 
                navigation.navigate('PreguntaB')
            }else if(tema[0]=="Prueba" ){ 
                
                //console.log("Evaluado---", evaluado)
                if(items.length>0 ){
                    handlePress(false)
                    handlePregunta([opcion[0], items.pop().val])  
                    navigation.navigate('PreguntaB')
                }else {
                console.log("evaluado llega", evaluado)
                    if(evaluado==0 || evaluado==false){
                        insignia(db, ni+1)
                        setShow(true)
                        //set(getEvaluado(db, ni))
                        //console.log("evaluado: ",evaluado);
                     
                        //console.log("Opcion:---",opcion[1]);
                        
                        //console.log("Evaluado", evaluado)
                        //handleProgreso(progreso+20)
                        updateNivel(db,  ni, 10)
                        evaluatedNivel(db, ni, true)
                        
                    }else{
                        handleEvaluado(false)
                        navigation.dispatch(StackActions.pop(3))
                    }
                    //console.log("handleEvaluado", evaluado)
                         
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

    /*
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
    
    */