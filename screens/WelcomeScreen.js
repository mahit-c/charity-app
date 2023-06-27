import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import AppColors from "../components/AppColors";
import { useNavigation } from "@react-navigation/native";

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../assets/Give-hope-logo.png")}
      />

      {/* <AppText> This text is for testing purposes.</AppText> */}
      <View style={styles.buttonContainer}>
        <AppButton
          title="Login"
          color={AppColors.secondaryColor}
          onPress={() => navigation.navigate("LoginScreen")}
        >
          {" "}
        </AppButton>
        <AppButton
          title="Signup"
          color={AppColors.tertiaryColor}
          onPress={() => navigation.navigate("RegisterScreen")}
        >
          {" "}
        </AppButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.primaryColor,
    alignItems: "center",
    justifyContent: "flex-start", // This aligns content to the top
    borderRadius: 4,
  },

  logo: {
    height: "45%", // Sets the height of the image to one-third of the screen height
    resizeMode: "contain", // Ensures that the image doesn't get stretched or distorted
    backgroundColor: "#ffffff",
  },

  buttonContainer: {
    flex: 2,
    flexDirection: "column",
    marginTop: 170,
    marginBottom: 100,
    justifyContent: "space-evenly",
  },
});
