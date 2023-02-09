//inspiré de : // et de : https://products.ls.graphics/mesh-gradients/


import * as sdk from "matrix-js-sdk";

import React from "react";
import { View, Text, StyleSheet, Button, TextInput, Image } from "react-native";
import { useEffect } from "react";
import { sendSMSAsync } from "expo-sms";
import { TouchableOpacity } from "react-native";
import { TextAnimationSlideDown } from 'react-native-text-effects';

export default function Matrix() {
  const baseUrl = "https://matrix.kwado9.fr";
  const username = "remy2";
  const password = ".[&3^AHWz(,u";
  const [Token, setToken] = React.useState("");
  const [roomname, setRoomname] = React.useState(
    "!ABIpsggGZrpjvEpNwP:matrix.org"
  );

  //creer list de room pour stocker id et nom

  const [roomlist, setRoomlist] = React.useState([]);

  const [roomalias, setRoomalias] = React.useState("");
  const [message, setMessage] = React.useState("Hello World");

  const utilisateur = sdk.createClient({
    baseUrl: baseUrl,
    accessToken: Token,
    userId: "@remy2:kwado9.fr",
  });

  async function token() {
    const client = sdk.createClient({
      baseUrl: baseUrl,
    });
    try {
      const response = await client.login("m.login.password", {
        user: username,
        password: password,
      });
      const accessToken = response.access_token;
      setToken(accessToken);
      console.log("Login successful, access token:", accessToken);

      return accessToken;
    } catch (error) {
      console.error("Login failed:", error);
    }
    console.log(utilisateur.getUserId());
  }

  async function login() {
    utilisateur.startClient();
  }

  async function getRoomId() {
    const roomAlias = "#room_alias:matrix.org";

    try {
      const roomId = await utilisateur.getRoomIdForAlias(roomAlias);
      return roomId;
    } catch (error) {
      console.error(`Error getting room ID for alias ${roomAlias}: ${error}`);
      return null;
    }
  }

  //fonction pour envoyer un message

  async function sendMessage(message) {
    try {
      await utilisateur.sendEvent(
        "!ABIpsggGZrpjvEpNwP:matrix.org",
        "m.room.message",
        {
          msgtype: "m.text",
          body: message,
        }
      );
      console.log(`Message sent to room ${"!ABIpsggGZrpjvEpNwP:matrix.org"}`);
    } catch (error) {
      console.error(
        `Error sending message to room ${"!ABIpsggGZrpjvEpNwP:matrix.org"}: ${error}`
      );
    }
  }

  async function sendMessageAlbert(message) {
    try {
      await utilisateur.sendEvent(
        "!kMumRLTwVUMmyLDfwD:matrix.org",
        "m.room.message",
        {
          msgtype: "m.text",
          body: message,
        }
      );
      console.log(`Message sent to room ${"!kMumRLTwVUMmyLDfwD:matrix.org"}`);
    } catch (error) {
      console.error(
        `Error sending message to room ${"!kMumRLTwVUMmyLDfwD:matrix.org"}: ${error}`
      );
    }
  }

  async function sendMess(message, roomname) {
    try {
      await utilisateur.sendEvent(roomname, "m.room.message", {
        msgtype: "m.text",
        body: message,
      });
      console.log(`Message sent to room ${roomname}`);
    } catch (error) {
      console.error(`Error sending message to room ${roomname}: ${error}`);
    }
  }

  //fonction pour recevoir un message

  async function receiveMessage() {
    const roomId = await getRoomId();

    try {
      const messages = await utilisateur.getSyncState({
        roomId: "!GTUBKeOukfhGfNMJui:matrix.org",
      });
      console.log(messages);
    } catch (error) {
      console.error(
        `Error receiving message from room ${roomId.room_id}: ${error}`
      );
    }
  }

  //fonction pour afficher tous les messages

  function getAllMessages() {
    Object.keys(utilisateur.store.rooms).forEach((roomId) => {
      utilisateur.getRoom(roomId).timeline.forEach((t) => {
        console.log(t.event);
      });
    });
  }

  function getRooms() {
    var rooms = utilisateur.getRooms();
    rooms.forEach((room) => {
      console.log(room.roomId);
      console.log(room.name);
      //stocker id et nom dans une liste
      roomlist.push({ id: room.roomId, name: room.name });
      console.log(roomlist);
    });
    //lorsque l'on a fini de parcourir la liste on ferme le client
  }

  function createRoom() {
    utilisateur
      .createRoom({
        visibility: "public",
        room_alias_name: roomalias,
        name: "Room Name",
        topic: "Room Topic",
        invite: ["@alice:example.org", "@bob:example.org"],
        is_direct: true,
        preset: "trusted_private_chat",
        initial_state: [
          {
            type: "m.room.history_visibility",
            content: {
              history_visibility: "joined",
            },
          },
        ],
        creation_content: {
          "m.federate": false,
        },
      })
      .then(function (room) {
        console.log(`Created room ${room.roomId}`);
      })
      .catch(function (err) {
        console.error(`Error creating room ${err}`);
      });
  }

  function joinRoom(roomname) {
    utilisateur
      .joinRoom(roomname)
      .then(function (room) {
        console.log(`Joined room ${room.roomId}`);
      })
      .catch(function (err) {
        console.error(`Error joining room ${err}`);
      });
  }

  function leaveRoom(roomname) {
    utilisateur
      .leave(roomname)
      .then(function () {
        console.log(`Left room ${roomname}`);
      })
      .catch(function (err) {
        console.error(`Error leaving room ${err}`);
      });
  }

  function showRoom(roomname) {
    roomname = "!kMumRLTwVUMmyLDfwD:matrix.org";
    const room = utilisateur.getRoom(roomname);
    console.log(room);
  }

  function receiveMessageRoom(roomname) {
    roomname = "!kMumRLTwVUMmyLDfwD:matrix.org";
    const room = utilisateur.getRoom(roomname);
    room.timeline.forEach((t) => {
      console.log(t.event);
    });
  }

  function getAllMess() {
    utilisateur.on("Room.timeline", function (event, room, toStartOfTimeline) {
      if (toStartOfTimeline) {
        return;
      }
      if (event.getType() !== "m.room.message") {
        return;
      }
      console.log(
        "(%s) %s said: %s",
        room.name,
        event.getSender(),
        event.getContent().body
      );
    });

    utilisateur.startClient();
  }

  function roomMessage(roomname) {
    roomname = "!kMumRLTwVUMmyLDfwD:matrix.org";
    utilisateur.on("Room.timeline", function (event, room, toStartOfTimeline) {
      if (toStartOfTimeline) {
        return;
      }
      if (event.getType() !== "m.room.message") {
        return;
      }
      if (room.roomId == roomname) {
        console.log(
          "(%s) %s said: %s",
          room.name,
          event.getSender(),
          event.getContent().body
        );
      }
    });

    utilisateur.startClient();
  }

  //another way to receive message

  function stopClient() {
    utilisateur.stopClient();
  }

  return (
      <>
          <View>
              <Image
                  source={{ uri: 'https://products.ls.graphics/mesh-gradients/images/18.-Buttercup_1.jpg' }}
                  style={styles.background}
              />
              <TextAnimationSlideDown value={"Matrix server"} delay={50} duration={500} useNativeDriver={true} style={{
                  color: '#5f9ea0', fontSize: 40, fontWeight: 'bold'
              }} />
              <Text style={styles.normalText}>Token: {Token}</Text>
              <View style={styles.bouton}>
                  <TouchableOpacity onPress={() => token()}>
                      <Text style={styles.normalBouton}>Sync Token</Text>
                  </TouchableOpacity>
                  </View>
              <Text style={styles.normalText}>Room ID: </Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setRoomname(text)}
          value={roomname}
        ></TextInput>
              <Text style={styles.normalText}>Room Alias: </Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setRoomalias(text)}
          value={roomalias}
        ></TextInput>
              <Text style={styles.normalText}>Message: </Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setMessage(text)}
          value={message}
        ></TextInput>
        <View style={styles.bouton}>
                  <TouchableOpacity onPress={() => login()}>
                      <Text style={styles.normalBouton}>Login</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => sendMessage(message)}>
                      <Text style={styles.normalBouton}>Send Message</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => receiveMessage()}>
                      <Text style={styles.normalBouton}>Receive Message</Text>
                  </TouchableOpacity>

        </View>

        <View style={styles.bouton}>

                  <TouchableOpacity onPress={() => sendMess(message, roomname)}>
                      <Text style={styles.normalBouton}>Send message room</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => sendMessageAlbert(message)}>
                      <Text style={styles.normalBouton}>Send Message Albert</Text>
                  </TouchableOpacity>

        </View>
        <View style={styles.bouton}>

                  <TouchableOpacity onPress={() => getRooms()}>
                      <Text style={styles.normalBouton}>Get Rooms</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => createRoom()}>
                      <Text style={styles.normalBouton}>Create Room</Text>
                  </TouchableOpacity>

        </View>
        <View style={styles.bouton}>

                  <TouchableOpacity onPress={() => joinRoom(roomname)}>
                      <Text style={styles.normalBouton}>Join Room</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => leaveRoom(roomname)}>
                      <Text style={styles.normalBouton}>Leave Room</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => showRoom(roomname)}>
                      <Text style={styles.normalBouton}>Show Room</Text>
                  </TouchableOpacity>

        </View>
        <View style={styles.bouton}>

                  <TouchableOpacity onPress={() => receiveMessageRoom(roomname)}>
                      <Text style={styles.normalBouton}>Receive Message Room</Text>
                  </TouchableOpacity>

          {Object.keys(utilisateur.store.rooms).map((key) => {
            return (
              <Button
                title={utilisateur.store.rooms[key].name}
                onPress={() =>
                  receiveMessageRoom(utilisateur.store.rooms[key].roomId)
                }
                />
            );
          })}


          {roomlist.map((room) => {
            return (
              <Button
                title={room.name}
                onPress={() => receiveMessageRoom(room.roomId)}
              />
            );
          })

          }

        </View>
        <View style={styles.bouton}>

                  <TouchableOpacity onPress={() => getAllMess()}>
                      <Text style={styles.normalBouton}>Get All Messages</Text>
                  </TouchableOpacity>

        </View>
        <View style={styles.bouton}>
                  <TouchableOpacity onPress={() => roomMessage(roomname)}>
                      <Text style={styles.normalBouton}>Room Message</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => stopClient()}>
                      <Text style={styles.normalBouton}>Stop Client</Text>
                  </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
        backgroundColor: "transparent",
  },
  bouton: {
    padding: 4,
    flexDirection: "row",
    justifyContent: "space-around",
    //alignItems: "center",
  },
  input: {
    height: 40,
      borderWidth: 2,
      width: 300,
      borderColor: "#00ced1",
      borderRadius: 17,
      marginLeft: 15,
      opacity: 0.7,
      padding: 4,
      fontSize: 12
    },
    background: {
        height: 400,
        margin: 300,
        position: 'absolute'
    },
    normalBouton: {
        fontWeight: "bold",
        fontSize: 15,
        padding: 5,
        color: "#0000cd",
        borderColor: "#20b2aa",
        borderRadius: 10,
        borderWidth: 0.7,
        backgroundColor: "#66cdaa",
        opacity: 0.68,
        textShadowColor: "#black", textShadowOffset: { width: -2, height: 2 },
        textShadowRadius: 10,
        marginTop: 2
    },
    normalText: {
        fontSize: 15,
        fontWeight: "bold",
        marginLeft: 15,
        color: "#800080"
    }
});
