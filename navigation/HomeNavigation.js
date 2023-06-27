//For navigation:
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import CategoriesScreen from "../screens/CategoriesScreen";
import CreateCollectionScreen from "../screens/CreateCollectionScreen";
import SpecificCategoryScreen from "../screens/SpecificCategoryScreen";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const homeStack = createStackNavigator();

export default function HomeNavigation() {
  return (
    <homeStack.Navigator>
      <homeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <homeStack.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          headerLeft: () => <BackButton />,
          headerTitleStyle: styles.headerTitle, // Hide the screen title
        }}
      />
      <homeStack.Screen
        name="CollectionScreen"
        component={CreateCollectionScreen}
        options={{
          headerLeft: () => <BackButton />,
          headerTitleStyle: styles.headerTitle, // Hide the screen title
        }}
      />
      <homeStack.Screen
        name="SpecificCategory"
        component={SpecificCategoryScreen}
        options={{
          headerLeft: () => <BackButton />,
          headerTitleStyle: styles.headerTitle, // Hide the screen title
        }}
      />
    </homeStack.Navigator>
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
