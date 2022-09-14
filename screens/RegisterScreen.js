import React,{useState, useEffect, component }from 'react'
import { Text, View,Button, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import Dropdown from '../components/Dropdown';
import { conectionDb, insertUsers } from '../utils/db';

let options = [{id:1, name:'Hombre'},{id:2, name:'Mujer'},{id:3, name:'Otro'}]

export default function RegisterScreen({navigation}) {
  const [userName, setUserName] = useState('');
  const [lastName, setLastName] = useState('');
  const [genero, setGenero] = useState(0);

  const [selectedItem, setSelectedItem] = useState(null)

  const onSelect = (item)=>{
      setSelectedItem(item)
  }

  function handleName(text){ 
    setUserName(text)
  }

  function handleLastName(text){ 
    setLastName(text)
  }

  state = {gener: ''}
  updteGenero = (gener) => {
    this.setState({gener: gener})
  }

  function handleGenero(text){
    setGenero(text)
  }

  function createUser(){  
     
     if(userName === '' || lastName === '' || selectedItem.name === null){
      console.log( 'Por favor llene los campos')
      return false
  }
    try {
      const db =  conectionDb();
      insertUsers(db, userName, lastName, selectedItem.name)
      Alert.alert(
        'Succes',
        'Usuario Registrado',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Inicio')
          }
        ],
        {cancelable: false}
      ); 
    } catch (error) {
      console.log(userName)
      console.log(lastName)
      console.log(selectedItem.name)
      console.log(`error catch:${error.message}`)
    } 
  }

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.text}>
          Nombre:
        </Text> 

        <TextInput
          style={styles.input}
          placeholder='Ingrese su nombre' 
          onChangeText ={setUserName}
          value={userName} 

        /> 
        <Text style={styles.text}>
          Apellido:
        </Text>

        <TextInput
          style={styles.input}
          placeholder='Ingrese su Apellido' 
          onChangeText={setLastName}
          value={lastName}
        /> 
        <Text style={styles.text}>
          Genero:
        </Text>

        <Dropdown
          data = {options}
          value = {selectedItem}
          onSelect={onSelect}  
        />
    
        <Button title="Registrar" onPress={() => navigation.navigate('Inicio')} />
        
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container : {
      flex            : 1,
      backgroundColor: 'rgba(82, 172, 185, 0.61)',
      alignItems      : "center",
      justifyContent  : "center",
  },
  text: {
      fontSize: 24,
      color: '#000', 
      textAlign: 'left',
  },
  options: {
    fontSize: 24,
    width: 289,
    color: '#000', 
    textAlign: 'center',
    backgroundColor: '#F3F3F3',
  },  
  input: {
      width: 289,
      height: 50,
      borderWidth: 1,
      borderColor: '#706F6F',
      borderRadius: 10,
      backgroundColor: '#F3F3F3',
      textAlign: 'center',
      fontSize: 24,
      marginBottom: 10,
  }, 
  select: { 
    width: 289,
    hight: 50,
    borderWidth: 1,
    borderColor: '#706F6F',
    borderRadius: 10,
    backgroundColor: '#F3F3F3',
    textAlign: 'center',
    fontSize: 24,
    marginBottom: 10,
  },
})