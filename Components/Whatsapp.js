// This is an Example to Send WhatsApp Message from React Native App
import React, { Component } from "react";
import { View, StyleSheet, Text, Linking, TextInput } from "react-native";
import { TouchableOpacity } from "react-native";

export default function WhatsApp() {
  const [mobile_no, setMobile_no] = React.useState("");
  const [message, setMessage] = React.useState("");

  return (
    <View style={styles.container}>
      <Text>Install WhatsApp</Text>
      <Text>Enter Mobile Number like 33652224439</Text>
      <TextInput
        value={mobile_no}
        onChangeText={(mobile_no) => setMobile_no(mobile_no)}
        placeholder={"Enter Mobile to Send WhatsApp Message"}
        style={styles.input}
        keyboardType={"numeric"}
      />
      <Text>Enter Message</Text>
      <TextInput
        value={message}
        onChangeText={(message) => setMessage(message)}
        placeholder={"Enter a message to send"}
        style={styles.input}
        keyboardType={"text"}
      />

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
        <Text style={styles.generateButtonText}> Send WhatsApp Message</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 50,
    paddingTop: 30,
    backgroundColor: "#ffffff",
  },
  input: {
    width: 250,
    height: 44,
    padding: 10,
    margin: 20,
    backgroundColor: "#D3D3D3",
  },
  generateButton: {
    height: 50,
    width: "100%",
    backgroundColor: "black",
    borderRadius: 10,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  generateButtonText: {
    color: "white",
  },
});
