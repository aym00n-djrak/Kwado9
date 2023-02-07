import { StyleSheet, Text, Image, View,TextInput, Button, Alert } from 'react-native';
import React from 'react';
import Menu from './Components/Menu';
import 'react-native-url-polyfill/auto';
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth';
import  {initializeApp} from 'firebase/app';
import { firebaseConfig } from './firebaseConfig';
import  {useState} from 'react';
import { signOut } from 'firebase/auth';
import { useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { TextAnimationFadeIn, TextAnimationZoom, TextAnimationRain, TextAnimationSlideDown, TextAnimationSlideUp, TextAnimationSlideLeft, TextAnimationSlideRight, TextAnimationShake, TextAnimationReverse, TextAnimationDeZoom } from 'react-native-text-effects';

export default function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const app = initializeApp(firebaseConfig);

  const [user, setUser] = useState('');
 

  const [login, setLogin] = useState(0);

  useEffect(() => {
  console.log(user);
 
  }, [])


  const auth = getAuth();

  const handleCreateAccount = () => {
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          console.log('Account created')
          setUser(userCredential?.user);
          console.log(user);
          Alert.alert('Hello ' + user.email)      
      
      })
      .catch((error) => {
          console.log(error)
      })
  }

  const handleSignIn = () => {
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          console.log('Signed in')
          setUser(userCredential?.user);
          console.log(user.email)
          Alert.alert('Signed in')      
          setLogin(1);
          console.log(login);
      })
      .catch((error) => {
          console.log(error)
      })
  }

  const handleSignOut = () => {
      signOut(auth)
      .then((userCredential) => {
          console.log('Signed out')
          Alert.alert('Signed out')
      })
      .catch((error) => {
          console.log(error)
      })
  }


  return (
    <>
    {login == 1 ? <Menu user =  {user} /> : 
              <View style={styles.container}>
                  <Image
                      source={{ uri: 'https://products.ls.graphics/mesh-gradients/images/02.-Egg-Sour.jpg' }}
                      style={styles.background}
                  />
                  <View style={styles.formulaire}>

                      <TextAnimationShake value={"Kwado9"} delay={100} duration={1000} style={{
                          color: '#f5f5f5', fontSize: 60, fontWeight: 'bold', opacity: 0.7
                      }} />

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

                  </View>
                  <View style={styles.buttonBackground}>
                      <Text style={styles.generateButton} onPress={handleCreateAccount}>Sign up</Text>


                      <Text style={styles.generateButton} onPress={handleSignIn}>Sign in</Text>
                      <Text style={styles.generateButton} onPress={handleSignOut}>Sign out</Text>

              </View>
              </View>
}
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
        backgroundColor: 'transparent',
        marginRight: 70,
    },
  input: {
      borderWidth: 1,
      borderRadius: 8,
      borderColor: '#191970',
      padding: 8,
      marginRight: 45,
      margin: 7,
      width: 230,
    },
    background: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    inputDescription: {
        color: "#191970",
        fontSize: 20,
        marginBottom: 0.5,
        fontWeight: 'bold',
        marginLeft: 8,
    },
    generateButton: {
        //alignItems: 'center',
        //justifyContent: 'center',
        paddingVertical: 15,
        paddingHorizontal: 29,
        borderRadius: 20,
        margin: 4,
        elevation: 5,
        marginRight: 220,
        backgroundColor: '#483d8b',
        color: "white",
        fontWeight: 'bold',
        opacity: 0.95,
        fontSize: 15,

    },
    buttonBackground: {
        marginBottom: 140,
        marginLeft: 4,
        background: "transparent",

    },
})