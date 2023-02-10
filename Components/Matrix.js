//inspir� de : // et de : https://products.ls.graphics/mesh-gradients/

import * as sdk from "matrix-js-sdk";

import React from "react";
import { View, Text, StyleSheet, Button, TextInput, Image } from "react-native";
import { useEffect } from "react";
import { sendSMSAsync } from "expo-sms";
import { TouchableOpacity } from "react-native";
import { TextAnimationSlideDown } from "react-native-text-effects";
import { ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";

const RoomButton = ({ roomName, onPress }) => (
  <Button title={roomName} onPress={onPress} />
);

export default function Matrix({ navigation }) {
  const route = useRoute();
  const utilisateur = route.params?.utilisateur;

  const [roomname, setRoomname] = React.useState([]);
  const [roomalias, setRoomalias] = React.useState("");
  const [message, setMessage] = React.useState("Hello World");
  const [state, setState] = React.useState(null);
  const [rooms, setRooms] = React.useState([]);

  useEffect(() => {
    utilisateur.startClient();
    utilisateur.once("sync", function (state, prevState, res) {
      if (state === "PREPARED") {
        setState(state);
        console.log("Matrix client started and ready!");
        setRooms(utilisateur.getRooms());
      }
    });
    return () => {
      utilisateur.stopClient();
    };
  }, []);

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

      if (
        event.getRoomId() === roomname &&
        event.getContent().body[0] === "!"
      ) {
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

  function getRoomMess() {}

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

  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredRooms = rooms.filter((room) =>
    room.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <View style={styles.container}>
        <Image
          source={{
            uri: "https://products.ls.graphics/mesh-gradients/images/18.-Buttercup_1.jpg",
          }}
          style={styles.background}
        />
        <TextAnimationSlideDown
          value={"Matrix server"}
          delay={50}
          duration={500}
          useNativeDriver={true}
          style={{
            color: "#5f9ea0",
            fontSize: 40,
            fontWeight: "bold",
          }}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher une salle..."
          onChangeText={(term) => setSearchTerm(term)}
          value={searchTerm}
        />
        <ScrollView>
          {state === "PREPARED" &&
            filteredRooms.map((room) => {
              return (
                <View key={room.roomId} style={styles.bouton}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("RoomMatrix", { room: room })
                    }
                  >
                    <Text style={styles.normalBouton}>{room.name}</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
        </ScrollView>
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
    fontSize: 12,
  },
  background: {
    height: 400,
    margin: 300,
    position: "absolute",
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
    textShadowColor: "#black",
    textShadowOffset: { width: -2, height: 2 },
    textShadowRadius: 10,
    marginTop: 2,
  },
  normalText: {
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 15,
    color: "#800080",
  },
  searchInput: {
    height: 40,
    borderWidth: 2,
    width: 300,
    borderColor: "#00ced1",
    borderRadius: 17,
    marginLeft: 15,
    opacity: 0.7,
    padding: 4,
    fontSize: 12,
  }
});
