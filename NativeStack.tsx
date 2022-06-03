import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Home from "./screens/Home";


export type StackParamlist = {
    Home: undefined
} ;

const Stack = createNativeStackNavigator<StackParamlist>();

export const NativeStack = () => {

    return(
        <Stack.Navigator initialRouteName = "Home">
            <Stack.Screen name="Home" component={Home} options={{title: "Inicio"}}  />
        </Stack.Navigator>
    )
}