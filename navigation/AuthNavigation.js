//For navigation:
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
//Screens:
import SplashScreen from "../screens/SplashScreen.js";
import WelcomeScreen from "../screens/WelcomeScreen.js";
import LoginScreen from "../screens/LoginScreen.js";
import RegisterScreen from "../screens/RegisterScreen.js";
import HomeScreen from "../screens/HomeScreen.js";
import TabNavigation from "./TabNavigation.js";
import { TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const screenStack = createStackNavigator();

export default function AuthNavigation() {
  return (
    <screenStack.Navigator>
      <screenStack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <screenStack.Screen
        name="WelcomeScreen"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <screenStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          headerLeft: () => <BackButton />,
          headerTitleStyle: styles.headerTitle, // Hide the screen title
        }}
      />
      <screenStack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          headerLeft: () => <BackButton />,
          headerTitleStyle: styles.headerTitle, // Hide the screen title
        }}
      />
      <screenStack.Screen
        name="Main"
        component={TabNavigation}
        options={{ headerShown: false }}
      />
    </screenStack.Navigator>
  );
}

function BackButton() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <MaterialCommunityIcons name="arrow-left" size={24} color="black" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    display: "none", // Hide the header title
  },
});
