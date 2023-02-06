import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth';
import  {initializeApp} from 'firebase/app';
import { firebaseConfig } from '../firebaseConfig';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import React, {useState} from 'react';
import { StyleSheet } from 'react-native';
import { signOut } from 'firebase/auth';

export default function Firebase() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const app = initializeApp(firebaseConfig);

    const auth = getAuth();

    const handleCreateAccount = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log('Account created')
            const user = userCredential?.user;
            console.log(user)
            Alert.alert('Hello ' + user?.email)       

        })
        .catch((error) => {
            console.log(error)
        })
    }

    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log('Signed in')
            const user = userCredential?.user;
            console.log(user)
            Alert.alert('Signed in')           

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
        <View>
            <Text>firebase</Text>

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
    )   
}


const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
        margin: 10,
        width: 200
    }
})