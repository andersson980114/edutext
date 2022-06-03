import React from "react";
import { StyleSheet, Text, View } from "react-native";


export default function AvatarScreen() {
  return (
    <View  tyle={Styles.container}> 
        <View style={[Styles.box, {marginLeft: 15,}]}></View> 
        <Text style={{fontSize:44, margin: 15, }}>Mis Avatares</Text>
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
    height: 100,
    width: 100,  
    backgroundColor: '#D9D9D9', 
    borderRadius: 50,
    marginTop: 10,
  },

});