import React, { useState } from 'react'
import { View, Image, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native'


 
//segun el show(false || true) se da visibilidad o no al modal, con los props recibidos
export default function ModalInfo({visible, titulo, texto, botones, onChange}) {
    const [show, setShow] = useState(visible) 
 

    const answer = () =>{
        onChange()
    }
    return ( 
        <Modal transparent visible={visible}>
            <View style={styles.back} >
                <View style={styles.container} >
                    <Text  allowFontScaling = {false}  style={styles.titulo} >
                        {titulo}
                    </Text>

                    <Text  allowFontScaling = {false}  style={styles.texto}>
                        {texto}
                    </Text>
                    <View style={styles.contBotones} >
                       <TouchableOpacity  onPress={() => answer()}>
                            <Text  allowFontScaling = {false} style={styles.success}>Continuar</Text>
                        </TouchableOpacity>
 
                    </View>
                </View>
            </View>
        </Modal> 
    )
}

const styles = StyleSheet.create({
    back:{
        flex:1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: "center",
        alignItems: "center"
    }, 
    container:{
        flexDirection: 'column',
        width: '80%',
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 20,
        elevation:20,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 5,
        borderColor: "#2C6B80"
    },
    titulo:{ 
        fontWeight: "bold",
        fontSize:30, 
        marginBottom: 20,
        textAlign: "center"

    },
    img:{
        width: 250, 
        height: 250, 
        marginBottom: 20  
    },
    texto:{
        fontSize:23, 
        marginBottom: 20,
        textAlign: "justify"
    },
    contBotones:{
        flexDirection: 'row',
    },
    success:{
        backgroundColor: "#0EE0CD", 
        fontSize:20, 
        margin: 10,
        padding: 10,
        borderRadius: 12,
        color: "#fff",
        shadowOffset: {
            width: 5,
            height: 5,
          },
          shadowOpacity: 0.75,
          shadowRadius: 5,
          elevation: 5,  
    },
    danger:{
        backgroundColor: "#E02B0E",
        fontSize:20, 
        margin: 10,
        padding: 10,
        borderRadius: 12,
        color: "#fff",
        shadowOffset: {
            width: 5,
            height: 5,
          },
          shadowOpacity: 0.75,
          shadowRadius: 5,
          elevation: 5,  
    }
    
})