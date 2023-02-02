import React, { useState, useRef } from 'react'
import { StyleSheet, Text, View, TextInput, StatusBar, TouchableOpacity, Image, Alert, TouchableWithoutFeedback, Animated } from 'react-native'
import skull from "../assets/skull.png";
import { TextAnimationFadeIn, TextAnimationZoom, TextAnimationRain, TextAnimationSlideDown, TextAnimationSlideUp, TextAnimationSlideLeft, TextAnimationSlideRight, TextAnimationShake, TextAnimationReverse, TextAnimationDeZoom } from 'react-native-text-effects';

import { LinearGradient } from 'expo-linear-gradient';

//inspiré de https://www.npmjs.com/package/react-native-text-effects
// et de: https://www.rnexamples.com/react-native-examples/z/Contact-view
// et de : https://www.kindacode.com/article/how-to-set-a-gradient-background-in-react-native/
// et de: https://snack.expo.dev/@saad-bashar/scaledbutton

export default function SMSScreen() {

    const [number, setNumber] = useState()
    const [message, setMessage] = useState()
    const [selected, setSelected] = useState(false)
    const selectedAnim = useRef(new Animated.Value(1)).current;



    return (


        <View style={styles.container}>


            <Image
                style={styles.logo}
                source={ skull }
            />

            <LinearGradient
                // Background Linear Gradient
                colors={['rgba(0,0,0,0.8)', 'transparent']}
                style={styles.background}
            />
            <LinearGradient
                // Button Linear Gradient
                colors={['#003399', '#006666']}
                style={styles.background}>
                <TextAnimationFadeIn value={"Send an SMS!"} delay={100} duration={1000} style={{
                    color: '#40e0d0', fontWeight: 'bold'
                }} />
            </LinearGradient>

            <View style={styles.inputContainer}>
                <Image
                    style={styles.inputIcon}
                    source={{ uri: 'https://img.icons8.com/color/70/000000/user.png' }}
                />


                <TextInput
                    style={styles.textInput}
                    placeholder="Number"
                    keyboardType='numeric'
                    underlineColorAndroid="transparent"
                    maxLength={20}  //setting limit of input
                    onChangeText={message => setNumber({ number })}
                />

            </View>

            <View style={styles.inputMessage}>
                <Image
                    style={styles.inputIcon}
                    source={{ uri: 'https://img.icons8.com/color/70/000000/list.png' }}
                />
                <TextInput
                    placeholder="Message"
                    underlineColorAndroid="transparent"
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={message => setMessage({ message })}
                />
            </View>
                <Animated.View style={[{ transform: [{ scale: selectedAnim }] }]}>
                    <TouchableOpacity
                        onPress={() => {
                            Animated.sequence([
                                Animated.timing(selectedAnim, {
                                    toValue: 1.3,
                                    duration: 300,
                                    useNativeDriver: true,
                                }),
                                Animated.timing(selectedAnim, {
                                    toValue: 1,
                                    duration: 300,
                                    useNativeDriver: true,
                                })
                            ]).start(() => setSelected(prev => !prev));
                    }}
                    style={styles.sendButton}
                    >
                        <Text style={styles.buttonText}>Send</Text>
                    </TouchableOpacity>
                </Animated.View>
            <StatusBar style="light" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#003366',
        width: '100%',
        height: 200,
    },
    logo: {
        width: 120,
        height: 120,
        justifyContent: 'center',
        marginBottom: 20,
    },
    inputMessage: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#f0ffff',
        borderRadius: 10,
        borderBottomWidth: 1,
        width: 250,
        height: 85,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#f0ffff',
        borderRadius: 30,
        borderBottomWidth: 1,
        width: 250,
        height: 45,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',

    },
    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
    },
    inputIcon: {
        width: 30,
        height: 30,
        marginLeft: 15,
        justifyContent: 'center',
    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 100,
        borderRadius: 30,
    },
    sendButton: {
        backgroundColor: '#26a7de',
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 100,
        borderRadius: 30,
    },
    buttonText: {
        color: 'white',
    },
})