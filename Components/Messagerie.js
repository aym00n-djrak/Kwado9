import React, { useState } from 'react';
import { Text, View, TextInput, Button } from 'react-native';

const Message = ({ message }) => (
  <View style={{ backgroundColor: 'red', padding: 10, margin: 10, borderRadius: 10, width: 200, alignSelf: 'flex-end' }}>
    <Text>{message}</Text>
  </View>
);

const MessageList = ({ messages }) => (
  <View>
    {messages.map((message, index) => (
      <Message key={index} message={message} />
    ))}
  </View>
);

const MessageInput = ({ onSend }) => {
  const [text, setText] = useState('');

  return (
    <View>
      <TextInput
        placeholder="Enter a message...!"
        onChangeText={text => setText(text)}
        value={text}
        style={{color : 'black', backgroundColor: 'white', padding: 10, margin: 10, borderRadius: 10, width: 200, alignSelf: 'flex-start', alignSelf: 'center'}}
      />
      <Button title="Send" onPress={() => onSend(text)} />
    </View>
  );
};

export default function Messagerie() {
  const [messages, setMessages] = useState([]);

  const handleSend = text => {
    setMessages([...messages, text]);
  };

  return (
    <View>
      <MessageList messages={messages} />
      <MessageInput onSend={handleSend} />
    </View>
  );
}
