import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppColors from "./AppColors";

function TextInputField({ iconSelect, ...textDisplay }) {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name={iconSelect} size={30} style={styles.icon} />

      <TextInput style={styles.textInput} {...textDisplay} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    padding: 4,
    borderBottomWidth: 2, //Creating a underline effect
    borderBottomColor: "#000",
    paddingBottom: 2, //Creating space between the line and icon+text
  },

  textInput: {
    fontSize: 15,
    paddingLeft: 5,
    width: "100%",
  },

  icon: {
    color: AppColors.quaternaryColor,
    padding: 5,
  },
});

export default TextInputField;
