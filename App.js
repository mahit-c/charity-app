import React from "react";
//For navigation:
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

//Components:
import AuthNavigation from "./navigation/AuthNavigation.js";

const screenStack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <AuthNavigation />
    </NavigationContainer>
  );
}
