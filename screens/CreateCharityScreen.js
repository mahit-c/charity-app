import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import AppScreen from "../components/AppScreen";
import AppText from "../components/AppText";
import { Formik } from "formik"; //Importing formik for form handling
import * as yup from "yup"; //Importing yup for form validation
import TextInputField from "../components/TextInputField";
import DataManager from "../config/DataManager";
import * as ImagePicker from "expo-image-picker";
import DropDownPicker from "react-native-dropdown-picker";
import AppColors from "../components/AppColors";
import AppButton from "../components/AppButton";
import ImageUpload from "../components/ImageUpload";
import ErrorAlert from "../components/ErrorAlert";
import { useNavigation } from "@react-navigation/native";

function CreateCharityScreen({ navigation }) {
  //Retreiving user collections:
  const dataManager = DataManager.getInstance();
  const [collections, setCollections] = useState([]);
  const categories = dataManager.defaultCategories;
  //console.log(categories)

  //For collection drop down:
  const [open, setOpen] = useState(false);
  const [collectionValue, setCollectionValue] = useState(null);
  const [items, setItems] = useState([]);
  useEffect(() => {
    // Update the collections and items state when the screen is loaded
    const userCollections = dataManager.getCollection();
    setCollections(userCollections);
    setItems(
      userCollections.map((collection) => ({
        label: collection.title,
        value: collection.id,
      }))
    );
  }, []);

  // Refreshing the state of the collections and items commponent when the screen is focused
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      const userCollections = dataManager.getCollection();
      setCollections(userCollections);
      setItems(
        userCollections.map((collection) => ({
          label: collection.title,
          value: collection.id,
        }))
      );
    });

    return unsubscribe;
  }, [navigation]);

  //For categories drop down:
  const [openMenu, setOpenMenu] = useState(false);
  const [categoryValue, setCategoryValue] = useState(null);
  const [item, setItem] = useState(
    //Mapping user collections to available options
    categories.map((category) => ({
      label: category.title,
      value: category.id,
    }))
  );

  //For image upload:
  const [image, setImage] = useState(null);
  const [imageError, setImageError] = useState(null);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      console.log(image);
      setImageError(null);
    } else {
      setImageError("Please select an image");
    }
  };

  //Field validation:
  const [categoryError, setCategoryError] = useState(null);
  const [collectionError, setCollectionError] = useState(null);

  const validateSchema = yup.object().shape(
    //Adding validation rules using yup
    {
      name: yup.string().required().min(3).max(20).label("Charity Name"),
      amount: yup //Donation amount validation
        .number()
        .typeError("Donation amount must be a number")
        .positive("Donation amount must be positive")
        .required("Donation amount is required")
        .min(1, "Donation amount must be at least 1 digit")
        .max(999999, "Donation amount must be at most 6 digits"),

      date: yup
        .string()
        .matches(
          /^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
          "Date must be in the format YYYY-MM-DD"
        )
        .required("Date is required"),
    }
  );
  return (
    <AppScreen>
      {/* Top header section: */}
      <View style={styles.heading}>
        <AppText style={styles.mainHeader}> Add a charity </AppText>
        <AppText style={styles.secondaryText}>
          Track your charitable impact
        </AppText>
      </View>

      {/* Form section*/}
      <Formik //Using Formik for form handling:
        initialValues={{ name: "", amount: "", date: "" }}
        onSubmit={(values, { resetForm }) => {
          let formCheck = false;

          if (image === null) {
            setImageError("Please select an image");
            formCheck = true;
          } else {
            setImageError(null);
          }

          if (categoryValue === null) {
            setCategoryError("Please choose a category");
            formCheck = true;
          } else {
            setCategoryError(null);
          }

          if (collectionValue === null) {
            setCollectionError("Please choose a collection");
            formCheck = true;
          } else {
            setCollectionError(null);
          }

          if (!formCheck) {
            console.log(values);
            console.log(collectionValue, categoryValue);
            dataManager.addCharity(
              values.name,
              values.amount,
              values.date,
              image,
              collectionValue,
              categoryValue
            );
            setCategoryValue(null);
            setCollectionValue(null);
            setImage(null);
            resetForm();
            navigation.navigate("HomeScreen");
          }
        }} /* Handles what happens when handleSubmit is executed*/
        validationSchema={validateSchema}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          errors,
          setFieldTouched,
          touched,
        }) => (
          <>
            <View style={styles.collectionForm}>
              <TextInputField
                iconSelect={"rename-box"}
                placeholder={"Charity name"}
                textContentType={"organizationName"}
                value={values.name}
                onBlur={() => setFieldTouched("name")}
                onChangeText={handleChange("name")}
              />
              {touched.name && errors.name && (
                <ErrorAlert style={{ paddingLeft: 20, paddingTop: 3 }}>
                  {" "}
                  {errors.name}{" "}
                </ErrorAlert>
              )}

              <TextInputField
                iconSelect={"currency-usd"}
                placeholder={"Donation amount"}
                value={values.amount}
                onBlur={() => setFieldTouched("amount")}
                onChangeText={handleChange("amount")}
              />
              {touched.amount && errors.amount && (
                <ErrorAlert style={{ paddingLeft: 20, paddingTop: 3 }}>
                  {" "}
                  {errors.amount}{" "}
                </ErrorAlert>
              )}

              <TextInputField
                iconSelect={"calendar-range"}
                placeholder={"Donation date"}
                value={values.date}
                onBlur={() => setFieldTouched("date")}
                onChangeText={handleChange("date")}
              />
              {touched.date && errors.date && (
                <ErrorAlert style={{ paddingLeft: 20, paddingTop: 3 }}>
                  {" "}
                  {errors.date}{" "}
                </ErrorAlert>
              )}
            </View>
            <View style={styles.dropDown}>
              <DropDownPicker
                placeholder="Choose Collection"
                open={open}
                value={collectionValue}
                items={items}
                setOpen={setOpen}
                setValue={setCollectionValue}
                dropDownDirection="TOP"
                // setItems={setItems}
                style={{ marginBottom: 10 }}
                maxHeight={100}
                // style={}
                scrollViewProps={{
                  maxHeight: 100, //Making list scrollable at max height
                }}
                placeholderStyle={{
                  color: AppColors.quaternaryColor,
                  fontWeight: "light",
                }}
                //onSelectItem={setCollectionError(null)}
              />
              <ErrorAlert> {collectionError} </ErrorAlert>

              <DropDownPicker
                placeholder="Choose Category"
                open={openMenu}
                value={categoryValue}
                items={item}
                setOpen={setOpenMenu}
                setValue={setCategoryValue}
                setItems={setItem}
                maxHeight={100}
                dropDownDirection="TOP"
                style={{ marginBottom: 10 }}
                scrollViewProps={{
                  maxHeight: 100, //Making list scrollable at max height
                }}
                placeholderStyle={{
                  color: AppColors.quaternaryColor,
                  fontWeight: "light",
                }}
                // onChangeValue={setCategoryError(null)}
              />
            </View>

            <ErrorAlert style={{ paddingLeft: 30 }}>
              {" "}
              {categoryError}{" "}
            </ErrorAlert>

            <View style={styles.imageUpload}>
              <ImageUpload
                style={{ marginVertical: 10 }}
                onPress={pickImage}
                // value ={values.image}
              />
            </View>
            <ErrorAlert style={{ paddingLeft: 60, marginBottom: 10 }}>
              {" "}
              {imageError}{" "}
            </ErrorAlert>

            <View style={styles.addCollectionButton}>
              <AppButton
                title="Add"
                color={AppColors.secondaryColor}
                onPress={handleSubmit}
              >
                {" "}
              </AppButton>
            </View>
          </>
        )}
      </Formik>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  heading: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },

  mainHeader: {
    //Styling for main header
    fontSize: 30,
    fontWeight: "bold",
  },

  secondaryText: {
    //Styling for text below main header
    paddingHorizontal: 7,
    fontSize: 15,
    fontWeight: "200",
  },
  collectionForm: {
    flex: 1.5,
    justifyContent: "space-between",
    marginTop: 3,
    paddingHorizontal: 30,
    paddingBottom: 60,
    marginBottom: 20,
  },

  dropDown: {
    flex: 1,
    justifyContent: "space-evenly",
    paddingHorizontal: 30,
    //  paddingBottom: 10,
  },

  addCollectionButton: {
    // paddingBottom : 30,
    paddingHorizontal: 30,
    marginBottom: 10,
  },
  imageUpload: {
    flex: 1,

    marginBottom: 10,
  },
});

export default CreateCharityScreen;
