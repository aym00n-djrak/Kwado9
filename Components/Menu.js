import React from "react";
import { View, Text, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Messagerie from "./Messagerie";
import { Image } from "react-native";
import CameraPhone from "./CameraPhone";
import skull from "../assets/skull.png";
import OpenAI from "./Openai";

const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000000",
      }}
    >
      <Image
        source={skull}
        style={{
          width: 200,
          height: 200,
          marginTop: 20,
          marginBottom: 200,
          alignSelf: "center",
        }}
      />
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Details")}
      />
      <Button
        style={{ marginTop: 20 }}
        title="Go to Messagerie"
        onPress={() => navigation.navigate("MessagerieScreen")}
      />
      <Button
        style={{ marginTop: 20 }}
        title="Go to Camera"
        onPress={() => navigation.navigate("Camera")}
      />
      <Button
        style={{ marginTop: 20 }}
        title="AI"
        onPress={() => navigation.navigate("AI")}
      />
    </View>
  );
}

function DetailsScreen({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000000",
      }}
    >
      <Text>Details Screen</Text>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate("Kwado9")}
      />
    </View>
  );
}

function MessagerieScreen({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#000000",
        color: "white",
      }}
    >
      <Text>Messagerie Screen</Text>
      <Messagerie />
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate("Kwado9")}
        style={{ color: "white", alignSelf: "flex-end" }}
      />
    </View>
  );
}

function CameraScreen({ navigation }) {
  return <CameraPhone />;
}

function AIScreen({ navigation }) {
  return (
    <OpenAI/>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Kwado9" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="MessagerieScreen" component={MessagerieScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="AI" component={AIScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
