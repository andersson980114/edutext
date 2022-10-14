import React,{useState, useEffect} from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import { Insignias } from "../Data/imagenes";
import { getInsignia } from "../utils/insigniaModel";
import { UseDbContext } from "../Contexts/DataContext";
import * as data from '../Data/insignias.json';

//Screen encargado de mostrar las insignias
export default function InsigniaScreen({ navigation }) {
  const insignias = data.Insignias
  //context
  const {db, count} = UseDbContext()
  //useState
  const [insignia, setinsIgnia] = useState([])

  useEffect(() => {
    getInsignia(db, setinsIgnia)
    
  }, [])

  useEffect(() =>
    navigation.addListener('beforeRemove', (e) => {
      const action = e.data.action; 

      e.preventDefault();
      //console.log("word");
      navigation.dispatch(action)
      navigation.navigate('Inicio')
    
  }),
  [navigation])
  //componentes
  return (
    <View  style={Styles.container}>  
        <Text style={Styles.textUser}>Mis Insignias</Text>
        <View style={Styles.boxContainer}>
          {
            insignia.map((item,  key) => { 
              let url=""
              let id = item.id -1
              let bloqueado;
              //console.log(item.Bloqueado)
              if(item.Bloqueado>0){bloqueado=true}else{bloqueado=false}
              if(bloqueado){
                url = require("../assets/screenAssets/Bloqueado.png")
              }else{
                url = Insignias[id].url
              }
              return(
                <Image style={Styles.box} key={key} source={url}></Image> 
              );
            })
          }  
        </View>
        
    </View>
  )
}

const width =( Dimensions.get("window").width) * 0.5 ;
const height = (Dimensions.get("window").height) * 0.5;

const ANCHO_CONTENEDOR = (height / width ) *50 ; 
const ALTO_CONTENEDOR = (height / width ) *60 ; 
const Espacio = (height / width ) *3 ; 

const Styles = StyleSheet.create({
  container: {
    flex: 1,  
  }, 
  boxContainer: { 
    flex:1,
    width: '100%',
    height: '70%', 
    alignItems: 'center',
    justifyContent: 'center',   
    flexWrap: 'wrap',  
    flexDirection: 'row',  
  },
  textUser:{
    fontSize:40,  
    marginLeft: '10%',
    fontWeight: "bold",
  }, 
  box:{
    height: ALTO_CONTENEDOR,
    width: ANCHO_CONTENEDOR,  
    backgroundColor: '#D9D9D9',  
    borderRadius: 20,
    margin:  Espacio, 
    borderColor: "#2C6B80",
    borderWidth: 3
  },

});