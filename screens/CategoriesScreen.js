import React from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import AppText from "../components/AppText";
import AppScreen from "../components/AppScreen";
import CategoryCard from "../components/CategoryCard";
import DataManager from "../config/DataManager";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

function CategoriesScreen({ navigation }) {
  //Getting chosen collections ID
  const route = useRoute();
  const collectionID = route.params?.collectionID; //Displays the categories for a collection
  console.log("Collection ID:", collectionID);
  //fetching categories based on collectionID
  const getUserCategories = () => {
    const userCollections = dataManager.getCollection();
    const selectedCollection = userCollections.find(
      (collection) => collection.id === collectionID
    );
    if (selectedCollection) {
      return selectedCollection.categories;
    }
    return [];
  };
  const dataManager = DataManager.getInstance();
  const categories = getUserCategories();

  //const categories = dataManager.defaultCategories
  // console.log(categories)

  const numColumns = 2;

  return (
    <AppScreen>
      {/* Top header section: */}
      <View style={styles.heading}>
        <AppText style={styles.mainHeader}> Categories </AppText>

        <AppText style={styles.secondaryText}>
          Select a relevant category
        </AppText>
      </View>

      {/* Category cards section: */}

      <FlatList
        data={categories}
        keyExtractor={(categories) => categories.id.toString()}
        renderItem={({ item }) => (
          <CategoryCard
            title={item.title}
            backgroundColor={item.color}
            image={item.image}
            onPress={
              () => {
                navigation.navigate("SpecificCategory", {
                  categoryName: item.title,
                  collectionID: collectionID,
                  categoryID: item.id,
                });
              } //Passing the name and ID of the category clicked on and collection ID
            }
          />
        )}
        numColumns={numColumns} //Making a gridview
      />
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
  },

  secondaryText: {
    //Styling for text below main header
    paddingHorizontal: 9,
    fontSize: 15,
    fontWeight: "200",
  },
});

export default CategoriesScreen;
