import { React } from "react";
import { View, Text, Button } from "react-native";
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
} from "./HomeScreen";

import MyConversationsScreen from "./MyConversationsList/ConversationScreen";
import PapaScreen from "./MyConversationsList/Papa";
import PPEdeDingue2018_2028Screen from "./MyConversationsList/PPEdeDingue2018_2028";
import Some_random_guyScreen from "./MyConversationsList/Some_random_guyScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />
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
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}


