import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import AppText from "./AppText";
import AppColors from "./AppColors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function CharityCard({ name, date, amount, image, onPressDelete }) {
  return (
    <View style={styles.cardContainer}>
      {isFinite(image) ? (
        <Image source={image} style={styles.image} />
      ) : (
        <Image source={{ uri: image }} style={styles.image} />
      )}

      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={onPressDelete}>
          <MaterialCommunityIcons name="delete" size={30} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <View style={styles.textContainer}>
        <AppText style={styles.charityName}>{name}</AppText>
        <AppText style={styles.donationDate}>{date}</AppText>
        <AppText style={styles.donationAmount}>${amount}</AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    backgroundColor: AppColors.tertiaryColor,
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 15,
    paddingBottom: 5,
  },

  image: {
    height: 200,
    width: 350,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  textContainer: {
    flexDirection: "column",
    marginLeft: 5,
  },

  charityName: {
    fontWeight: "700",
    fontSize: 24,
  },

  donationDate: {
    fontWeight: "200",
    fontSize: 21,
  },

  donationAmount: {
    fontWeight: "300",
    color: AppColors.primaryColor,
    fontSize: 20,
  },

  iconContainer: {
    flex: 1,
    left: 315,
    bottom: 195,
  },

  icon: {
    position: "absolute",
    color: "slategray",
  },
});

export default CharityCard;
