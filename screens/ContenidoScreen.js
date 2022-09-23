import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions, SafeAreaView, Animated} from 'react-native' 
import * as data from '../Data/wordContenido.json'
import { Contenido } from '../Data/imagenes';
import ContenidoC from '../components/ContenidoC';
import { UseInfoContext} from "../Contexts/InfoProvider";

const imagenes = [
  require("../assets/Niveles/intro/1.png"),
  require("../assets/Niveles/intro/2.png"),
  require("../assets/Niveles/intro/2.png"),

];


const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const ANCHO_CONTENEDOR = width * 0.9;
const ESPACIO_CONTENEDOR = (width - ANCHO_CONTENEDOR) / 2;
const ESPACIO = 10;
const ALTURA_BACKDROP = height * 0.5;

 

export default function ContenidoScreen() {
  
  const {opcion, nivel, tema} = UseInfoContext();

  const contenidoD = data.Contenido
  const imgNivel = Contenido
  const scrollX = React.useRef(new Animated.Value(0)).current;

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
            paddingTop: 100,
            paddingHorizontal: ESPACIO_CONTENEDOR,
          }}

        snapToInterval={ANCHO_CONTENEDOR}
        decelerationRate={0}
        scrollEventThrottle={16}
        
        //contenido
        data={Contenido}
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

          if(item.Nivel == nivel[1] && item.Opcion == opcion[1] && item.Tema == tema[1] ){
            //console.log(item.Nivel, ", ", item.Opcion, ", ", item.Tema)
            //console.log(nivel[1], " - ", opcion[1], " - ", tema[1])
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
                </Animated.View>
              </View>
            );
          }
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
    resizeMode: "cover",
    borderRadius: 24,
    margin: 0,
    marginBottom: 10,
    borderColor: "#2C6B80",
    borderWidth: 3
  },
});