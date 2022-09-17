import React,{ useState, useContext } from 'react'
import { View } from 'react-native-web'

const InfoContext = React.createContext();
const OpcionContext = React.createContext();
const NivelContext = React.createContext();
const TemaContext = React.createContext();

export function UseInfoContext(){
  return useContext(InfoContext)
}

export function UseOpcionContext(){
  return useContext(OpcionContext)
}

export function UseNivelContext(){
  return useContext(NivelContext)
}

export function UseTemaContext(){
  return useContext(TemaContext)
}

export  function InfoProvider({children}) {

  const [opcion, setOpcion] = useState('Word')
  const [nivel, setNivel] = useState('Introduccion')
  const [tema, setTema] = useState('Inicio')
  

  const handleOption = (a) =>{
    setOpcion(a)
  }

  const handleNivel = (a) =>{
    setNivel(a)
  }

  const handleTema = (a) =>{
    setTema(a)
  }
 

  return (
    <OpcionContext.Provider  value={{opcion,handleOption}}>
      <NivelContext.Provider  value={{nivel,handleNivel}}>
        <TemaContext.Provider  value={{tema,handleTema}}> 

          <InfoContext.Provider value={{opcion,nivel, tema}}>
            {children}
          </InfoContext.Provider>

        </TemaContext.Provider>
      </NivelContext.Provider>
    </OpcionContext.Provider>
  )
}
