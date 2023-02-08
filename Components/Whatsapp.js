// This is an Example to Send WhatsApp Message from React Native App
//inspir� de https://www.rnexamples.com/react-native-examples/bw/Login-Screen-with-background-and-logo
// et de : https://products.ls.graphics/mesh-gradients/

import React from "react";
import { View, StyleSheet, Text, Linking, Image, TextInput } from "react-native";
import { TouchableOpacity } from "react-native";
import { TextAnimationSlideDown} from 'react-native-text-effects';


export default function WhatsApp() {
  const [mobile_no, setMobile_no] = React.useState("");
  const [message, setMessage] = React.useState("");


    return (
        <View style={styles.container}>
          <Image
              source={{ uri: 'https://products.ls.graphics/mesh-gradients/images/88.-Sunny_1.jpg' }}
              style={styles.background}
          />
          <View style={styles.logoContainer}>
              <Image
                  source={{ uri: "https://www.edigitalagency.com.au/wp-content/uploads/WhatsApp-logo-png.png" }}
                  style={styles.logo}
              />
          </View>
          <View style={styles.formContainer}>
                <TextAnimationSlideDown value={"WhatsApp!"} delay={100} duration={1000} useNativeDriver={true} style={{
                    color: '#3cb371', fontSize: 40, fontWeight: 'bold'
 }} />


                <Text style={styles.textNormal}>Step1: Install WhatsApp</Text>
                <Text style={styles.textNormal}>Step2: Choose WhatsApp contact number</Text>
                <Text style={styles.textNormal}>Step3: Send!</Text>

                <Text style={styles.textDescription}>Enter Mobile Number</Text>
              
      <TextInput
        value={mobile_no}
        onChangeText={(mobile_no) => setMobile_no(mobile_no)}
        placeholder={"Example: 33652224439"}
        style={styles.input}
        keyboardType={"numeric"}
              />
              <View style={styles.inputMessage}>

                    <Text style={styles.textDescription}>Enter Message</Text>

      <TextInput
        value={message}
        onChangeText={(message) => setMessage(message)}
        placeholder={"Write message here..."}
        style={styles.input}
        keyboardType={"text"}
      />
</View>
      <TouchableOpacity
        style={styles.generateButton}
        onPress={() => {
          Linking.openURL(
            "http://api.whatsapp.com/send?text=" +
            message +
            "&phone=+" +
            mobile_no
          );
        }}
      >
        <Text style={styles.generateButtonText}> Send message</Text>
      </TouchableOpacity>
          </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 30,
        backgroundColor: "#ffffff",

    },
    textNormal: {
        color: "#778899",
        fontSize: 10,
        marginBottom: 5,
    },
    textDescription: {
        color: "#2e8b57",
        fontSize: 20,
        marginBottom: 4,
    },
  input: {
      height: 50,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#ddd',
      color: '#333',
      paddingLeft: 20,
      textAlign: 'left',
      fontStyle: 'italic',
      marginTop: 10,
  },
  generateButton: {
      width: '100%',
      height: 90,
      alignItems: 'center',
      justifyContent: 'center',
  },
  generateButtonText: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 12,
      borderRadius: 30,
      elevation: 3,
      backgroundColor: '#2e8b57',
      color: "#faf0e6",
      fontWeight: 'bold'
    },
    title: {
        fontSize: 24,
        color: '#008000',
        marginBottom: 20,
        marginTop: 20,
    },
    formContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 150,
        height: 140,
        resizeMode: 'contain',

    },
    background: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },

});