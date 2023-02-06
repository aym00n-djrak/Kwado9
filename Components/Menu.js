import { React, useState } from "react";
import { View, Text, Button, StyleSheet, FlatList, Dimensions, KeyboardAvoidingView, TextInput, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Messagerie from "./Messagerie";
import { Image } from "react-native";
import CameraPhone from "./CameraPhone";
import skull from "../assets/skull.png";
import IA from "./IA";
import WhatsApp from "./Whatsapp";
import Signal from "./Signal";
import SMS from "./SMS";
import Firebase from "./Firebase";

const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000000",
      }}
    >
      <Image
        source={skull}
        style={{
          width: 200,
          height: 200,
          marginTop: 10,
          marginBottom: 100,
          alignSelf: "center",
        }}
      />
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Details")}
      />
      <Button
              style={{ marginTop: 10 }}
        title="Go to Messagerie"
        onPress={() => navigation.navigate("MessagerieScreen")}
      />
      <Button
              style={{ marginTop: 10 }}
        title="Go to Camera"
        onPress={() => navigation.navigate("Camera")}
      />
      <Button
              style={{ marginTop: 10 }}
        title="AI"
        onPress={() => navigation.navigate("AI")}
          />

      <Button
        style={{ marginTop: 10 }}
        title="SMS"
        onPress={() => navigation.navigate("SMS")}
      />

      <Button
              style={{ marginTop: 10 }}
        title="WhatsApp"
        onPress={() => navigation.navigate("WhatsApp")}
      />

      <Button
              style={{ marginTop: 10 }}
              title="Signal"
              onPress={() => navigation.navigate("Signal")}
          />

      <Button
              style={{ marginTop: 10 }}
              title="MyConversations"
              onPress={() => navigation.navigate("MyConversations")}
          />

      <Button
              style={{ marginTop: 10 }}
              title="Firebase"
              onPress={() => navigation.navigate("Firebase")}
          />

    </View>
  );
}

function DetailsScreen({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000000",
      }}
    >
      <Text>Details Screen</Text>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate("Kwado9")}
      />
    </View>
  );
}

function MessagerieScreen({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#000000",
        color: "white",
      }}
    >
      <Text>Messagerie Screen</Text>
      <Messagerie />
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate("Kwado9")}
        style={{ color: "white", alignSelf: "flex-end" }}
      />
    </View>
  );
}

function CameraScreen({ navigation }) {
  return <CameraPhone />;
}

function SMSScreen({ navigation }) {
    return <SMS />;
}

function AIScreen({ navigation }) {
  return (
    <IA/>
  );
}

function WhatsAppScreen({ navigation }) {
  return (
    <WhatsApp/>
  );
}

function SignalScreen({ navigation }) {
    return (
        <Signal />
    );
}

function FirebaseScreen({ navigation }) {
    return (
        <Firebase />
    );
}

const contacts = [
    {
        id: 1,
        name: 'Papa',
        lastMessage: "Uh, he's from space, he came here to steal a necklace from a wizard.",
        image: 'https://www.bootdey.com/img/Content/avatar/avatar1.png',
    },
    {
        id: 2,
        name: 'PPEdeDingue2018_2028',
        lastMessage: "Hey, man! What's up, Mr Stark? :)",
        image: 'https://www.bootdey.com/img/Content/avatar/avatar6.png',
    },
    {
        id: 3,
        name: 'Some_random_guy',
        lastMessage: 3000,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Jacques_Chirac_%281997%29_%28cropped%29.jpg/230px-Jacques_Chirac_%281997%29_%28cropped%29.jpg',
    },
];



const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    contactName: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    contact: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    contactImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 20,
    },
    contactContent: {
        justifyContent: 'center',
    },
    contactName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    lastMessageStyle: {
        fontSize: 12,
        color: '#999',
    },
});


function MyConversationsScreen({ navigation }) {
            return (
                <View style={styles.container}>
                    <Text style={styles.contactName}>My Conversations</Text>
                    {contacts.map(contact => (
                        <View key={contact.id} style={styles.contact} >
                            <Image source={{ uri: contact.image }} style={styles.contactImage} />
                            <View style={styles.contactContent}>
                                <Text onPress={() => navigation.navigate(contact.name)} style={styles.contactName}>{contact.name}</Text>
                                <Text onPress={() => navigation.navigate(contact.name)} style={styles.lastMessageStyle}>{contact.lastMessage}</Text>
                            </View>
                        </View>
                    ))}
                </View>);
        }

function PapaScreen({ navigation }) {

    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        list: {
            paddingHorizontal: 17,
        },
        footer: {
            flexDirection: 'row',
            height: 60,
            backgroundColor: '#eeeeee',
            paddingHorizontal: 10,
            padding: 5,
        },
        btnSend: {
            backgroundColor: '#00BFFF',
            width: 40,
            height: 40,
            borderRadius: 360,
            alignItems: 'center',
            justifyContent: 'center',
        },
        iconSend: {
            width: 30,
            height: 30,
            alignSelf: 'center',
        },
        inputContainer: {
            borderBottomColor: '#F5FCFF',
            backgroundColor: '#FFFFFF',
            borderRadius: 30,
            borderBottomWidth: 1,
            height: 40,
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
            marginRight: 10,
        },
        inputs: {
            height: 40,
            marginLeft: 16,
            borderBottomColor: '#FFFFFF',
            flex: 1,
        },
        balloon: {
            maxWidth: 250,
            padding: 15,
            borderRadius: 20,
        },
        itemIn: {
            alignSelf: 'flex-start',
        },
        itemOut: {
            alignSelf: 'flex-end',
        },
        time: {
            alignSelf: 'flex-end',
            margin: 15,
            fontSize: 12,
            color: '#808080',
        },
        item: {
            marginVertical: 14,
            flex: 1,
            flexDirection: 'row',
            backgroundColor: '#E0FFFF',
            borderRadius: 300,
            padding: 5,
        },
    })

    const data = [
        { id: 1, date: '9:50 am', type: 'in', message: 'Lorem ipsum dolor sit amet' },
        { id: 2, date: '9:50 am', type: 'out', message: 'Lorem ipsum dolor sit amet' },
        { id: 3, date: '9:50 am', type: 'in', message: 'Lorem ipsum dolor sit a met' },
        { id: 4, date: '9:50 am', type: 'in', message: 'Lorem ipsum dolor sit a met' },
        { id: 5, date: '9:50 am', type: 'out', message: 'Lorem ipsum dolor sit a met' },
        { id: 6, date: '9:50 am', type: 'out', message: 'Lorem ipsum dolor sit a met' },
        { id: 7, date: '9:50 am', type: 'in', message: 'Lorem ipsum dolor sit a met' },
        { id: 8, date: '9:50 am', type: 'in', message: 'Lorem ipsum dolor sit a met' },
        { id: 9, date: '9:50 am', type: 'in', message: 'Lorem ipsum dolor sit a met' },
    ]

    const [messages, setMessages] = useState(data)
    const [newMsg, setNewMsg] = useState()

    const renderDate = date => {
        return <Text style={styles.time}>{date}</Text>
    }

    return (
        <View style={styles.container}>
            <FlatList
                style={styles.list}
                data={messages}
                keyExtractor={item => {
                    return item.id
                }}
                renderItem={message => {
                    const item = message.item
                    let inMessage = item.type === 'in'
                    let itemStyle = inMessage ? styles.itemIn : styles.itemOut
                    return (
                        <View style={[styles.item, itemStyle]}>
                            {!inMessage && renderDate(item.date)}
                            <View style={[styles.balloon]}>
                                <Text>{item.message}</Text>
                            </View>
                            {inMessage && renderDate(item.date)}
                        </View>
                    )
                }}
            />
            <View style={styles.footer}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.inputs}
                        placeholder="Write a message..."
                        underlineColorAndroid="transparent"
                        onChangeText={msg => setNewMsg({ msg })}
                    />
                </View>

                <TouchableOpacity style={styles.btnSend}>
                    <Image
                        source={{ uri: 'https://img.icons8.com/small/75/ffffff/filled-sent.png' }}
                        style={styles.iconSend}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )




    }

function PPEdeDingue2018_2028Screen({ navigation }) {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        list: {
            paddingHorizontal: 17,
        },
        footer: {
            flexDirection: 'row',
            height: 60,
            backgroundColor: '#eeeeee',
            paddingHorizontal: 10,
            padding: 5,
        },
        btnSend: {
            backgroundColor: '#00BFFF',
            width: 40,
            height: 40,
            borderRadius: 360,
            alignItems: 'center',
            justifyContent: 'center',
        },
        iconSend: {
            width: 30,
            height: 30,
            alignSelf: 'center',
        },
        inputContainer: {
            borderBottomColor: '#F5FCFF',
            backgroundColor: '#FFFFFF',
            borderRadius: 30,
            borderBottomWidth: 1,
            height: 40,
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
            marginRight: 10,
        },
        inputs: {
            height: 40,
            marginLeft: 16,
            borderBottomColor: '#FFFFFF',
            flex: 1,
        },
        balloon: {
            maxWidth: 250,
            padding: 15,
            borderRadius: 20,
        },
        itemIn: {
            alignSelf: 'flex-start',
        },
        itemOut: {
            alignSelf: 'flex-end',
        },
        time: {
            alignSelf: 'flex-end',
            margin: 15,
            fontSize: 12,
            color: '#808080',
        },
        item: {
            marginVertical: 14,
            flex: 1,
            flexDirection: 'row',
            backgroundColor: '#E0FFFF',
            borderRadius: 300,
            padding: 5,
        },
    })

    const data = [
        { id: 1, date: '9:50 am', type: 'in', message: 'Lorem ipsum dolor sit amet' },
        { id: 2, date: '9:50 am', type: 'out', message: 'Lorem ipsum dolor sit amet' },
        { id: 3, date: '9:50 am', type: 'in', message: 'Lorem ipsum dolor sit a met' },
        { id: 4, date: '9:50 am', type: 'in', message: 'Lorem ipsum dolor sit a met' },
        { id: 5, date: '9:50 am', type: 'out', message: 'Lorem ipsum dolor sit a met' },
        { id: 6, date: '9:50 am', type: 'out', message: 'Lorem ipsum dolor sit a met' },
        { id: 7, date: '9:50 am', type: 'in', message: 'Lorem ipsum dolor sit a met' },
        { id: 8, date: '9:50 am', type: 'in', message: 'Lorem ipsum dolor sit a met' },
        { id: 9, date: '9:50 am', type: 'in', message: 'Lorem ipsum dolor sit a met' },
    ]

    const [messages, setMessages] = useState(data)
    const [newMsg, setNewMsg] = useState()

    const renderDate = date => {
        return <Text style={styles.time}>{date}</Text>
    }

    return (
        <View style={styles.container}>
            <FlatList
                style={styles.list}
                data={messages}
                keyExtractor={item => {
                    return item.id
                }}
                renderItem={message => {
                    const item = message.item
                    let inMessage = item.type === 'in'
                    let itemStyle = inMessage ? styles.itemIn : styles.itemOut
                    return (
                        <View style={[styles.item, itemStyle]}>
                            {!inMessage && renderDate(item.date)}
                            <View style={[styles.balloon]}>
                                <Text>{item.message}</Text>
                            </View>
                            {inMessage && renderDate(item.date)}
                        </View>
                    )
                }}
            />
            <View style={styles.footer}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.inputs}
                        placeholder="Write a message..."
                        underlineColorAndroid="transparent"
                        onChangeText={msg => setNewMsg({ msg })}
                    />
                </View>

                <TouchableOpacity style={styles.btnSend}>
                    <Image
                        source={{ uri: 'https://img.icons8.com/small/75/ffffff/filled-sent.png' }}
                        style={styles.iconSend}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )



}

function Some_random_guyScreen({ navigation }) {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        list: {
            paddingHorizontal: 17,
        },
        footer: {
            flexDirection: 'row',
            height: 60,
            backgroundColor: '#eeeeee',
            paddingHorizontal: 10,
            padding: 5,
        },
        btnSend: {
            backgroundColor: '#00BFFF',
            width: 40,
            height: 40,
            borderRadius: 360,
            alignItems: 'center',
            justifyContent: 'center',
        },
        iconSend: {
            width: 30,
            height: 30,
            alignSelf: 'center',
        },
        inputContainer: {
            borderBottomColor: '#F5FCFF',
            backgroundColor: '#FFFFFF',
            borderRadius: 30,
            borderBottomWidth: 1,
            height: 40,
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
            marginRight: 10,
        },
        inputs: {
            height: 40,
            marginLeft: 16,
            borderBottomColor: '#FFFFFF',
            flex: 1,
        },
        balloon: {
            maxWidth: 250,
            padding: 15,
            borderRadius: 20,
        },
        itemIn: {
            alignSelf: 'flex-start',
        },
        itemOut: {
            alignSelf: 'flex-end',
        },
        time: {
            alignSelf: 'flex-end',
            margin: 15,
            fontSize: 12,
            color: '#808080',
        },
        item: {
            marginVertical: 14,
            flex: 1,
            flexDirection: 'row',
            backgroundColor: '#E0FFFF',
            borderRadius: 300,
            padding: 5,
        },
    })

    const data = [
        { id: 1, date: '9:50 am', type: 'in', message: 'Lorem ipsum dolor sit amet' },
        { id: 2, date: '9:50 am', type: 'out', message: 'Lorem ipsum dolor sit amet' },
        { id: 3, date: '9:50 am', type: 'in', message: 'Lorem ipsum dolor sit a met' },
        { id: 4, date: '9:50 am', type: 'in', message: 'Lorem ipsum dolor sit a met' },
        { id: 5, date: '9:50 am', type: 'out', message: 'Lorem ipsum dolor sit a met' },
        { id: 6, date: '9:50 am', type: 'out', message: 'Lorem ipsum dolor sit a met' },
        { id: 7, date: '9:50 am', type: 'in', message: 'Lorem ipsum dolor sit a met' },
        { id: 8, date: '9:50 am', type: 'in', message: 'Lorem ipsum dolor sit a met' },
        { id: 9, date: '9:50 am', type: 'in', message: 'Lorem ipsum dolor sit a met' },
    ]

    const [messages, setMessages] = useState(data)
    const [newMsg, setNewMsg] = useState()

    const renderDate = date => {
        return <Text style={styles.time}>{date}</Text>
    }

    return (
        <View style={styles.container}>
            <FlatList
                style={styles.list}
                data={messages}
                keyExtractor={item => {
                    return item.id
                }}
                renderItem={message => {
                    const item = message.item
                    let inMessage = item.type === 'in'
                    let itemStyle = inMessage ? styles.itemIn : styles.itemOut
                    return (
                        <View style={[styles.item, itemStyle]}>
                            {!inMessage && renderDate(item.date)}
                            <View style={[styles.balloon]}>
                                <Text>{item.message}</Text>
                            </View>
                            {inMessage && renderDate(item.date)}
                        </View>
                    )
                }}
            />
            <View style={styles.footer}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.inputs}
                        placeholder="Write a message..."
                        underlineColorAndroid="transparent"
                        onChangeText={msg => setNewMsg({ msg })}
                    />
                </View>

                <TouchableOpacity style={styles.btnSend}>
                    <Image
                        source={{ uri: 'https://img.icons8.com/small/75/ffffff/filled-sent.png' }}
                        style={styles.iconSend}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )



}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Kwado9" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="MessagerieScreen" component={MessagerieScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="AI" component={AIScreen} />
        <Stack.Screen name="WhatsApp" component={WhatsAppScreen} />
        <Stack.Screen name="Signal" component={SignalScreen} />
        <Stack.Screen name="MyConversations" component={MyConversationsScreen} />
        <Stack.Screen name="Papa" component={PapaScreen} />
        <Stack.Screen name="PPEdeDingue2018_2028" component={PPEdeDingue2018_2028Screen} />
        <Stack.Screen name="Some_random_guy" component={Some_random_guyScreen} />
        <Stack.Screen name="SMS" component={SMSScreen} />
        <Stack.Screen name="Firebase" component={FirebaseScreen} />
       </Stack.Navigator>
    </NavigationContainer>
  );
}

