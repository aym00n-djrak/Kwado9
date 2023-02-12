import { React } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./HomeScreen";

import {
  MessagerieScreen,
  CameraScreen,
  AIScreen,
  WhatsAppScreen,
  SignalScreen,
  DetailsScreen,
  FirebaseScreen,
  IAtextScreen,
  SMSScreenScreen,
  MatrixScreen,
  RoomMatrixScreen,
  AppScreen,
} from "./HomeScreen";

import MyConversationsScreen from "./MyConversationsList/ConversationScreen";
import PapaScreen from "./MyConversationsList/Papa";
import PPEdeDingue2018_2028Screen from "./MyConversationsList/PPEdeDingue2018_2028";
import Some_random_guyScreen from "./MyConversationsList/Some_random_guyScreen";

import { useState } from "react";

const Stack = createStackNavigator();

export default function App({user, utilisateur, auth, login}) {

  return (
    <NavigationContainer    >
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Kwado9" component={HomeScreen} initialParams={{user : user, utilisateur: utilisateur, auth: auth, login: login}} />
        <Stack.Screen name="MessagerieScreen" component={MessagerieScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="AI" component={AIScreen} />
        <Stack.Screen name="WhatsApp" component={WhatsAppScreen} />
        <Stack.Screen name="Signal" component={SignalScreen} />

        <Stack.Screen
          name="MyConversations"
          component={MyConversationsScreen}
        />
        <Stack.Screen name="Papa" component={PapaScreen} />
        <Stack.Screen
          name="PPEdeDingue2018_2028"
          component={PPEdeDingue2018_2028Screen}
        />
        <Stack.Screen
          name="Some_random_guy"
          component={Some_random_guyScreen}
        />
        <Stack.Screen name="Firebase" component={FirebaseScreen} />

        <Stack.Screen name="IAtext" component={IAtextScreen} />

        <Stack.Screen name="SMS" component={SMSScreenScreen} />

        <Stack.Screen name="Matrix" component={MatrixScreen} initialParams={{utilisateur : utilisateur}} />

        <Stack.Screen name='RoomMatrix' component={RoomMatrixScreen}  initialParams={{utilisateur : utilisateur}} />

        <Stack.Screen name='App' component={AppScreen}  initialParams={{utilisateur : utilisateur}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
