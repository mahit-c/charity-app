import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import AppScreen from "../components/AppScreen";
import { useNavigation } from "@react-navigation/native";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import AppColors from "../components/AppColors";
import DataManager from "../config/DataManager";

function AccountsScreen({ navigation }) {
  //Data manager instance to obtain user information:
  const dataManager = DataManager.getInstance();
  const user = dataManager.currentUser;

  return (
    <AppScreen>
      {/*Top heading section: */}
      <View style={styles.heading}>
        <AppText style={styles.mainHeader}>Account</AppText>
        <AppText style={styles.secondaryText}>
          {" "}
          View your personal information here{" "}
        </AppText>
      </View>

      <View style={styles.mainContainer}>
        {/*Default profile icon section: */}
        <View style={styles.profileIconContainer}>
          <Image source={require("../assets/user.png")} style={styles.icon} />
        </View>

        <View style={styles.profileInfoContainer}>
          <AppText style={styles.username}>{user.name}</AppText>
          <AppText style={styles.email}>{user.email}</AppText>
        </View>
      </View>

      <View style={styles.logouButton}>
        <AppButton
          title="Logout"
          color={AppColors.quaternaryColor}
          onPress={() =>
            navigation.reset({
              //Resseting stack after logging out to Welcome screen
              index: 0,
              routes: [{ name: "WelcomeScreen" }],
            })
          }
        />
      </View>
    </AppScreen>
  );
}
const styles = StyleSheet.create({
  heading: {
    paddingVertical: 50,
    paddingHorizontal: 10,
  },

  mainHeader: {
    //Styling for main header
    fontSize: 30,
    fontWeight: "bold",
    paddingHorizontal: 7,
  },

  secondaryText: {
    //Styling for text below main header
    paddingHorizontal: 3,
    fontSize: 15,
    fontWeight: "200",
  },
  mainContainer: {
    flex: 1,
    flexDirection: "row",
  },
  profileIconContainer: {
    flex: 0.3,
    flexDirection: "column",
    paddingHorizontal: 15,
    paddingBottom: 4,
    marginRight: 45,
    // backgroundColor: 'red',
  },

  icon: {
    height: 125,
    width: 125,
  },
  profileInfoContainer: {
    flex: 1,
    marginTop: 25,
  },

  username: {
    fontWeight: "bold",
    fontSize: 25,
  },

  email: {
    fontWeight: "200",
    fontSize: 18,
    paddingLeft: 1,
  },

  logouButton: {
    flex: 1,
    paddingHorizontal: 35,
  },
});

export default AccountsScreen;
