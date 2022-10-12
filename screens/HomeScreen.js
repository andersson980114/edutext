import React, {useEffect} from "react";
import { Text, View,Button, Image, StyleSheet, Dimensions, Pressable ,Alert} from "react-native";
import { Card} from 'react-native-elements'
import { UseOpcionContext,UsePreguntaContext } from "../Contexts/InfoProvider";
import { getPuntaje } from "../utils/userModel";

export default function HomeScreen({ navigation }) {

  const {opcion, handleOption} = UseOpcionContext()
  const {pregunta, handlePregunta} = UsePreguntaContext()
  const handleChange = (nombre) => {
    handleOption(nombre)
    handlePregunta(nombre)
    navigation.navigate('Word')
  }
 
  useEffect(() =>
    navigation.addListener('beforeRemove', (e) => {
      const action = e.data.action; 

      e.preventDefault();
      //navigation.dispatch(action),
      Alert.alert(
        '¡Cuidado!',
        '¿Deseas salir de EduText?',
        [
          { text: "No", style: 'cancel', onPress: () => {} },
          {
            text: 'Si',
            style: 'destructive',
            onPress: () => {},
          },
        ]
      );
    
  }),
  [navigation])

  return (
    <View View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        
        <View style={styles.cardContainer} >
          <Pressable onPress={() =>   {handleChange(['Word',0])}} >
            <Image 
              resizeMode="cover"
              source={require('../assets/screenAssets/WordLogo.png')}
              style={styles.image}
              />
          </Pressable>
        </View>

        <View style={styles.cardContainer} >
          <Pressable onPress={() =>  {handleChange(['Docs', 1])}} >
            <Image 
                resizeMode="cover"
                source={require('../assets/screenAssets/DocsLogo.png')}
                style={styles.image}
              />
          </Pressable>
        </View>

    </View>
  )
};

const deviceWidth = Math.round(Dimensions.get('window').width)
const deviceHeight = Math.round(Dimensions.get('window').height)
const styles = StyleSheet.create({
  cardContainer:{
    width: deviceWidth - 35,
    height: deviceHeight * 0.35,
    backgroundColor: '#EBEBEB',
    borderRadius: 20,
    shadowColor:'#000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.75,
    shadowRadius: 5,
    elevation: 10,
    margin: 20,  
    },
    
    image: {
      resizeMode: 'cover',
      width: deviceWidth * 0.55,
      height: deviceHeight * 0.32,
      alignContent: 'center',
      alignSelf: 'center', },
  
  }) 