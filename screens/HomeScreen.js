import React, { useState, useEffect } from "react";
import AppScreen from "../components/AppScreen";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import AppColors from "../components/AppColors";
import AppText from "../components/AppText";
import CollectionCard from "../components/CollectionCard";
import { useNavigation } from "@react-navigation/native";
import DataManager from "../config/DataManager";

function HomeScreen({ navigation }) {
  //Checking for latest collection items upon rendering screen:
  const [enableCollection, setCollection] = useState([]);
  useEffect(() => {
    //Receiving users collections from storage
    const dataManager = DataManager.getInstance();
    const newCollections = dataManager.getCollection();
    setCollection(newCollections);
    console.log(enableCollection);
  }, []);

  //For gettin current users name:
  const current = DataManager.getInstance();
  const currentUser = current.currentUser;

  //Attempting screen refresh:
  // const [isRefreshing, setIsRefreshing] = useState(false);
  // const onRefresh = () => {
  //   //set isRefreshing to true
  //   setIsRefreshing(true);
  //   const dataManager = DataManager.getInstance();
  //   const newCollections = dataManager.getCollection();
  //   setCollection(newCollections);
  //   console.log(enableCollection);
  // };

  return (
    <AppScreen style={styles.container}>
      {/*Top heading section: */}
      <View style={styles.heading}>
        <AppText style={styles.mainHeader}> Hi {currentUser.name}! </AppText>
        <AppText style={styles.secondaryText}>
          {" "}
          Start giving hope, changing lives{" "}
        </AppText>
      </View>

      {/*Collection cards section: */}

      <FlatList
        data={enableCollection}
        keyExtractor={(collection) => collection.id.toString()}
        renderItem={({ item }) => (
          <CollectionCard
            title={item.title}
            image={item.image}
            onPress={() => {
              navigation.navigate("Categories", { collectionID: item.id });
            }}
            onPressDelete={() => {
              current.deleteCollection(item.id);
              alert("Collection has been deleted!"); //Deleting collection (will need to refresh flatlist to view updated one)
            }}
            onPressUpdate={() => {
              navigation.navigate("Create Collection", {
                collectionInfo: item,
              });
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
    fontSize: 30,
    fontWeight: "bold",
  },

  secondaryText: {
    //Styling for text below main header
    paddingHorizontal: 3,
    fontSize: 15,
    fontWeight: "200",
  },
});

export default HomeScreen;
