import React,{useState, useEffect, component }from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image} from "react-native";

//componente usado para desplegables en formularios
export default function Dropdown({
    data = [], 
    value = {},
    onSelect = () => {} }) {
    
    const [show, setShow] = useState(false)
    
    const onSelectItem = (val) =>{
        setShow(false)
        onSelect(val)
    }
    return (
        <View>
            <TouchableOpacity  style={styles.select}  activeOpacity={0.8} onPress={() => setShow(!show)} >
                <Text allowFontScaling = {false}  style={styles.placeholder} >
                    {!!value ? value?.name : "Seleccionar"}
                </Text>
                
                <Image  source={require('../assets/dropdown.png')} 
                    style={{transform: [{rotate: show? '180deg' : '0deg'}], margin:10}} 
                />
            </TouchableOpacity>

           {show && (<View>
                {data.map((val, i) =>{
                    return(
                        <TouchableOpacity
                            activeOpacity={0.8}
                            key= {String(i)}
                            onPress={() => onSelectItem(val)}
                            style={{
                                backgroundColor:  '#F3F3F3', 
                                paddingVertical: 8, 
                                paddingHorizontal:6,
                            }}
                        >
                        
                            <Text  allowFontScaling = {false} key={String(i)} 
                                style={{
                                fontSize: 24,
                                width: 267,
                                color: '#000' , 
                                textAlign: 'left', 
                                paddingLeft: 20,  
                                }}>
                                {val.name}
                            </Text>
                        </TouchableOpacity>
                    )
                    })
                }   
           </View>)}
        </View>
    )
    }


const styles = StyleSheet.create({ 
    text: {
        fontSize: 24,
        color: '#000', 
        height: 50,
        textAlign: 'left',
    },
    placeholder: {
        fontSize: 24,
        color: '#706F6F', 
        height: 50,   
        padding: 10,
    },
    options: {
        
    },    
    select: { 
        width: 289,
        height: 50,
        borderWidth: 1,
        borderColor: '#706F6F',
        borderRadius: 10,
        backgroundColor: '#F3F3F3', 
        fontSize: 24, 
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems: 'center'
    },
  })