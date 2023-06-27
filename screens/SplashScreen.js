import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import AppColors from "../components/AppColors";

function SplashScreen({ navigation }) {
  setTimeout(() => {
    navigation.navigate("WelcomeScreen");
  }, 3000);

  return (
    <View style={styles.container}>
      <Image source={require("../assets/Give-hope-logo.png")} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.primaryColor,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SplashScreen;
