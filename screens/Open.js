import React, { useState, useEffect} from 'react'
import { View, Image, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native' 
import {initDb, insertInsignia, desbloqueartInsignia, getInsignias} from '../utils/db.js'
import * as data from '../Data/insignias.json';
import { Insignias } from "../Data/imagenes";

const db = initDb()
const insignias = data.Insignias
export default function Open() { 
    const [dataItem, setDataItem] = useState([])
    const [prueba, setPrueba] = useState("")
    const [llenado, setLlenado] = useState(false)
    useEffect(() => {
        insignias.map((item) => { 
            url = item.id
            console.log(url)
            //insertInsignia(db, url)
        })
        setLlenado(true)
    }, [])
    
    useEffect(() => {  
        db.transaction((tx) => {
            tx.executeSql(
                `SELECT * FROM insignia`,
                [],
                (sqlTxn, res) => {
                    console.log("insignia obtenidas");
                    let len  = res.rows.length;
                    if(len > 0){
                        let results =[]
                        for(let i =0; i<len; i++){
                            let item =   res.rows.item(i);
                            //console.log(item)
                            results.push({Name: item.Url})
                        }  
                        //console.log(results)
                        setDataItem(results)
                        return results;
                    }else{
                        console.log("no hay insignia")
                    }
                },
                error => {console.log(error)}
            )
        }
        )
        
    }, [llenado])
    
    const create = () =>{
        

            const data = getInsignias(db) 
            //console.log(dataItem)
        
        
        
    }

    const renderData = ({item}) =>{
        url = Insignias[item.Name].url
        return(
            <Image source={url}/>
        )
    }
    return (
        <View style={{felx:1, justifyContent: "center", alignItems:"center", padding:5}}>
            <Text 
                style={{marginHorizontal:12, fontSize:20}}>prueba</Text>
            <TextInput
                placeholder='Ingrese dato'
                onChangeText= {setPrueba}
                value={prueba}
                style={{marginHorizontal:12, width:300, backgroundColor:"#aaaf"}}
            />
            <TouchableOpacity onPress={create}>
                <Text style={{backgroundColor: "#abcdef", width:80, padding:10}}>Agregar</Text>
            </TouchableOpacity>

            <FlatList data={dataItem} renderItem={renderData} />
        </View>
    )
}

