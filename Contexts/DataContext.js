import React,{ useState, useEffect, useContext } from 'react'
import * as SQLite from "expo-sqlite"; 
import { initDb,setDB } from '../utils/db';
import { createUserTable, getUsers } from '../utils/userModel';
import Splach from '../components/Splach';

const DbContext = React.createContext();
let db;

export function UseDbContext(){
    return useContext(DbContext)
}

export  function DataContext({children}) { 
    const [isLoading, setIsLoading] = useState(true) 
    const [count, setCount] = useState(0)
    const [user, setUser] = useState()

    useEffect(() => {
        db = initDb('main'); 
        createUserTable(db)
        //console.log(db)
        getUsers(db, setCount)
        console.log(count)
        if(count<1){
            //setDB => carga la data
            //setDB(db)
        }
        setIsLoading(false)
    }, [])

    if(isLoading){

        console.log("user:",user)
        return(
            <Splach/>
        )
    }
    

    return (
        <DbContext.Provider value={{db, count, user}}>
            {children} 
        </DbContext.Provider>
    )
}
