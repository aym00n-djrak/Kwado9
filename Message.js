import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Button } from 'react-native';
import { Alert } from 'react-native';
import Messagerie from './Messagerie';

export default function Message() {
    return (
        <View style={styles.container}>
            <Text>Type a Message</Text>
            <Messagerie />
            <StatusBar style="auto" />
            <Button title="Vasy appuie" onPress={() => Alert.alert('Tas appuyé!')} style={styles.button} />
        </View>
    );
}