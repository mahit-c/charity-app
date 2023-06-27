import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import CreateCollectionScreen from "../screens/CreateCollectionScreen";
import HomeNavigation from "./HomeNavigation";
import CreateCharityScreen from "../screens/CreateCharityScreen";
import AppColors from "../components/AppColors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AccountsScreen from "../screens/AccountsScreen";

const screenTab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <screenTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: AppColors.primaryColor,
      }}
    >
      <screenTab.Screen
        name="Home"
        component={HomeNavigation}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" size={30} color={color} />
          ),
        }}
      />

      <screenTab.Screen
        name="Create Collection"
        component={CreateCollectionScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="folder-plus"
              size={30}
              color={color}
            />
          ),
        }}
      />
      <screenTab.Screen
        name="Create Charity"
        component={CreateCharityScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="plus-box" size={30} color={color} />
          ),
        }}
      />
      <screenTab.Screen
        name="Account"
        component={AccountsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" size={30} color={color} />
          ),
        }}
      />
    </screenTab.Navigator>
  );
}
