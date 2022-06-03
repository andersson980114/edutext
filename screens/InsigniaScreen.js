import React from "react";
import { Text, View, StyleSheet } from "react-native";


export default function InsigniaScreen() {
  return (
    <View  tyle={Styles.container}> 
       
        <Text style={{fontSize:44, margin: 15, }}>Mis Insignias</Text>
        <View style={Styles.boxContainer}>
          <View style={Styles.box}></View> 
          <View style={Styles.box}></View> 
          <View style={Styles.box}></View> 
          <View style={Styles.box}></View> 
          <View style={Styles.box}></View> 
          <View style={Styles.box}></View> 
          <View style={Styles.box}></View> 
          <View style={Styles.box}></View> 
          <View style={Styles.box}></View> 
          <View style={Styles.box}></View> 
          <View style={Styles.box}></View> 
          <View style={Styles.box}></View> 
        </View>
    </View>
  )
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,  
  },
  boxContainer: { 
    flexWrap: 'wrap',
    alignContent: 'flex-end',
    justifyContent: 'space-around',    
    flexDirection: 'row',

  },
  box:{
    height: 120,
    width: 100,  
    backgroundColor: '#D9D9D9', 
    borderRadius: 20,
    marginTop: 15,
  },

});