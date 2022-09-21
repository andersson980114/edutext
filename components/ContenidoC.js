import { View, Text, StyleSheet, FlatList, Image, Dimensions, SafeAreaView, Animated} from 'react-native' 
import * as data from '../Data/wordContenido.json'
import { Contenido } from '../Data/imagenes';


const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const ANCHO_CONTENEDOR = width * 0.9;
const ESPACIO_CONTENEDOR = (width - ANCHO_CONTENEDOR) / 2;
const ESPACIO = 10;
const ALTURA_BACKDROP = height * 0.5;

export default function ContenidoC({idImg}) {
    const contenidoD = data.Contenido
    const imgNivel = Contenido
    var url = imgNivel[idImg].url
  return (
    <View style={styles.continer}> 
        <Image  style={styles.posterImage}
            source={url}/>
    </View>
  )
}


const styles = StyleSheet.create({
    continer:{ 
      padding: ESPACIO, 
    },
    posterImage: {
      width: ANCHO_CONTENEDOR * 1,
      height: ANCHO_CONTENEDOR * 1.2,
      resizeMode: "cover",
      borderRadius: 24,
      margin: 0,
      marginBottom: 10,
      borderColor: "#2C6B80",
      borderWidth: 3, 
    },
  });