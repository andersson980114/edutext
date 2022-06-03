import React from "react";
import { Text, View,Button, Image, StyleSheet, Dimensions, Pressable ,SafeAreaView} from "react-native";
import { Card} from 'react-native-elements'


export default function HomeScreen({ navigation }) {
  return (
    <View View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        
        <View style={styles.cardContainer} >
          <Pressable onPressIn={() => navigation.navigate('Word')} >
            <Image 
              resizeMode="cover"
              source={require('../assets/screenAssets/WordLogo.png')}
              style={styles.image}
              />
          </Pressable>
        </View>

        <View style={styles.cardContainer} >
          <Pressable onPress={() => navigation.navigate('PreguntaA')} >
            <Image 
                resizeMode="cover"
                source={require('../assets/screenAssets/DocsLogo.png')}
                style={styles.image}
              />
          </Pressable>
        </View>

        
    </View>
  )
};

const deviceWidth = Math.round(Dimensions.get('window').width)
const deviceHeight = Math.round(Dimensions.get('window').height)
const styles = StyleSheet.create({
  cardContainer:{
    width: deviceWidth - 35,
    height: deviceHeight * 0.35,
    backgroundColor: '#EBEBEB',
    borderRadius: 20,
    shadowColor:'#000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.75,
    shadowRadius: 5,
    elevation: 10,
    margin: 20,  
    },
    
    image: {
      resizeMode: 'cover',
      width: deviceWidth * 0.55,
      height: deviceHeight * 0.32,
      alignContent: 'center',
      alignSelf: 'center', },
  
  }) 