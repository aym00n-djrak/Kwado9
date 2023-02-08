import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
    ActivityIndicator,
    ScrollView,
    StatusBar,
} from "react-native";
import React from "react";
import { Configuration, OpenAIApi } from "openai";

export default function IAtext() {
  const [prompt, onChangePrompt] = React.useState("Your AI assitant");
  const [result, setResult] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [text, setText] = React.useState("Your AI assistant");

  const configuration = new Configuration({
    apiKey: "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",
  });

  const openai = new OpenAIApi(configuration);

  const generateText = async () => {
    try {
      onChangePrompt(`${prompt}`);
      setLoading(true);
      const res = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0,
        max_tokens: 500,
      });
      setText(res.data.choices[0].text);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };


  console.log(text);
  console.log(prompt);
  console.log(result);

  return (
      <View style={styles.container}>
        <Text style={styles.titleText}>React Native DaVinci-003</Text>
        <View style={styles.TextInputcontainer}>
          <TextInput
            style={styles.textInput}
            onChangeText={onChangePrompt}
            value={prompt}
            editable
            multiline
            numberOfLines={4}
          />
        </View>
        <TouchableOpacity style={styles.generateButton} onPress={generateText}>
          <Text style={styles.generateButtonText}>Generate</Text>
        </TouchableOpacity>
        {loading ? (
          <>
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#0000ff" />
              <Text>Generating...</Text>
            </View>
          </>
        ) : (
          <></>
        )}

                  <ScrollView>
              <Text style={styles.generatedText}>{ text}</Text>
                  </ScrollView>
      </View>



  );
}

const styles = StyleSheet.create({

  container: {
    backgroundColor: "#fff",
    alignItems: "center",
        justifyContent: "center",
    flex: 1
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
  },
  TextInputcontainer: {
    backgroundColor: "#f3f3f3",
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  textInput: {
    height: 100,
      width: 300,
  },
  generateButton: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  generateButtonText: {
    fontSize: 20,
  },
  loadingContainer: {
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  generatedTextContainer: {
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  generatedText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
    }
});

