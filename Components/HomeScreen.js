import { React, useState } from "react";
import { StyleSheet, View, Text, Button, Image } from "react-native";
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

import Matrix from "./Matrix";

//sources: https://products.ls.graphics/mesh-gradients/
//j'ai enlevé: <Text style={styles.generateButton2} onPress={() => {navigation.navigate("Firebase", { user });console.log(user);}}>Firebase</Text>
export default function HomeScreen({ navigation }) {

  const route = useRoute();
  const user = route.params?.user;
  
  return (

          <View style={styles.container}>
              <Image
              source={{ uri: 'https://products.ls.graphics/mesh-gradients/images/28.-Deco.jpg' }}
                  style={styles.background}
              />
          <Text
              style={{
                  color: "gray",
                  fontSize: 10,
              }}>
              CONNECTED AS: Kwado9, {user?.email}
          </Text>
          <Image style={styles.logo} source={skull} />
          <View style={styles.buttonBackground}>
              <Text style={styles.generateButton} onPress={() => navigation.navigate("MessagerieScreen")}>Go to Messagerie</Text>
              <Text style={styles.generateButton} onPress={() => navigation.navigate("Camera")}>Go to Camera</Text>
              <Text style={styles.generateButton} onPress={() => navigation.navigate("AI")}>Image AI</Text>
              <Text style={styles.generateButton} onPress={() => navigation.navigate("WhatsApp")}>WhatsApp</Text>
              <Text style={styles.generateButton2} onPress={() => navigation.navigate("Signal")}>Signal</Text>
              <Text style={styles.generateButton2} onPress={() => navigation.navigate("MyConversations")}>My Conversations</Text>
              <Text style={styles.generateButton2} onPress={() => navigation.navigate("IAtext")}>IAtext</Text>
              <Text style={styles.generateButton2} onPress={() => navigation.navigate("SMS")}>SMS</Text>
              <Text style={styles.generateButton2} onPress={() => navigation.navigate("Matrix")}>Matrix</Text>
              </View>
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



export function FirebaseScreen({ navigation }) {
  return <Firebase />;
}

export function IAtextScreen({ navigation }) {
  return <IAtext />;
}

export function SMSScreenScreen({ navigation }) {
  return <SMSScreen />;
}


export function MatrixScreen({ navigation }) {
  return <Matrix />;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#ffffff",
    },
    background: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    generateButton: {
        textAlign: 'left',
        paddingVertical: 5,
        height: 40,
        width: 210,
        paddingHorizontal: 15,
        borderRadius: 22,
        borderWidth: 1,
        borderColor: "#d3d3d3",
        margin: 3,
        elevation: 1,
        marginRight: 120,
        backgroundColor: '#f0fff0',
        color: "#2f4f4f",
        fontWeight: 'bold',
        opacity: 0.92,
        fontSize: 17,
        marginLeft: 10,
    },
    generateButton2: {
        textAlign: 'right',
        paddingVertical: 5,
        height: 40,
        width: 220, 
        paddingHorizontal: 15,
        borderRadius: 22,
        borderWidth: 1,
        borderColor: "#d3d3d3",
        margin: 3,
        elevation: 1,
        marginRight: 10,
        backgroundColor: '#191970',
        color: "#fdf5e6",
        fontWeight: 'bold',
        opacity: 0.72,
        fontSize: 17,
        marginLeft: 120,
    },
    buttonBackground: {
        opacity: 1,
    },
    logo: {
        width: 370,
        height: 190,
        resizeMode: 'contain',
        flex: 0.6,
        opacity: 0.99,
    },
})