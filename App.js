import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Button } from 'react-native';
import { Alert } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Rémy App!</Text>
      <StatusBar style="auto" />
      <Button title="Click me" onPress={() => Alert.alert('Button pressed!')} style={styles.button} />
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
});
