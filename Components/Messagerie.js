import React, { useState } from 'react';
import { Text, View, TextInput, Button } from 'react-native';

const Message = ({ message }) => (
  <View>
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
        placeholder="Enter a message..."
        onChangeText={text => setText(text)}
        value={text}
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
