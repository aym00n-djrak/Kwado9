import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
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
      onChangePrompt(`Search ${prompt}..`);
      setLoading(true);
      const res = await openai.complete({
        prompt: prompt,
        maxTokens: 5,
        temperature: 0.9,
        topP: 1,
        presencePenalty: 0,
        frequencyPenalty: 0,
        bestOf: 1,
        n: 1,
        stream: false,
        stop: [
          "\
",
        ],
      });
      setText(res.data.choices[0].text);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView>
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

        <View style={styles.generatedTextContainer}>
          <Text style={styles.generatedText}>{text}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

});

