import { StyleSheet, Text, View,TextInput, Button, Alert } from 'react-native';
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
        <Text>firebase : {login}</Text>

        <Text>Email</Text>
        <TextInput
            value={email}
            onChangeText={(email) => setEmail(email)}
            style={styles.input}
        />

        <Text>Password</Text>
        <TextInput
            value={password}
            onChangeText={(password) => setPassword(password)}
            style={styles.input}
        />

        <Button
            title="Create Account"
            onPress={handleCreateAccount}
        />

        <Button
            title="Sign In"
            onPress={handleSignIn}
        />

        <Button

            title="Sign Out"
            onPress={handleSignOut}
        />
    </View>
}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
  },

  input: {
      borderWidth: 1,
      borderColor: 'black',
      padding: 10,
      margin: 10,
      width: 200
  }
})