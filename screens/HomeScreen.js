import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase";

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View>
      <SafeAreaView>
        <ImageBackground
          source={require("../assets/taxi.jpg")}
          style={styles.image}
        >
          <Text style={styles.text}>DISPECERAT MAROVI TAXI </Text>

          <TouchableOpacity
            onPress={() => navigation.navigate("MapScreen")}
            style={styles.button}
          >
            <Text style={styles.textButton}>Solicita un taxi</Text>
          </TouchableOpacity>
        </ImageBackground>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  image: {
    width: " 100%",
    height: "100%",
  },
  text: {
    borderRadius: 10,
    color: "white",
    fontSize: 20,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0",
  },
  textButton: {
    fontSize: 15,
    textAlign: "center",
    color: "white",
  
  },
  button: {
    bottom: "0%",
    backgroundColor: "purple",
    padding: 10,
    margin: 20,
    width: "50%",
    alignSelf: "center",
    borderRadius: 10,
  },
});
