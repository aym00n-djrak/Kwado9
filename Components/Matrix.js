import * as sdk from "matrix-js-sdk";
import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import 'intl';
import 'intl/locale-data/jsonp/en'

export default function Matrix() {
  const baseUrl = "https://matrix.org";
  const username = "remyjova";
  const password = "remy9999.";
  const [Token, setToken] = React.useState("");

  const utilisateur = sdk.createClient({
    baseUrl: baseUrl,
    accessToken: Token,
  });

  async function login(baseUrl, username, password) {
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
  }

  //fonction pour room ID

  /*
  utilisateur.getRoom()
  .then((rooms) => {
    rooms.forEach((room) => {
        console.log(room.roomId);
    });
    })
    .catch((err) => {
    console.error(err);
    });
    */
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

  const message = "Hello World!";

  async function sendMessage(message) {
    const roomId = await getRoomId();
    console.log(roomId.room_id);
    try {
      await utilisateur.sendEvent(
        "!GTUBKeOukfhGfNMJui:matrix.org",
        "m.room.message",
        {
          msgtype: "m.text",
          body: message,
        }
      );
      console.log(`Message sent to room ${"!GTUBKeOukfhGfNMJui:matrix.org"}`);
    } catch (error) {
      console.error(
        `Error sending message to room ${"!GTUBKeOukfhGfNMJui:matrix.org"}: ${error}`
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
    utilisateur.startClient();

    utilisateur.once('sync', function(state, prevState, res) {
        console.log(state); // state will be 'PREPARED' when the client is ready to use
    });
  }

  return (
    <>
      <View>
        <Text style={styles.container}>Matrix Server</Text>
        <Text>Token: {Token}</Text>
        <Text>Room ID: </Text>

        <View style={styles.bouton}>
          <Button
            title="Login"
            onPress={() => login(baseUrl, username, password)}
          />
          <Button title="Receive Message" onPress={() => receiveMessage()} />
        </View>
        <Button title="Send Message Albert" onPress={() => sendMessageAlbert(message)} />
        <Button title="Get Rooms" onPress={() => getRooms()} />
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
    marginTop: 500,
  },
});
