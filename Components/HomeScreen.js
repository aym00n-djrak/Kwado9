import { React, useState } from "react";
import { View, Text, Button, Image } from "react-native";
import skull from "../assets/skull.png";
import Messagerie from "./Messagerie";
import IA from "./IA";
import WhatsApp from "./Whatsapp";
import Signal from "./Signal";
import CameraPhone from "./CameraPhone";
import Firebase from "./Firebase";
import IAtext from "./IAtext";
import SMSScreen from "./SMS";
import { useRoute } from "@react-navigation/native";

export default function HomeScreen({ navigation }) {

  const route = useRoute();
  const user = route.params?.user;
  
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
          alignSelf: "center",
        }}
      />
      <Text
        style={{
          color: "white",
          fontSize: 20,
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        Kwado9, {user?.email}
      </Text>
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

      <Button
        style={{ marginTop: 20 }}
        title="WhatsApp"
        onPress={() => navigation.navigate("WhatsApp")}
      />

      <Button
        style={{ marginTop: 20 }}
        title="Signal"
        onPress={() => navigation.navigate("Signal")}
      />

      <Button
        style={{ marginTop: 20 }}
        title="MyConversations"
        onPress={() => navigation.navigate("MyConversations")}
      />

      <Button
        style={{ marginTop: 20 }}
        title="Firebase"
        onPress={() => {
          navigation.navigate("Firebase", { user });
          console.log(user);
        }}
      />

      <Button
        style={{ marginTop: 20 }}
        title="IAtext"
        onPress={() => navigation.navigate("IAtext")}
      />

      <Button
        style={{ marginTop: 20 }}
        title="SMS"
        onPress={() => navigation.navigate("SMS")}
      />
    </View>
  );
}

export function MessagerieScreen({ navigation }) {
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

export function CameraScreen({ navigation }) {
  return <CameraPhone />;
}

export function AIScreen({ navigation }) {
  return <IA />;
}

export function WhatsAppScreen({ navigation }) {
  return <WhatsApp />;
}

export function SignalScreen({ navigation }) {
  return <Signal />;
}

export function DetailsScreen({ navigation }) {
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

export function FirebaseScreen({ navigation }) {
  return <Firebase />;
}

export function IAtextScreen({ navigation }) {
  return <IAtext />;
}

export function SMSScreenScreen({ navigation }) {
  return <SMSScreen />;
}
