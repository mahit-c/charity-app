import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import AppText from "../components/AppText";
import AppScreen from "../components/AppScreen";
import { useNavigation, useRoute } from "@react-navigation/native";
import DataManager from "../config/DataManager";
import CharityCard from "../components/CharityCard";

function SpecificCategoryScreen({ navigation }) {
  //Obtaining data from categories screen:
  const route = useRoute();
  const categoryName = route.params?.categoryName; //Receiving title of specific category clicked on
  const collectionID = route.params?.collectionID;
  const categoryID = route.params?.categoryID;
  console.log(
    "Category name: " + categoryName,
    "Collection ID: " + collectionID,
    "Category ID: " + categoryID
  );

  //Data manager:
  const dataManager = DataManager.getInstance();
  const currentCharities =
    dataManager.currentUser.collections[collectionID - 1].categories[
      categoryID - 1
    ].charities; //Accessing the specific collections, categories, charity
  console.log(currentCharities);

  //Sample charities:
  const sampleCharities = [
    {
      id: 1,
      name: "Charity 1",
      date: "2023-05-05",
      amount: "$100",
    },
    {
      id: 2,
      name: "Charity 1",
      date: "2023-05-05",
      amount: "$100",
    },
  ];

  return (
    <AppScreen>
      {/* Top header section: */}
      <View style={styles.heading}>
        <AppText style={styles.mainHeader}> {categoryName} </AppText>
      </View>

      {/* Charity section: */}
      <FlatList
        data={currentCharities}
        keyExtractor={(charity) => charity.id.toString()}
        renderItem={({ item }) => (
          <CharityCard
            name={item.name}
            date={item.date}
            amount={item.amount}
            image={item.image}
            onPressDelete={() => {
              dataManager.deleteCharity(collectionID, categoryID, item.id); //Deleting charity (will need to refresh flatlist to view updated one)
              alert("Charity has been deleted!");
            }}
          />
        )}
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
    fontSize: 35,
    fontWeight: "bold",
  },
});

export default SpecificCategoryScreen;
