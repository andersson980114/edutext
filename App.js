import React, {useState, useEffect} from 'react'
import { InfoProvider } from './Contexts/InfoProvider';
import Route from './Route'

 



export default function App() {
  
    return (
      <InfoProvider>
        <Route/>
      </InfoProvider>
    );
   

}
