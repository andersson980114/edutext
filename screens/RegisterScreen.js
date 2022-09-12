import React,{useState, useEffect }from 'react'
import { Text, View,Button, StyleSheet, TextInput} from "react-native";
import { getDbConnection, insertUser } from '../utils/db';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [genero, setGenero] = useState(0);

  function handleName(text){
    setName(text)
  }

  function handleLastName(text){
    setLastName(text)
  }

  function handleGenero(text){
    setGenero(text)
  }

  async function createUser(){
    if(name === '' || lastName === '' || genero === ''){
      setError('Warning', 'Por favor llene los campos')
    }
    try {
      const db = await getDbConnection();
      await insertUser(db, name, lastName, parseInt(genero))
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
      db.close
    } catch (error) {
      setError(error)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Nombre:
      </Text> 

      <TextInput
        style={styles.input}
        placeholder='Ingrese su nombre' 
      />

      <Text style={styles.text}>
        Apellido:
      </Text>

      <TextInput
        style={styles.input}
        placeholder='Ingrese su Apellido' 
      />
      <Text style={styles.text}>
        Genero:
      </Text>
  
      <Button title="Registrar"  />
        
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