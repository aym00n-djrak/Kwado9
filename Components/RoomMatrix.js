import { StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import {
  View,
  Text,
  Button,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";

export default function RoomMatrix({ navigation }) {
  const route = useRoute();
  const room = route.params?.room;
  const utilisateur = route.params?.utilisateur;

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(room.timeline);

  async function sendMess(message, roomname) {
    try {
      await utilisateur.sendEvent(roomname, "m.room.message", {
        msgtype: "m.text",
        body: message,
      });
      console.log(`Message sent to room ${roomname}`);
      updateMessages();
    } catch (error) {
      console.error(`Error sending message to room ${roomname}: ${error}`);
    }
  }

  const updateMessages = () => {
    setMessages(room.timeline);
  };

  return (
    <>
      <View style={styles.container}>
            <Text style={styles.name}>{room.name}</Text>

            <ScrollView name="messages" style={styles.userInfo}>
              <Text style={styles.userInfo}>Messages: </Text>
              {messages.map((message, index) => {
                return (
                  <View key={index} style={styles.item}>
                    <Text key={index} style={styles.balloon}>
                      {message.event.sender}: {message.event.content.body}
                    </Text>
                  </View>
                );
              })}
            </ScrollView>


            <View style={styles.footer}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.inputs}
                  placeholder="Write a message..."
                  underlineColorAndroid="transparent"
                  onChangeText={(msg) => setMessage(msg)}
                />
              </View>
              <TouchableOpacity
                style={styles.btnSend}
                onPress={() =>
                  sendMess(message, room.roomId) && updateMessages()
                }
              >
                <Image
                  source={{
                    uri: "https://img.icons8.com/small/75/ffffff/filled-sent.png",
                  }}
                  style={styles.iconSend}
                />
              </TouchableOpacity>
            </View>
          </View>
   
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00BFFF",

  },
  list: {
    paddingHorizontal: 17,
  },
  footer: {
    flexDirection: "row",
    height: 60,
    backgroundColor: "#eeeeee",
    paddingHorizontal: 10,
    padding: 5,
  },
  btnSend: {
    backgroundColor: "#00BFFF",
    width: 40,
    height: 40,
    borderRadius: 360,
    alignItems: "center",
    justifyContent: "center",
  },
  iconSend: {
    width: 30,
    height: 30,
    alignSelf: "center",
  },
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 1,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 10,
  },
  inputs: {
    height: 40,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1,
  },
  balloon: {
    maxWidth: 250,
    padding: 15,
    borderRadius: 20,
  },
  itemIn: {
    alignSelf: "flex-start",
  },
  itemOut: {
    alignSelf: "flex-end",
  },
  time: {
    alignSelf: "flex-end",
    margin: 15,
    fontSize: 12,
    color: "#808080",
  },
  item: {
    marginVertical: 14,
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#E0FFFF",
    borderRadius: 300,
    padding: 5,
  },
  header: {
    backgroundColor: "#00BFFF",
  },

  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: "600",
    backgroundColor: "#00BFFF",
  },
});
