import React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Messagerie from './Messagerie';
import { Image } from 'react-native';
import CameraPhone from './CameraPhone';

const Stack = createStackNavigator();


function HomeScreen({ navigation }) {
  return (
    <View>
      <Text style={{ fontSize: 30 }}>Kwado9</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
      <Button style={{ marginTop: 20 }}
        title="Go to Messagerie"
        onPress={() => navigation.navigate('MessagerieScreen')}
      />
      <Button style={{ marginTop: 20 }}
        title="Go to Camera"
        onPress={() => navigation.navigate('Camera')}
      />
    </View>
  );
}

function DetailsScreen({ navigation }) {
  return (
    <View>
      <Text>Details Screen</Text>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Kwado9')}
      />
    </View>
  );
}

function MessagerieScreen({ navigation }) {
  return (
    <View>
      <Text>Messagerie Screen</Text>
      <Messagerie />
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Kwado9')}
      />
    </View>
  );
}

function CameraScreen({ navigation }) {
  return (
      <CameraPhone />
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Kwado9" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="MessagerieScreen" component={MessagerieScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
