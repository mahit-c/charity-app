import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppColors from "./AppColors";
import AppText from "./AppText";

function ImageUpload({ style, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={{ flex: 1 }}>
      <View style={[styles.container]}>
        <View style={[styles.iconContainer, style]}>
          <MaterialCommunityIcons
            name="camera-enhance"
            size={50}
            style={styles.icon}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  iconContainer: {
    flex: 1,
    backgroundColor: AppColors.primaryColor,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 40,
    marginHorizontal: 130,
    borderRadius: 25,
  },

  icon: {
    color: "white",
  },
});

export default ImageUpload;
