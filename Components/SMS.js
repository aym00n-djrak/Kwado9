import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  StatusBar,
  TouchableOpacity,
  Image,
  Alert,
  Button,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";
import skull from "../assets/skull.png";
import {
  TextAnimationFadeIn,
  TextAnimationZoom,
  TextAnimationRain,
  TextAnimationSlideDown,
  TextAnimationSlideUp,
  TextAnimationSlideLeft,
  TextAnimationSlideRight,
  TextAnimationShake,
  TextAnimationReverse,
  TextAnimationDeZoom,
} from "react-native-text-effects";

import { LinearGradient } from "expo-linear-gradient";
import { useEffect } from "react";
import * as SMS from "expo-sms";
import * as Print from "expo-print";
import * as FileSystem from "expo-file-system";

//inspiré de https://www.npmjs.com/package/react-native-text-effects
// et de: https://www.rnexamples.com/react-native-examples/z/Contact-view
// et de : https://www.kindacode.com/article/how-to-set-a-gradient-background-in-react-native/
// et de: https://snack.expo.dev/@saad-bashar/scaledbutton

export default function SMSScreen() {
  const [isAvailable, setIsAvailable] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(undefined);
  const [recipients, setRecipients] = useState([]);
  const [message, setMessage] = useState(undefined);

  const selectedAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    async function checkAvailability() {
      const isSmsAvailable = await SMS.isAvailableAsync();
      setIsAvailable(isSmsAvailable);
    }
    checkAvailability();
  }, []);

  const sendSms = async () => {
    console.log("Generating pdf");
    const { uri } = await Print.printToFileAsync({
      html: "<h1>Hi friends</h1>",
    });

    console.log(uri);

    const contentUri = await FileSystem.getContentUriAsync(uri);
    console.log(contentUri);

    const { result } = await SMS.sendSMSAsync(recipients, message, {
      attachments: {
        uri: contentUri,
        mimeType: "application/pdf",
        filename: "Hi.pdf",
      },
    });

    console.log(result);
  };

  const addNumber = () => {
    let newRecipients = [...recipients];
    newRecipients.push(phoneNumber);
    setRecipients(newRecipients);
    setPhoneNumber(undefined);
  };

  const showRecipients = () => {
    if (recipients.length === 0) {
      return <View><Text>No recipients added</Text></View>
    }

    return recipients.map((recipient, index) => {
      return <Text key={index}>{recipient}</Text>;
    });
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={skull} />
      <LinearGradient
        // Background Linear Gradient
        colors={["rgba(0,0,0,0.8)", "transparent"]}
        style={styles.background}
      />
      <LinearGradient
        // Button Linear Gradient
        colors={["#003399", "#006666"]}
        style={styles.background}
      >
          </LinearGradient>
          <TextAnimationFadeIn
              value={"Send an SMS!"}
              delay={100}
              duration={1000}
              style={{
                  color: "#40e0d0",
                  fontWeight: "bold",
              }}
          />
      <View style={styles.inputContainer}>
        <Image
          style={styles.inputIcon}
          source={{ uri: "https://img.icons8.com/color/70/000000/user.png" }}
        />
        <TextInput
          value={phoneNumber}
                  placeholder="Recipient number"
                  keyboardType='numeric'
                  onChangeText={(value) => setPhoneNumber(value), addNumber}
          style={styles.textInput}
              />
              <TouchableOpacity style={styles.recipientButton} onPress={() => setRecipients([])}>
                  <Text style={styles.buttonText}>Clear</Text>
              </TouchableOpacity>
        </View>


        <View style={styles.inputMessage}>

     
        <TextInput
          value={message}
          placeholder="  Write your message here..."
          underlineColorAndroid="transparent"
          multiline={true}
          numberOfLines={4}
          onChangeText={(value) => setMessage(value)}
          style={styles.inputMessage}
        />

</View>

      {showRecipients()}



      {isAvailable ? (
                        <Animated.View style={[{ transform: [{ scale: selectedAnim }] }]}>

                  <TouchableOpacity title="Send SMS" onPress={() => {
            Animated.sequence([
                Animated.timing(selectedAnim, {
                    toValue: 1.3,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(selectedAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                })
            ]).start(() => sendSms());
    }}
    style={styles.sendButton}>
            <Text style={styles.sendButtonText}>Send SMS</Text>
        </TouchableOpacity>
        </Animated.View>
      ) : (
        <Text>SMS not available</Text>
      )}

      <StatusBar style="auto" />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#003366",
    width: "100%",
    height: 200,
  },
  logo: {
    width: 120,
    height: 120,
    justifyContent: "center",
    marginBottom: 20,
  },
  inputMessage: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#f0ffff",
    borderRadius: 10,
    borderBottomWidth: 1,
    width: 250,
    height: 85,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#f0ffff",
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: "center",
  },
  buttonContainer: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 100,
    borderRadius: 30,
  },
  sendButton: {
    backgroundColor: "#26a7de",
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 100,
    borderRadius: 30,
    },
    recipientButton: {
        backgroundColor: "#faebd7",
        opacity: 0.59,
        width: 50,
        height: 30,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#ffe4b5",
        color: "#d3d3d3",
        fontSize: 6,
    },
  buttonText: {
      color: "#008080",
      fontSize: 13,
      textAlign: "center",
      fontWeight: "bold"
    },
    background: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    }
});
