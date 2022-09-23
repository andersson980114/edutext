import React, { useEffect , useContext, useState } from "react";
import { initDb, createUserTable} from "../utils/db";
import { Text, View } from "react-native";  
import * as FileSystem from "expo-file-system";
import {Asset} from "expo-asset"

const DbContext = React.createContext();



export function UseDbContext(){
    return useContext(DbContext)
}


export function DbContextProvider({children}){
    const [isLoading, setIsLoading] = useState(true)
    const [db, setDb] = useState(null)
    const [count, setCount] = useState(0)

    useEffect(function() {
        let mydb = null
        function getConetion(){
            mydb =  initDb();
            setDb(mydb) 
            //createUserTable(mydb) 
            //setIsLoading(false)
            console.log(mydb)
        }
        getConetion();
        return function(){
            if (db !== null){
                db.close();
            }
        }
    }, [])

    
    return (
        <DbContext.Provider value={db}>
            {children} 
        </DbContext.Provider>)
}