import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native'; 

//Screen encargado de mostrar el ejemplo de contenido
export default function ExampleScreen({navigation}) {
    let mensaje ="¡IMPORTANTE! Desliza las imagenes \n para continuar viendo el contenido"
  
    return (
      <View style={styles.container}>
        <Text
           style={{fontSize: 24,  textAlign:"center", justifyContent:"center"}}
        >
        {mensaje}
        </Text>
        <Image
          style={{width: 300, height: 500,  marginVertical:20}}
          source={require("../assets/screenAssets/explicación.gif")} />
        <TouchableOpacity onPress={()=> navigation.navigate('Inicio')}
          style={{backgroundColor:  'rgb(82, 172, 185)',
          width: 145,
          height: 60, 
          borderRadius: 25,
          margin: 15, alignItems: 'center',
          justifyContent: 'center',
          }}
        >
          <Text
             style={{fontSize: 20,  color:"#fff"}}
          >Continuar</Text>
        </TouchableOpacity>
      </View>
    );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});