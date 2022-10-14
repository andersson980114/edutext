import React,{useState, useEffect}from 'react';
import { View, Text, StyleSheet, Image, Dimensions, SafeAreaView, Animated} from 'react-native' 
import { StatusBar } from 'expo-status-bar';
import { Contenido } from '../Data/imagenes';
import { UseInfoContext} from "../Contexts/InfoProvider";
import Siguiente from '../components/Siguiente';
import * as data from '../Data/wordContenido.json'
//imagenes staticas
const imagenes = [
  require("../assets/Niveles/intro/1.png"),
  require("../assets/Niveles/intro/2.png"),
  require("../assets/Niveles/intro/2.png"),

];

//constantes de dimensión
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const ANCHO_CONTENEDOR = width * 0.9;
const ESPACIO_CONTENEDOR = (width - ANCHO_CONTENEDOR) / 2;
const ALTURA_CONTENEDOR = height*0.9;
const ESPACIO = 10;
const ALTURA_BACKDROP = height * 0.1;

//Screen encargado de mostrar el contenido
export default function ContenidoScreen({navigation}) {
  
  const {opcion, nivel, tema} = UseInfoContext(); 
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const [content, setContent] = useState([])
  const [cantidad, setCantidad] = useState(0)

  useEffect(() => { 
    const data = []
    Contenido.map((item) => {
       
      if(nivel[0]=="Favoritos"){
        if(item.Opcion == opcion[1] && item.Tema == tema[1] ){
          data.push(item)
        } 
      }
      else if(item.Opcion == opcion[1] && item.Nivel == nivel[1] && item.Tema == tema[1] ){
        data.push(item)
      } 
      
    })
    setContent(data)
    setCantidad(data.length-1)

  }, [])

  useEffect(() =>
    navigation.addListener('beforeRemove', (e) => {
      const action = e.data.action; 

      e.preventDefault();
      //console.log("word");
      navigation.dispatch(action)
      navigation.navigate('Temas')
    
  }),
  [navigation])
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden /> 
      <Animated.FlatList
        onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
        
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        snapToAlignment="start"
        contentContainerStyle={{
            paddingTop: ALTURA_BACKDROP,
            paddingHorizontal: ESPACIO_CONTENEDOR,
          }}

        snapToInterval={ANCHO_CONTENEDOR}
        decelerationRate={0}
        scrollEventThrottle={16}
        
        //contenido
        data={content}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => { 
          const inputRange = [
            (index - 1) * ANCHO_CONTENEDOR,
            index * ANCHO_CONTENEDOR,
            (index + 1) * ANCHO_CONTENEDOR,
          ]; 
          
          const scrollY = scrollX.interpolate({
            inputRange,
            outputRange: [0, -50, 0],
          });    

          return (
            <View style={{ width: ANCHO_CONTENEDOR }} >
              <Animated.View 
                style={{
                  marginHorizontal: ESPACIO,
                  padding: ESPACIO,
                  borderRadius: 34,
                  backgroundColor: "#fff",
                  alignItems: "center",
                  transform: [{ translateY: scrollY }],
                }}
              >
                <Image source={item.url} style={styles.posterImage} />
                <Text style={{ fontWeight: "bold", fontSize: 26,}}>
                  {" "} 
                  {item.Texto}
                </Text>
                <View style={styles.boton}>
                  <Siguiente cantidad={cantidad} id={index} prueba={item.Prueba} visto={item.Visto} navigation={navigation} />
                </View>
              </Animated.View>

            </View>
          ); 
        }}
      />
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  posterImage: {
    width: "100%",
    height: ANCHO_CONTENEDOR * 1.2,
    resizeMode: "contain",
    borderRadius: 24,
    margin: 0,
    marginBottom: 10,
    borderColor: "#2C6B80",
    borderWidth: 3
  },
  boton:{
    position: 'absolute',
    left:ANCHO_CONTENEDOR - 123,
    top: ALTURA_CONTENEDOR- 82
  }
});