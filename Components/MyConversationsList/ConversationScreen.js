import { React, useState } from "react";
import {
    View,
    Text,
    StyleSheet,

    Image,
  } from "react-native";
  
  export default function MyConversationsScreen({ navigation }) {

    const contacts = [
        {
          id: 1,
          name: "Papa",
          lastMessage:
            "Uh, he's from space, he came here to steal a necklace from a wizard.",
          image: "https://www.bootdey.com/img/Content/avatar/avatar1.png",
        },
        {
          id: 2,
          name: "PPEdeDingue2018_2028",
          lastMessage: "Hey, man! What's up, Mr Stark? :)",
          image: "https://www.bootdey.com/img/Content/avatar/avatar6.png",
        },
        {
          id: 3,
          name: "Some_random_guy",
          lastMessage: 3000,
          image:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Jacques_Chirac_%281997%29_%28cropped%29.jpg/230px-Jacques_Chirac_%281997%29_%28cropped%29.jpg",
        },
      ];
      
      const styles = StyleSheet.create({
        container: {
          padding: 20,
        },
        contactName: {
          fontSize: 30,
          fontWeight: "bold",
        },
        contact: {
          flexDirection: "row",
          marginBottom: 20,
        },
        contactImage: {
          width: 60,
          height: 60,
          borderRadius: 30,
          marginRight: 20,
        },
        contactContent: {
          justifyContent: "center",
        },
        contactName: {
          fontSize: 16,
          fontWeight: "bold",
        },
        lastMessageStyle: {
          fontSize: 12,
          color: "#999",
        },
      });

    return (
      <View style={styles.container}>
        <Text style={styles.contactName}>My Conversations</Text>
        {contacts.map((contact) => (
          <View key={contact.id} style={styles.contact}>
            <Image source={{ uri: contact.image }} style={styles.contactImage} />
            <View style={styles.contactContent}>
              <Text
                onPress={() => navigation.navigate(contact.name)}
                style={styles.contactName}
              >
                {contact.name}
              </Text>
              <Text
                onPress={() => navigation.navigate(contact.name)}
                style={styles.lastMessageStyle}
              >
                {contact.lastMessage}
              </Text>
            </View>
          </View>
        ))}
      </View>
    );
  }