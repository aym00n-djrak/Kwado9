import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Menu from './Components/Menu';
import 'react-native-url-polyfill/auto';

export default function App() {
  return (
    <Menu />
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
