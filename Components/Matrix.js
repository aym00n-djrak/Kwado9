//inspir� de : // et de : https://products.ls.graphics/mesh-gradients/


import * as sdk from "matrix-js-sdk";

import React from "react";
import { View, Text, StyleSheet, Button, TextInput, Image } from "react-native";
import { useEffect } from "react";
import { sendSMSAsync } from "expo-sms";
import { TouchableOpacity } from "react-native";
import { TextAnimationSlideDown } from 'react-native-text-effects';
import { ScrollView } from "react-native";
import { sleep } from "matrix-js-sdk/lib/utils";
import { writeAsStringAsync } from "expo-file-system";


const RoomButton = ({ roomName, onPress }) => (
  <Button title={roomName} onPress={onPress} />
);

export default function Matrix() {
  const baseUrl = "https://matrix.kwado9.fr";
  const username = "remy2";
  const password = ".[&3^AHWz(,u";
  const [Token, setToken] = React.useState("");
  const [roomname, setRoomname] = React.useState([]);
  const [rooms, setRooms] = React.useState([]);


  useEffect(() => {


    
    login();
  }, []);

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
    token();
    if (Token != "") {
      //attendre que le token soit charg
      await sleep(1000);
      getAllMess();
      await sleep(1000);
      //charger les rooms
      const roomsData  = await utilisateur.getRooms();
      setRooms(roomsData);
      //afficher les rooms
      console.log(rooms.length);
    }
    else {
      console.log("token vide");
  }
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

  async function sendMessageAlbert(message) {
    try {
      await utilisateur.sendEvent(
        "!yMjxKWHBCnwXGKwgUU:kwado9.fr",
        "m.room.message",
        {
          msgtype: "m.text",
          body: message,
        }
      );
      console.log(`Message sent to room ${"!yMjxKWHBCnwXGKwgUU:kwado9.fr"}`);
    } catch (error) {
      console.error(
        `Error sending message to room ${"!yMjxKWHBCnwXGKwgUU:kwado9.fr"}: ${error}`
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


  function getRooms() {
    var rooms = utilisateur.getRooms();
    rooms.forEach((room) => {
      console.log(room.roomId);
      console.log(room.name);
      //stocker id et nom dans une liste
      roomlist.push({ id: room.roomId, name: room.name });
      console.log(roomlist);
    });
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
    const room = utilisateur.getRoom(roomname);
    console.log(room);
  }

  function receiveMessageRoom(roomname) {
    utilisateur.on("Room.timeline", function (event, room, toStartOfTimeline) {
      if (toStartOfTimeline) {
        return;
      }
      if (event.getType() !== "m.room.message") {
        return;
      }

      if (event.getRoomId() === roomname && event.getContent().body[0] === '!') {
        sendNotice(event.event.content.body);
    }
    });

    utilisateur.startClient();
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

  function getRoomMess(){


  }

  function roomMessage(roomname) {
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

      <ScrollView>
      {roomlist.map((room, index) => (
        <RoomButton key={index} roomName={room.name} onPress={() => console.log('Pressed room:', room.name, setRoomname(room.id))} />
      ))}
      </ScrollView>

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
