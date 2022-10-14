import React, {useState} from 'react'
import { View, Text, StyleSheet } from 'react-native'

//componente usado por las preguntas de completar
export default function Completado({texto}) {
  return (
    <View style={styles.container} >
        <Text style={styles.texto} >
            {texto}
        </Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#C4C4C4',
        borderRadius: 8,
        paddingLeft: 5, 
        paddingRight: 5, 
    },
    texto:{
        fontWeight: "bold", 
        fontSize: 24,   
        alignItems: 'center',
        justifyContent: 'center', 
        textDecorationLine: 'underline',  
    }
})
