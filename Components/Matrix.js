import * as sdk from "matrix-js-sdk";

import React from "react";
import { View, Text, StyleSheet, Button, TextInput } from "react-native";
import { useEffect } from "react";

export default function Matrix() {
  const baseUrl = "https://matrix.org";
  const username = "remyjova";
  const password = "remy9999.";
  const [Token, setToken] = React.useState("");
  const [roomname, setRoomname] = React.useState("");

  const utilisateur = sdk.createClient({
    baseUrl: baseUrl,
    accessToken: Token,
    userId: "@remyjova:matrix.org",
  });

  useEffect(async () => {
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
  }, []);

  async function login() {
    utilisateur.startClient();

    utilisateur.once('sync', function(state, prevState, res) {
      console.log(state); // state will be 'PREPARED' when the client is ready to use
  });
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

  const message = "Hello World!!!!!!!!!!!!!!!!";

  async function sendMessage(message) {
    const roomId = await getRoomId();
    console.log(roomId.room_id);
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
    const roomId = await getRoomId();
    console.log(roomId.room_id);
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
    rooms.forEach(room => {
        console.log(room.roomId);
    });
  }

  function createRoom () {
    utilisateur.createRoom({
      visibility: "public",
      room_alias_name: "wesperetremy789",
      name: "Room Name",
      topic: "Room Topic",
      invite: ["@alice:example.org", "@bob:example.org"],
      is_direct: true,
      preset: "trusted_private_chat",
      initial_state: [
          {
              type: "m.room.history_visibility",
              content: {
                  history_visibility: "joined"
              }
          }
      ],
      creation_content: {
          "m.federate": false
      }
  }).then(function(room) {
      console.log(`Created room ${room.roomId}`);
  }).catch(function(err) {
      console.error(`Error creating room ${err}`);
  });
  }

  function joinRoom(roomname) {
    utilisateur.joinRoom(roomname).then(function(room) {
      console.log(`Joined room ${room.roomId}`);
    }).catch(function(err) {
      console.error(`Error joining room ${err}`);
    });
  }

  function leaveRoom(roomname) {
    utilisateur.leave(roomname).then(function() {
      console.log(`Left room ${roomname}`);
    }).catch(function(err) {
      console.error(`Error leaving room ${err}`);
    });
  }

  function showRoom(roomname) {
    roomname= "!kMumRLTwVUMmyLDfwD:matrix.org"
    const room = utilisateur.getRoom(roomname);
    console.log(room);
  }

  function receiveMessageRoom(roomname) {
    roomname= "!kMumRLTwVUMmyLDfwD:matrix.org"
    const room = utilisateur.getRoom(roomname);
    room.timeline.forEach((t) => {
      console.log(t.event);
    });
  }

  function getAllMess(){
    utilisateur.on("Room.timeline", function(event, room, toStartOfTimeline) {
      if(toStartOfTimeline) {
        return;
      }
      if(event.getType() !== "m.room.message") {
        return;
      }
      console.log(
        "(%s) %s said: %s",
        room.name,
        event.getSender(),
        event.getContent().body,
      );
    });

    utilisateur.startClient();
  }

  function roomMessage(roomname) {
    roomname= "!kMumRLTwVUMmyLDfwD:matrix.org"
    utilisateur.on("Room.timeline", function(event, room, toStartOfTimeline) {
      if(toStartOfTimeline) {
        return;
      }
      if(event.getType() !== "m.room.message") {
        return;
      }
      if(room.roomId == roomname){
        console.log(
          "(%s) %s said: %s",
          room.name,
          event.getSender(),
          event.getContent().body,
        );
      }
    });

    utilisateur.startClient();
  }

  //another way to receive message

  function getRoomId(roomname) {
    roomname= "!kMumRLTwVUMmyLDfwD:matrix.org"
    utilisateur.getRoomIdForAlias(roomname).then(function(roomId) {
      console.log(roomId);
    });
  }

  function receiveMessageRoom2(roomname) {
    roomname= "!kMumRLTwVUMmyLDfwD:matrix.org"
    utilisateur.scrollback(roomname).then(function(events) {
      events.forEach(function(event) {
        if (event.getType() === "m.room.message") {
          console.log(event.getContent().body);
        }
      });
    });
  }

  function stopClient() {
    utilisateur.stopClient();
  }


  return (
    <>
      <View>
        <Text style={styles.container}>Matrix Server</Text>
        <Text>Token: {Token}</Text>
        <Text>UserId: </Text>
                  <Text>Room ID: </Text>
                  <TextInput style={styles.input} onChangeText={text => setRoomname(text)} value={roomname}></TextInput>

        <View style={styles.bouton}>
          <Button
            title="Login"
            onPress={() => login()}
          />
          <Button title="Send Message" onPress={() => sendMessage(message)} />
          <Button title="Receive Message" onPress={() => receiveMessage()} />
        </View>
        <Button title="Send Message Albert" onPress={() => sendMessageAlbert(message)} />
        <Button title="Get Rooms" onPress={() => getRooms()} />
        <Button title="Create Room" onPress={() => createRoom()} />
        <Button title="Join Room" onPress={() => joinRoom(roomname)} />
        <Button title="Leave Room" onPress={() => leaveRoom(roomname)} />
        <Button title="Show Room" onPress={() => showRoom(roomname)} />
        <Button title="Receive Message Room" onPress={() => receiveMessageRoom(roomname)} />
        <Button title="Receive Message Room 2" onPress={() => receiveMessageRoom2(roomname)} />
        <Button title="Get Room ID" onPress={() => getRoomId(roomname)} />

        <Button title="Get All Messages" onPress={() => getAllMess()} />
        <Button title="Room Message" onPress={() => roomMessage(roomname)} />
        <Button title="Stop Client" onPress={() => stopClient()} />
              </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },
  bouton: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
    marginTop: 50,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },

});
