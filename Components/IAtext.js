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
// inspiré de : https://products.ls.graphics/mesh-gradients/




export default function IAtext() {
  const [prompt, onChangePrompt] = React.useState("Write something, like 'Train, food, yesterday'... ");
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
          <Image
              source={{ uri: 'https://products.ls.graphics/mesh-gradients/images/43.-Harvest-Gold.jpg' }}
              style={styles.background}
          />
          <Image
              source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/OpenAI_Logo.svg/1280px-OpenAI_Logo.svg.png' }}
              style={styles.logo}

          />
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
                      <ActivityIndicator size={70} color="#20b2aa" />
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
      backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
      margin: 10,
      borderWidth: 1,
      borderColor: "#5f9ea0"
  },
  textInput: {
    height: 100,
      width: 300,
      color: "#778899",
      fontSize: 15
  },
  generateButton: {
    alignItems: "center",
      backgroundColor: "#2f4f4f",
    padding: 10,
    margin: 10,
      borderRadius: 100,
  },
  generateButtonText: {
      fontSize: 20,
      color: "#e0ffff",
      fontWeight: "bold",
      textShadowColor: "#black", textShadowOffset: { width: -3, height: 3 },
      textShadowRadius: 10
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
      color:"#191970"
    },
    background: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    logo: {
        width: 320,
        height: 240,
        flex: 0.45,
        resizeMode: 'contain'
    },
});

