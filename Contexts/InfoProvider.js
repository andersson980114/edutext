import React,{ useState, useContext, useEffect } from 'react'
import { View } from 'react-native' 

const InfoContext = React.createContext();
const OpcionContext = React.createContext();
const NivelContext = React.createContext();
const TemaContext = React.createContext();
const InfoTemaContext = React.createContext();
const PreguntaContext = React.createContext();
const ItemsContext = React.createContext();
const EvaluadoContext = React.createContext();
const CompletedContext = React.createContext();
const ProgresoContext = React.createContext();
const PuntajeContext = React.createContext();
const PressContext = React.createContext();


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

export function UseInfoTemaContext(){
  return useContext(InfoTemaContext)
}

export function UsePreguntaContext(){
  return useContext(PreguntaContext)
}

export function UseItemsContext(){
  return useContext(ItemsContext)
}
export function UseEvaluadoContext(){
  return useContext(EvaluadoContext)
}

export function UseCompletadoContext(){
  return useContext(CompletedContext)
}

export function UseProgresoContext(){
  return useContext(ProgresoContext)
}

export function UsePuntajeContext(){
  return useContext(PuntajeContext)
}

export function UsePressContext(){
  return useContext(PressContext)
}



function random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  var val = Math.floor((Math.random() * (max - min + 1)) + min); 

  return val
}

export  function InfoProvider({children}) {

  const [opcion, setOpcion] = useState(['Word', 0])
  const [nivel, setNivel] = useState(['Introduccion',0])
  const [tema, setTema] = useState(['Inicio',0])
  const [pregunta, setPregunta] = useState(['Onboarding',random(0, 3)])
  const [info, setInfo] = useState([false, false])
  const [items, setItems] = useState([])
  const [evaluado, setEvaluado] = useState(false)
  const [completado, setCompletado] = useState(false)
  const [progreso, setProgreso] = useState(0)
  const [puntaje, setPuntaje] = useState(0)
  const [press, setPress] = useState(false)
 
    

  const handleOption = (a) =>{
    setOpcion(a)
  }

  const handleNivel = (a) =>{
    setNivel(a)
  }

  const handleTema = (a) =>{
    setTema(a)
  }

  const handleInfoTema = (a) =>{
    setInfo(a)
  }
 
  const handlePregunta = (a) =>{ 
    setPregunta(a)
  }
  const handleItems = (a) =>{ 
    setItems(a)
  }

  const handleEvaluado = (a) =>{ 
    console.log(a)
    setEvaluado(a)
  }
  
  const handleCompletado = (a) =>{ 
    setCompletado(a)
  }

  const handleProgreso = (a) =>{ 
    setProgreso(a)
  }

  const handlePuntaje = (a) =>{ 
    setPuntaje(a)
  }

  const handlePress = (a) =>{
    setPress(a)
  }

  return (
    <OpcionContext.Provider  value={{opcion,handleOption}}>
      <NivelContext.Provider  value={{nivel,handleNivel}}>
        <TemaContext.Provider  value={{tema,handleTema}}> 
          <InfoTemaContext.Provider  value={{info,handleInfoTema}}> 
            <PreguntaContext.Provider value={{pregunta, handlePregunta}}>
              <ItemsContext.Provider value={{items, handleItems}}>
                <EvaluadoContext.Provider value={{evaluado, handleEvaluado}}>
                  <CompletedContext.Provider value={{completado, handleCompletado}}>
                    <ProgresoContext.Provider value={{progreso, handleProgreso}}> 
                      <PuntajeContext.Provider value={{puntaje, handlePuntaje}}> 
                        <PressContext.Provider value={{press, handlePress}}>
            
                          <InfoContext.Provider value={{opcion,nivel, tema}}> 
                              {children} 
                          </InfoContext.Provider>

                        </PressContext.Provider>
                      </PuntajeContext.Provider>
                    </ProgresoContext.Provider>
                  </CompletedContext.Provider>
                </EvaluadoContext.Provider>
              </ItemsContext.Provider>
            </PreguntaContext.Provider>
          </InfoTemaContext.Provider>
        </TemaContext.Provider>
      </NivelContext.Provider>
    </OpcionContext.Provider>
  )
}
