import React,{ useState, useEffect, useContext } from 'react'
import * as SQLite from "expo-sqlite"; 
import { initDb } from '../utils/db';
import { createUserTable, getUsers } from '../utils/userModel';
import Splach from '../components/Splach'; 

//crearemos los contextos o variables globales, relacionadas con la DB

//Los contextos
const DbContext = React.createContext();
const temasContext = React.createContext();
const countContext = React.createContext();
let db;

//
export function UseDbContext(){
    return useContext(DbContext)
}

export function UseTemasContext(){
    return useContext(temasContext)
}

export function UseCountContext(){
    return useContext(countContext)
}

//funcion principal
//retorna los valores actu
export  function DataContext({children}) { 
    const [isLoading, setIsLoading] = useState(true) 
    const [count, setCount] = useState(0)
    const [user, setUser] = useState()
    const [temas, setTemas] = useState([])

    useEffect(() => {
        db = initDb('main'); 
        createUserTable(db)
        //console.log(db)
        getUsers(db, setCount)
        //console.log(count)
        
    }, [])

    useEffect(() => { 
        setIsLoading(false)
    }, [count])
    
    if(isLoading){
        //console.log("user:",user)
        return(
            <Splach/>
        )
    }
     
    const handleTemas = (a) =>{
        setTemas(a)
    }

    const handleCount = (a)=>{
        setCount(a)
        console.log(count)
    }
    return (
        <DbContext.Provider value={{db, count, user}}>
            <countContext.Provider value={{count, handleCount}}>
                <temasContext.Provider value={{temas, handleTemas}}>
                    {children} 
                </temasContext.Provider>
            </countContext.Provider>
        </DbContext.Provider>
    )
}
