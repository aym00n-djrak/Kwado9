import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth';
import  {initializeApp} from 'firebase/app';
import { firebaseConfig } from '../firebaseConfig';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import React, {useState} from 'react';
import { StyleSheet } from 'react-native';
import { signOut } from 'firebase/auth';
import { useEffect } from 'react';

export default function Firebase({navigation, user}) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const app = initializeApp(firebaseConfig);

    const [login, setLogin] = useState(1);

    useEffect(() => {
    console.log(user);
   
    }, [])

    const [user1, setUser] = useState('');

    const auth = getAuth();

    const handleCreateAccount = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log('Account created')
            setUser(userCredential?.user);
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
            const user1= userCredential?.user;
            console.log(user1)
            setUser(user1);
            console.log(user)
            Alert.alert('Signed in')      
            setLogin(1);
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

            <Button title='Menu' onPress={() => 
            navigation.navigate('HomeScreen')
            } />
        </View>
        </>
    )
}

function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Button
                title="Go to Details"
                onPress={() => navigation.navigate('Details')}
            />
        </View>
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