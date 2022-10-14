import React, {useState, useEffect} from 'react'
import { InfoProvider } from './Contexts/InfoProvider';
import {DataContext} from './Contexts/DataContext';
import Route from './Route'

//archivo principal: contiene los proveedores de contexto y el route
export default function App() {
  
    return (
      <InfoProvider>
        <DataContext>
          <Route/> 
        </DataContext>
      </InfoProvider>
    );
   

}
