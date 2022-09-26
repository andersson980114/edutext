import React,{ useState, useContext } from 'react'
import { View } from 'react-native-web'

const InfoContext = React.createContext();
const OpcionContext = React.createContext();
const NivelContext = React.createContext();
const TemaContext = React.createContext();
const PreguntaContext = React.createContext();

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

export function UsePreguntaContext(){
  return useContext(PreguntaContext)
}

export  function InfoProvider({children}) {

  const [opcion, setOpcion] = useState(['Word', 0])
  const [nivel, setNivel] = useState(['Introduccion',0])
  const [tema, setTema] = useState(['Inicio',0])
  const [pregunta, setPregunta] = useState(['Onboarding',3])
  

  const handleOption = (a) =>{
    setOpcion(a)
  }

  const handleNivel = (a) =>{
    setNivel(a)
  }

  const handleTema = (a) =>{
    setTema(a)
  }
 
  const handlePregunta = (a) =>{
    setPregunta(a)
  }

  return (
    <OpcionContext.Provider  value={{opcion,handleOption}}>
      <NivelContext.Provider  value={{nivel,handleNivel}}>
        <TemaContext.Provider  value={{tema,handleTema}}> 
          <PreguntaContext.Provider value={{pregunta, handlePregunta}}>

            <InfoContext.Provider value={{opcion,nivel, tema}}>
              {children}
            </InfoContext.Provider>

          </PreguntaContext.Provider>
        </TemaContext.Provider>
      </NivelContext.Provider>
    </OpcionContext.Provider>
  )
}
