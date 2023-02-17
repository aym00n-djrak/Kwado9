import { React } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./HomeScreen";

import {
  MessagerieScreen,
  AIScreen,
  MatrixScreen,
  LoginMatrixScreen,
  RoomMatrixScreen,
} from "./HomeScreen";



import { useState } from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Button } from "react-native";

const Tab = createBottomTabNavigator();

export default function App({ user, utilisateur, auth }) {

  console.log("Token Menu :"+utilisateur?.getAccessToken());

  return (
    <NavigationContainer>
      <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen}  initialParams={{ utilisateur: utilisateur, user: user, auth: auth}}/>
        <Tab.Screen
          name="Chats"
          component={MatrixScreen}
          initialParams={{ utilisateur: utilisateur }}
        />
        
        <Tab.Screen
          name="Profil"
          component={MessagerieScreen}
          initialParams={{ utilisateur: utilisateur, user: user, auth: auth}}
        />
        <Tab.Screen name="AI" component={AIScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


