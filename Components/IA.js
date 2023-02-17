import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
  Button,
  Alert,
  ScrollView,
} from "react-native";
import React from "react";
import { Configuration, OpenAIApi } from "openai";
import dalle2 from "../assets/dalle2.png";
import meshgradient from "../assets/meshgradient.png";
import * as MediaLibrary from "expo-media-library";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const key = "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";

export default function IA({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AI" component={AI} />
      <Stack.Screen name="DALLE" component={DALLE} />
      <Stack.Screen name="DAVINCI" component={DAVINCI} />
    </Stack.Navigator>
  );
}

export function AI ({navigation}){
  return (
    <View style={styles.container}>
      <Button  title="DALLE" onPress={() => navigation.navigate("DALLE")}  />
      <Button  title="DAVINCI" onPress={() => navigation.navigate("DAVINCI")} />
    </View> 
  )
}

export function DALLE() {
  const [prompt, onChangePrompt] = React.useState("Generate an image...");
  const [result, setResult] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [imagePlaceholder, setimagePlaceholder] = React.useState(
    "https://furntech.org.za/wp-content/uploads/2017/05/placeholder-image-300x225.png"
  );



  const configuration = new Configuration({
    apiKey: key,
  });

  const openai = new OpenAIApi(configuration);

  const generateImage = async () => {
    try {
      onChangePrompt(`Search ${prompt}..`);
      setLoading(true);
      const res = await openai.createImage({
        prompt: prompt,
        n: 1,
        size: "256x256",
      });
      setResult(res.data.data[0].url);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  async function saveImage(result) {
    //Medialibrary permission
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status === "granted") {
      Alert("Permission granted!");
    }
  }

  return (
    <SafeAreaView>
      <Image style={styles1.background} source={meshgradient} />
      <Image style={styles1.dalle} source={dalle2} />
      <View style={styles1.container}>
        <Text style={styles1.titleText}>React Native Dalle-E</Text>
        <View style={styles1.TextInputcontainer}>
          <TextInput
            style={styles1.textInput}
            onChangeText={onChangePrompt}
            value={prompt}
            editable
            multiline
            numberOfLines={4}
          />
        </View>
        <TouchableOpacity
          style={styles1.generateButton}
          onPress={generateImage}
        >
          <Text style={styles1.generateButtonText}>Generate</Text>
        </TouchableOpacity>
        {loading ? (
          <>
            <View style={styles1.loadingContainer}>
              <ActivityIndicator size="large" color="#0000ff" />
              <Text>Generating...</Text>
            </View>
          </>
        ) : (
          <></>
        )}

        <View style={styles1.generatedImageContainer}>
          {result.length > 0 ? (
            <Image
              style={styles1.generatedImage}
              source={{
                uri: result,
              }}
            />
          ) : (
            <>
              <Image
                style={styles1.generatedImage}
                source={{
                  uri: imagePlaceholder,
                }}
              />
            </>
          )}
        </View>

        <TouchableOpacity
          style={styles1.generateButton}
          onPress={() => saveImage(result)}
        >
          <Text style={styles1.generateButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export function DAVINCI() {
  const [prompt, onChangePrompt] = React.useState(
    "Write something, like 'Train, food, yesterday'... "
  );
  const [result, setResult] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [text, setText] = React.useState("Your AI assistant");

  const configuration = new Configuration({
    apiKey: key,
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
        source={{
          uri: "https://products.ls.graphics/mesh-gradients/images/43.-Harvest-Gold.jpg",
        }}
        style={styles.background}
      />
      <Image
        source={{
          uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/OpenAI_Logo.svg/1280px-OpenAI_Logo.svg.png",
        }}
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
        <Text style={styles.generatedText}>{text}</Text>
      </ScrollView>
    </View>
  );
}

const styles1 = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  loadingContainer: {
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },

  TextInputcontainer: {
    height: 100,
    backgroundColor: "#c7c7c7",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 10,
    marginVertical: 10,
  },
  textInput: {
    width: "100%",
    height: "100%",
    padding: 10,
  },
  generateButton: {
    height: 50,
    width: "100%",
    backgroundColor: "black",
    borderRadius: 10,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  generateButtonText: {
    color: "white",
  },
  generatedImageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  generatedImage: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
  dalle: {
    width: 250,
    height: 50,
    marginTop: 10,
    marginLeft: 45,
  },
  background: {
    width: "150%",
    height: "150%",
    position: "absolute",
  },
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
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
    borderColor: "#5f9ea0",
  },
  textInput: {
    height: 100,
    width: 300,
    color: "#778899",
    fontSize: 15,
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
    textShadowColor: "#black",
    textShadowOffset: { width: -3, height: 3 },
    textShadowRadius: 10,
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
    color: "#191970",
  },
  background: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  logo: {
    width: 320,
    height: 240,
    flex: 0.45,
    resizeMode: "contain",
  },
});
