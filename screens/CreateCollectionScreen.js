import React, { useState } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import AppText from "../components/AppText";
import AppScreen from "../components/AppScreen";
import TextInputField from "../components/TextInputField";
import { Formik } from "formik"; //Importing formik for form handling
import * as yup from "yup"; //Importing yup for form validation
import AppButton from "../components/AppButton";
import AppColors from "../components/AppColors";
import DataManager from "../config/DataManager";
import ErrorAlert from "../components/ErrorAlert";
import ImageUpload from "../components/ImageUpload";
import * as ImagePicker from "expo-image-picker";
import { useNavigation, useRoute } from "@react-navigation/native";

function CreateCollectionScreen({ navigation, route }) {
  //For receiving data about object to be updated:
  //const collectionInfo = route.params?.collectionInfo ?? null;
  // console.log("Collection INFO IS:  " + collectionInfo.id);

  const dataManager = DataManager.getInstance();
  console.log(dataManager);

  const validateSchema = yup.object().shape(
    //Adding validation rules using yup
    {
      title: yup.string().required().min(5).max(15).label("Collection Title"),
      // image: yup
      // .mixed()
      // .required("Collection Image is required")
      // .test("imageSelected", "Please select an image", (value) => value !== null),
    }
  );

  //Image picker:
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
      //console.log(image)
      setImageError(null);
    } else {
      setImageError("Please select an image");
    }
  };

  return (
    <AppScreen>
      {/* Top header section: */}
      <View style={styles.heading}>
        <AppText style={styles.mainHeader}> Create a Collection </AppText>
        <AppText style={styles.secondaryText}>
          Start organizing your charities
        </AppText>
      </View>

      {/* Collection form section */}
      <Formik //Using Formik for form handling:
        initialValues={{
          title: "",
          //collectionInfo && collectionInfo.title ? collectionInfo.title : "",
          image: null,
        }}
        onSubmit={(values, { resetForm }) => {
          if (image != null) {
            // if (collectionInfo != null) {
            //   dataManager.updateCollection(
            //     //Updating collection if accessed through edit icon
            //     collectionInfo.id,
            //     values.title,
            //     values.image
            //   );
            // } else {
            dataManager.addCollection(values.title, image); //Adding collection
            // }

            console.log(dataManager);
            setImage(null);
            resetForm();
            navigation.navigate("HomeScreen");
          } else {
            setImageError("Please select an image");
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
                placeholder={"Collection Title"}
                value={values.title}
                onBlur={() => setFieldTouched("title")}
                onChangeText={handleChange("title")}
                maxLength={15} /*Setting a max character limit */
              />

              {touched.title && errors.title && (
                <ErrorAlert style={{ paddingLeft: 25, paddingTop: 1 }}>
                  {" "}
                  {errors.title}{" "}
                </ErrorAlert>
              )}
            </View>

            <View style={styles.imageUpload}>
              <ImageUpload
                style={styles.imageUpload}
                onPress={pickImage}
                value={values.image}
              />
            </View>
            <ErrorAlert style={{ paddingLeft: 60, paddingTop: 0 }}>
              {" "}
              {imageError}{" "}
            </ErrorAlert>

            <View style={styles.addCollectionButton}>
              <AppButton
                title="Post"
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
  collectionForm: {
    marginTop: 3,
    paddingHorizontal: 30,
    justifyContent: "space-evenly",
  },
  imageUpload: {
    flex: 1,
  },

  addCollectionButton: {
    flex: 1,
    marginTop: 50,
    paddingHorizontal: 30,
    marginBottom: 10,
  },
});

export default CreateCollectionScreen;
