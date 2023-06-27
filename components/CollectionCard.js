import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Touchable,
} from "react-native";
import AppText from "./AppText";
import AppColors from "./AppColors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function CollectionCard({
  title,
  image,
  onPress,
  onPressDelete,
  onPressUpdate,
}) {
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => {
    //Changing colour of collection title when pressed
    setIsPressed(true);
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.cardContainer}>
        {isFinite(image) ? (
          <Image source={image} style={styles.image} />
        ) : (
          <Image source={{ uri: image }} style={styles.image} />
        )}

        <View style={styles.deleteIconContainer}>
          <TouchableOpacity onPress={onPressDelete}>
            <MaterialCommunityIcons
              name="delete"
              size={30}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.editIconContainer}>
          <TouchableOpacity onPress={onPressUpdate}>
            <MaterialCommunityIcons
              name="square-edit-outline"
              size={30}
              style={styles.edit}
            />
          </TouchableOpacity>
        </View>

        <AppText
          style={[styles.cardTitle, isPressed && styles.cardTitlePressed]}
        >
          {title}
        </AppText>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    height: 100,
    width: 100,
    paddingHorizontal: 19,
    paddingBottom: 265,
  },

  cardTitle: {
    position: "absolute",
    paddingVertical: 160,
    paddingHorizontal: 25,
    fontSize: 40,
    fontWeight: 800,
    color: "white",
    textAlign: "left",
  },
  // cardTitlePressed: {
  //     color: AppColors.primaryColor, //Changing colour of card title when pressed
  //   },

  image: {
    height: 250,
    width: 350, //for collections
    resizeMode: "cover",
    opacity: 0.8,
    borderRadius: 8,
  },

  deleteIconContainer: {
    flex: 1,
    right: 30,
  },

  icon: {
    position: "absolute",
    color: "slategray",
  },
  edit: {
    position: "absolute",
    color: "slategray",
    right: 40,
  },
});

export default CollectionCard;
