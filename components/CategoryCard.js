import React from "react";
import { TouchableOpacity, View, StyleSheet, Text, Image } from "react-native";
import AppText from "./AppText";

function CategoryCard({ title, onPress, backgroundColor, image }) {
  return (
    <TouchableOpacity onPress={onPress} style={{ flex: 1 }}>
      <View
        style={[styles.categoryContainer, { backgroundColor: backgroundColor }]}
      >
        <View style={styles.imageContainer}>
          <Image source={image} style={styles.imageIcon} />
        </View>
        <AppText style={styles.text}>{title}</AppText>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  categoryContainer: {
    backgroundColor: "red",
    // marginTop: 5,
    // marginBottom: 450,
    // marginLeft: 12,
    // marginRight: 200,
    marginBottom: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    color: "white",
    fontWeight: 600,
    paddingVertical: 20,
  },

  imageContainer: {
    marginTop: 50,
  },
  imageIcon: {
    height: 50,
    width: 50,
  },
});

export default CategoryCard;
