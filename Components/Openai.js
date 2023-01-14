import React, { useState } from "react";
import { TextInput, Button, View, Text, Alert } from "react-native";

export default function OpenAI() {
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ animal: animalInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      setResult(data.result);
      setAnimalInput("");
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }
  return (
    <View>
        <Text style={{ fontSize: 30 }}>OpenAI</Text>
        <Text>Fuck ! Why no internet !</Text>
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        onChange={(e) => setAnimalInput(e.target.value)}
        value={animalInput}
      />
      <Button title="Generate Text" onPress={onSubmit} />
      <Text>{result}</Text>
    </View>
  );
}
