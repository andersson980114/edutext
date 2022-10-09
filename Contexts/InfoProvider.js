import React,{ useState, useContext } from 'react'
import { View } from 'react-native'
import DataContext from './DataContext';

const InfoContext = React.createContext();
const OpcionContext = React.createContext();
const NivelContext = React.createContext();
const TemaContext = React.createContext();
const InfoTemaContext = React.createContext();
const PreguntaContext = React.createContext();
const ItemsContext = React.createContext();
const EvaluadoContext = React.createContext();


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
    setEvaluado(a)
  }


  return (
    <OpcionContext.Provider  value={{opcion,handleOption}}>
      <NivelContext.Provider  value={{nivel,handleNivel}}>
        <TemaContext.Provider  value={{tema,handleTema}}> 
          <InfoTemaContext.Provider  value={{info,handleInfoTema}}> 
            <PreguntaContext.Provider value={{pregunta, handlePregunta}}>
              <ItemsContext.Provider value={{items, handleItems}}>
                <EvaluadoContext.Provider value={{evaluado, handleEvaluado}}>
                  

                  <InfoContext.Provider value={{opcion,nivel, tema}}> 
                      {children} 
                  </InfoContext.Provider>

                </EvaluadoContext.Provider>
              </ItemsContext.Provider>
            </PreguntaContext.Provider>
          </InfoTemaContext.Provider>
        </TemaContext.Provider>
      </NivelContext.Provider>
    </OpcionContext.Provider>
  )
}
