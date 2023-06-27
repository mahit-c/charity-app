import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";

function AppScreen({ children }) {
  return <SafeAreaView style={styles.screenContainer}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
});

export default AppScreen;
