import React from "react";
import { View, StyleSheet } from "react-native";
import AppText from "./AppText";

function ErrorAlert({ children, style }) {
  return <AppText style={[styles.errorMessage, style]}>{children}</AppText>;
}

const styles = StyleSheet.create({
  errorMessage: {
    fontSize: 13,
    color: "red",
    paddingBottom: 20,
  },
});
export default ErrorAlert;
