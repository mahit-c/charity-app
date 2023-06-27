import React from "react";
import { StyleSheet, Text } from "react-native";

function AppText({ children, color, style, onPress }) {
  return (
    <Text style={[styles.textStyle, style]} onPress={onPress}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 20,
  },
});

export default AppText;
