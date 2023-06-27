import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import AppText from "./AppText";
import AppColors from "./AppColors";

function AppButton({ title, color, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.button, { backgroundColor: color }]}>
        <AppText style={styles.buttonText}> {title} </AppText>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  button: {
    width: "100%",
    borderRadius: 26,
    paddingVertical: 20,
    paddingHorizontal: 110,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: AppColors.buttonText,
  },
});
export default AppButton;
