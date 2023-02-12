import { React } from "react";
import {
    View,
    Text,
    StyleSheet,

    Image,
  } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
//inspir� de: https://reactnavigation.org/docs/tab-based-navigation/
// et de : https://ionic.io/ionicons/
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
        width: 70,
        height: 70,
        borderRadius: 30,
        marginRight: 20,
        borderWidth: 1,
        borderColor: "#d3d3d3"
    },
    contactContent: {
        justifyContent: "center",
    },
    contactName: {
        fontSize: 15,
        borderTopColor: '#008080',
        borderTopWidth: 2,
        fontWeight: "bold",
    },
    lastMessageStyle: {
        fontSize: 12,
        color: "#999",
    },
    background: {
        width: '100%',
        height: 700,
        position: 'absolute',
        opacity: 0.4
    },
});
function ConversationsList({ navigation}) {
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

    
    return (
        
        <View>
            <Image style={styles.background}
                source={{ uri: 'https://products.ls.graphics/mesh-gradients/images/99.-Roman.jpg' }} />

            <View style={styles.container}>

            {contacts.map((contact) => (
                <View key={contact.id} style={styles.contact}>
                    <Image source={{ uri: contact.image }} style={styles.contactImage} />
                    <View style={styles.contactContent}>
                        <Text
                            onPress={() => navigation.navigate(contact.name)}
                            style={styles.contactName}>
                            {contact.name}
                        </Text>
                        <Text
                            onPress={() => navigation.navigate(contact.name)}
                            style={styles.lastMessageStyle}>
                            {contact.lastMessage}
                        </Text>
                    </View>

                </View>
            ))}
            </View>
        </View>

    );
}

function SettingsScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image style={styles.background}
                source={{ uri: 'https://products.ls.graphics/mesh-gradients/images/88.-Sunny_1.jpg' }}/>
            <Text>Settings!</Text>
        </View>
    );
}

const Tab = createBottomTabNavigator();

  export default function MyConversationsScreen({ navigation }) {

    

      return (
        <Tab.Navigator
                screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                        if (route.name === "What's up") {
                            iconName = focused
                                ? 'chatbubble-ellipses'
                                : 'chatbubble-ellipses';
                        } else if (route.name === 'Create group') {
                            iconName = focused ? 'add-circle' : 'add-circle';
                        }
                    return <Ionicons name={iconName} size={size} color={color} />;
                  },
                  tabBarLabelStyle: {
                      fontSize: 10, color: "#e0ffff",
                      fontWeight: "bold", marginBottom: 7,
                      textShadowColor: "#white", textShadowOffset: { width: -0.5, height: 0.5 },
                      textShadowRadius: 2, opacity: 0.9
                  },
                tabBarIconStyle: { opacity: 0.9 },
                  tabBarActiveTintColor: '#40e0d0',
                  tabBarInactiveTintColor: '#fffafa',
                tabBarStyle: {
                    backgroundColor: "#2f4f4f",
                    flex: 0.09,
                    shadowColor: "black",
                  }
                })}
          >
              <Tab.Screen name="What's up" component={ConversationsList} options={{ tabBarBadge: "2"}} />
            <Tab.Screen name="Create group" component={SettingsScreen} />
            </Tab.Navigator>

    );
  }