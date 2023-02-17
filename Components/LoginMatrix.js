import {
    StyleSheet,
    Text,
    Image,
    View,
    TextInput,
    Button,
    Alert,
  } from "react-native";
  import React from "react";
  import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
  } from "firebase/auth";
  import { initializeApp } from "firebase/app";
  import { firebaseConfig } from "../firebaseConfig";
  import { useState } from "react";
  import { signOut } from "firebase/auth";
  import { useEffect } from "react";
  import { TextAnimationShake } from "react-native-text-effects";
  
  import "react-native-url-polyfill/auto";
  
  //sources: https://products.ls.graphics/mesh-gradients/
  
  import * as sdk from "matrix-js-sdk";
  
  
  export default function LoginMatrix ({ navigation }) {
    const [email, setEmail] = useState("remyj@outlook.fr");
    const [password, setPassword] = useState("remy9999");
    const app = initializeApp(firebaseConfig);
  
    const [user, setUser] = useState("");
  
    useEffect(() => {
      console.log(user);
    }, []);
  
    const auth = getAuth();
  
    const handleCreateAccount = () => {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log("Account created");
          setUser(userCredential?.user);
          console.log(user);
          Alert.alert("Hello " + user.email);
        })
        .catch((error) => {
          console.log(error);
        });
    };
  
    const handleSignIn = () => {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log("Signed in");
          setUser(userCredential?.user);
          console.log(user.email);
          Alert.alert("Signed in");
          console.log(utilisateur.getAccessToken());
        })
        .catch((error) => {
          console.log(error);
        });
    };
  
    const handleSignOut = () => {
      signOut(auth)
        .then((userCredential) => {
          console.log("Signed out");
          Alert.alert("Signed out");
        })
        .catch((error) => {
          console.log(error);
        });
    };
  
    /////////////////////////////////MATRIX BACKGROUND/////////////////////////////////////
    /*
    const baseUrl = "https://matrix.kwado9.fr";
    const username = "remy2";
    const pass = ".[&3^AHWz(,u";
  */
  
    const [baseUrl, setBaseUrl] = useState("https://matrix.org");
    const [username, setUsername] = useState("remyjova");
    const [pass, setPass] = useState("remy9999.");
    const [user_id, setUser_id] = useState("@remy2:kwado9.fr");
  
    const [Token, setToken] = useState("");
    const [rooms, setRooms] = useState([]);
  
    useEffect(() => {
      setUser_id("@" + username + ":" + baseUrl.slice(8));
      getToken();
    }, []);
  
    const utilisateur = sdk.createClient({
      baseUrl: baseUrl,
      accessToken: Token,
      userId: user_id,
    });
  
    const getToken = async () => {
      await token();
      console.log(utilisateur.getAccessToken());
    };
  
    async function token() {
      const client = sdk.createClient({
        baseUrl: baseUrl,
      });
      try {
        const response = await client.login("m.login.password", {
          user: username,
          password: pass,
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
  
    return (
      <>
        <View style={styles.container}>
          <Image
            source={{
              uri: "https://products.ls.graphics/mesh-gradients/images/02.-Egg-Sour.jpg",
            }}
            style={styles.background}
          />
          <View style={styles.formulaire}>
            <TextAnimationShake
              value={"Kwado9"}
              delay={100}
              duration={1000}
              useNativeDriver={true}
              style={{
                color: "#f5f5f5",
                fontSize: 60,
                fontWeight: "bold",
                opacity: 0.7,
              }}
            />
  
            <Text style={styles.inputDescription}>Email</Text>
            <TextInput
              value={email}
              onChangeText={(email) => setEmail(email)}
              style={styles.input}
            />
  
            <Text style={styles.inputDescription}>Password</Text>
            <TextInput
              value={password}
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
              style={styles.input}
            />
            <View style={styles.buttonBackground}>
              <Text style={styles.generateButton} onPress={handleCreateAccount}>
                Sign up
              </Text>
  
              <Text style={styles.generateButton} onPress={handleSignIn}>
                Sign in
              </Text>
              <Text style={styles.generateButton} onPress={handleSignOut}>
                Sign out
              </Text>
            </View>
  
            <View style={styles.buttonBackground}>
              <TextInput
                value={baseUrl}
                onChangeText={(baseUrl) => setBaseUrl(baseUrl)}
                style={styles.input}
              />
              <TextInput
                value={username}
                onChangeText={(username) => setUsername(username)}
                style={styles.input}
              />
              <TextInput
                value={pass}
                onChangeText={(pass) => setPass(pass)}
                style={styles.input}
              />
              <TextInput
                value={user_id}
                onChangeText={(user_id) => setUser_id(user_id)}
                style={styles.input}
              />
            </View>
          </View>
        </View>
      </>
    );
  }

  
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: "#ffffff",
    },
    formulaire: {
      flex: 1,
      //alignItems: "center",
      marginTop: 170,
      backgroundColor: "transparent",
      marginRight: 30,
    },
    input: {
      borderWidth: 1,
      borderRadius: 8,
      borderColor: "#191970",
      padding: 8,
      marginRight: 45,
      margin: 7,
      width: 230,
    },
    background: {
      width: "100%",
      height: "100%",
      position: "absolute",
    },
    inputDescription: {
      color: "#191970",
      fontSize: 20,
      marginBottom: 0.5,
      fontWeight: "bold",
      marginLeft: 8,
    },
    matrixdescription: {
      color: "#191970",
      fontSize: 20,
      marginBottom: 0.5,
      fontWeight: "bold",
      marginLeft: 8,
    },
    generateButton: {
      //alignItems: 'center',
      //justifyContent: 'center',
      paddingVertical: 8,
      paddingHorizontal: 25,
      borderRadius: 13,
      margin: 6,
      elevation: 8,
      marginRight: 190,
      backgroundColor: "#483d8b",
      color: "white",
      fontWeight: "bold",
      opacity: 0.95,
      fontSize: 15,
    },
    buttonBackground: {
      marginBottom: 10,
      marginTop: 13,
      background: "transparent",
    },
  });
  