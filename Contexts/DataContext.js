import React,{ useState, useEffect, useContext } from 'react'
import { initDb,setDB } from '../utils/db';
import { getUsers } from '../utils/userModel';

const DbContext = React.createContext();

export function UseDbContext(){
    return useContext(DbContext)
}

let db;
export  function DataContext({children}) {
    const [isLoading, setIsLoading] = useState(true) 
    const [count, setCount] = useState(0)

    useEffect(() => {
      db =initDb()
      getUsers(db, setCount)
      if(count<1){
        setDB(db)
      }
    }, [])
    

    return (
        <DbContext.Provider value={db}>
            {children} 
        </DbContext.Provider>
    )
}
