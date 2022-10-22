import React,{useState} from 'react'
import { View, Image, Text, TouchableOpacity,StyleSheet, Dimensions, } from 'react-native'
import { UseCompletadoContext, UseInfoTemaContext } from '../Contexts/InfoProvider';
import { updateTema } from '../utils/temaModel';
 
//componente encargado en mostrar los cards de los temas
 
export default function Tema({db, nombre, Texto, favo, completado, visto, Onchage, update}) {
    const  [fav, setFav] = useState(favo)
    const  [favor, setFavor] = useState(0)
    const {info,handleInfoTema} = UseInfoTemaContext()
    const {completed, handleConpleted} = UseCompletadoContext()
    const favorite = require('../assets/screenAssets/favorite.png') ;
    const noFavorite =  require('../assets/screenAssets/noFavorite.png');
     

    //call back
    const handleChange = () =>{
        handleInfoTema([true, completado])
        update([nombre[1], fav, true, completado])
        console.log("nivel completado?",completado)
        Onchage(nombre)
    }
    //cambiar el estado de favorito
    const handleFav = () =>{
      setFav(!fav) 
      update([nombre[1], !fav, true, completado])
    }
    //componente
    return (
        <View  >
            <TouchableOpacity onPress={() => handleChange()}  style={styles.cardContainer}>
            
                <Text style={styles.titleCar} >
                    {Texto}
                </Text>

                <TouchableOpacity onPress={() =>handleFav()}>
                    <Image 
                        resizeMode="cover"
                        source={fav ? favorite: noFavorite}
                        style={styles.imgCard}
                    />  
                </TouchableOpacity>

            </TouchableOpacity>
        </View> 
    )
}

const deviceWidth = Math.round(Dimensions.get('window').width)
const styles = StyleSheet.create({
  imgCard:{
    width: 43,
    height: 40,  
      
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
  