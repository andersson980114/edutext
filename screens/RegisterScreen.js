import React,{useState, useEffect, component }from 'react'
import { Text, View,Button, StyleSheet, TextInput, Pressable, Dimensions, Alert, Image } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { UseDbContext, UseCountContext } from '../Contexts/DataContext';
import { insertUsers } from '../utils/userModel'; 
import Dropdown from '../components/Dropdown';
import ModalPoup from "../components/ModalPoup";

//opciones del desplegable
let options = [{id:1, name:'Hombre'},{id:2, name:'Mujer'},{id:3, name:'Otro'}]
//Dimension
const widthC = Dimensions.get("window").width; 
const heightC = Dimensions.get("window").height;

//Screen encargada del registro
export default function RegisterScreen({navigation}) {
  const {db, count, user} = UseDbContext()
  const {counte, handleCount} = UseCountContext()
  const [userName, setUserName] = useState('');
  const [lastName, setLastName] = useState('');
  const [genero, setGenero] = useState(0);
  const [success, setSuccess] = useState(false)
  const [selectedItem, setSelectedItem] = useState("")
  const [complete, setComplete] = useState(false)
  //alert
  const [show, setShow] = useState(false)
  const [show2, setShow2] = useState(false)
  const [show3, setShow3] = useState(false)
  const [show4, setShow4] = useState(false)
  const [titulo, setTitulo] = useState("Intentelo de Nuevo")
  const [texto, setTexto] = useState("")
  const [imagen, setImagen] = useState(require("../assets/screenAssets/prohibited.png"))
  const [botones, setBotones] = useState([
    {
      texto: "Aceptar",
      id: 0,  
      success: false,
      boton: "danger"

    }
  ])
  
  useEffect(() => {
    if(count>0){
      
    }
  }, [])
  //prevenir el goBack
  useEffect(() =>
    navigation.addListener('beforeRemove', (e) => {
      const action = e.data.action; 

      e.preventDefault();
      //navigation.dispatch(action),
      Alert.alert(
        '¡Cuidado!',
        '¿Deseas salir de EduText?',
        [
          { text: "No", style: 'cancel', onPress: () => {} },
          {
            text: 'Si',
            style: 'destructive',
            onPress: () => {},
          },
        ]
      );
    
    
  }),
  [navigation])

  //alteradores
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

  //modal
  const Avatar1 = () =>{
    setShow(false)
    setTitulo('¡Avatar Desbloqueado!')
    setTexto("Has desbloqueado un Nuevo Avatar ")
    setImagen(require("../assets/avatarAssets/Neutro.png"))
    setSuccess(false)
    setBotones([
      {
        texto: "Aceptar",
        id: 0,  
        success: false,
        boton: "succes"

      }
    ])
    if(complete){
    setShow2(true)}
  
  }

  //modal
  const Avatar2 = () =>{
    setShow3(false)
    setTitulo('¡Avatar Desbloqueado!')
    setTexto("Has desbloqueado un Nuevo Avatar ")
    setImagen(require("../assets/avatarAssets/Monroe.png"))
    setSuccess(false)
    setBotones([
      {
        texto: "Aceptar",
        id: 0,  
        success: false,
        boton: "succes"

      }
    ])
    setShow4(true)
  }

  //modal
  const Insignia= () =>{
    setShow2(false)
    setTitulo('¡Insignia Desbloqueada!')
    setTexto("Has desbloqueado una Nueva Insignia ")
    setImagen(require("../assets/insigniasAssets/RegistroExito.png"))
    setSuccess(false)
    setBotones([
      {
        texto: "Aceptar",
        id: 0,  
        success: false,
        boton: "succes"

      }
    ])
    setShow3(true)
  }
  //cerrar modal
  const cerrar = () =>{
    setShow4(false)
    
      navigation.navigate('PreguntaA')
    
  }

  //crear usuario
  function createUser(){   
    console.log(selectedItem[0])
    if(userName === '' || lastName === '' || selectedItem === ""){
      setShow(true)
      setTexto('Por favor llene los campos')  
    }else{
      try {
        if(selectedItem.id>=2){
          insertUsers(db, userName, lastName, selectedItem.name,2)  
        }else{
          insertUsers(db, userName, lastName, selectedItem.name,1)  
        }
        setComplete(true)
        setShow(true)
        setTitulo('¡Usuario Creado!')
        setTexto("Bienvenido "+ userName)
        setImagen(require("../assets/screenAssets/success.png"))
        setSuccess(true)
        setBotones([
          {
            texto: "Aceptar",
            id: 0,  
            success: false,
            boton: "succes"
  
          }
        ])
      } catch (error) {
        setShow(true)
        setTexto('Error de registro')  
        console.log(`error catch:${error.message}`)
      } 
    }
    
  }
  //componente
  return (
      <View  style={styles.container}>

        <View>
              <ModalPoup visible={show} titulo={titulo} texto={texto} imagen={imagen} botones={botones}  onChange={Avatar1} />
              <ModalPoup visible={show2} titulo={titulo} texto={texto} imagen={imagen} botones={botones}  onChange={Insignia} />
              <ModalPoup visible={show3} titulo={titulo} texto={texto} imagen={imagen} botones={botones}  onChange={Avatar2} />
              <ModalPoup visible={show4} titulo={titulo} texto={texto} imagen={imagen} botones={botones}  onChange={cerrar} />
        </View>

        <View style={styles.head}>
          <Image source={require("../assets/screenAssets/Logotipo.png")} style={styles.img}></Image>
        </View>
        <View style={styles.formu}>
          <SafeAreaView >
              <Text style={styles.text}>
                Primer Nombre:
              </Text> 

              <TextInput
                style={styles.input}
                placeholder='Ingrese su nombre' 
                onChangeText ={setUserName}
                value={userName} 

              /> 
              <Text style={styles.text}>
                Primer Apellido:
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
          
              <Pressable onPress={()=> createUser()} >
                <Text style={styles.button}>
                  Ingresar
                </Text>
              </Pressable>
              
          </SafeAreaView>

        </View>
      </View>
  )
}

const styles = StyleSheet.create({
  container:{ 
      flex            : 1,
      backgroundColor: 'rgba(82, 172, 185, 0.61)', 
      
  },
  formu : {  
      alignItems      : "center",
      justifyContent  : "center",
  },
  text: {
      fontSize: 24,
      color: '#000', 
      textAlign: 'left',
      marginTop:10
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
  head:{ 
    backgroundColor: "#2C6B80",
    padding: 25,   
    width: widthC, 
    alignItems: 'center',
    justifyContent: 'center', 
  },
  img:{ 
    width:widthC*0.9,  
    marginTop: 40, 
    height: heightC*0.07,
    resizeMode: "contain"
  },
  button:{
    backgroundColor: "#2C6B80",
    width:widthC*0.4,  
    height: heightC*0.07,
    textAlign: 'center',
    justifyContent: 'center', 
    padding: 8,
    margin: 20,
    marginLeft: widthC*0.9 - widthC*0.6,
    borderRadius: 15,
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    
  }
})