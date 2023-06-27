import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import AppScreen from "../components/AppScreen";
import AppText from "../components/AppText";
import AppColors from "../components/AppColors";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import TextInputField from "../components/TextInputField";
import AppButton from "../components/AppButton";
import { Formik } from "formik"; //Importing formik for form handling
import * as yup from "yup"; //Importing yup for form validation
import ErrorAlert from "../components/ErrorAlert";
import { useNavigation, useRoute } from "@react-navigation/native";
import DataManager from "../config/DataManager";

function LoginScreen({ navigation }) {
  const validateSchema = yup.object().shape(
    //Adding validation rules using yup
    {
      email: yup.string().required().email().label("Email"),
      password: yup.string().required().min(4).max(10).label("Password"),
    }
  );

  //For registered user validation:
  const dataManager = DataManager.getInstance();
  const userValidation = ({ email, password }) => {
    return (
      dataManager.users.filter(
        (user) => user.email === email && user.password === password
      ).length > 0
    );
  };

  //For passing user info to the home screen
  // const [loggedUserInfo, setLoggedUser] = useState(null);

  return (
    <AppScreen>
      <View style={styles.heading}>
        <AppText style={styles.mainHeader}> Welcome Back! </AppText>
        <AppText style={styles.secondaryText}> Sign in to continue </AppText>
      </View>
      <Formik //Using Formik for form handling:
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, { resetForm }) => {
          if (userValidation(values)) {
            //Actual comparison to validate login
            // setLoggedUser({email: values.email, password: values.password})
            dataManager.setUser(values.email, values.password);
            resetForm();

            navigation.reset({
              //Resseting stack after logging into login screen
              index: 0,
              routes: [{ name: "Main" }],
            });
          } else {
            console.log("Incorrect values!");
            alert("Incorrect login details!");
            resetForm();
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
            <View style={styles.form}>
              <TextInputField //For users email field
                iconSelect={"email-outline"}
                placeholder={"Email"}
                textContentType="emailAddress"
                onBlur={() => setFieldTouched("email")}
                value={values.email}
                onChangeText={handleChange("email")}
              />
              {touched.email && errors.email && (
                <ErrorAlert> {errors.email} </ErrorAlert>
              )}

              <TextInputField //For users password field
                iconSelect={"lock"}
                placeholder={"Create password"}
                autoCaptilize="none"
                secureTextEntry
                textContentType="newPassword"
                g
                maxLength={20}
                value={values.password}
                onBlur={() => setFieldTouched("password")}
                onChangeText={handleChange("password")}
              />

              {touched.password && errors.password && (
                <ErrorAlert> {errors.password} </ErrorAlert>
              )}
            </View>

            <View style={styles.loginButton}>
              <AppButton
                title="Login"
                color={AppColors.secondaryColor}
                onPress={handleSubmit}
              >
                {" "}
              </AppButton>
            </View>
          </>
        )}
      </Formik>

      <View style={styles.textContainer}>
        <AppText style={styles.bottomText}> Don't have an account? </AppText>
        <TouchableOpacity>
          <AppText
            style={styles.bottomTextLink}
            onPress={() => navigation.navigate("RegisterScreen")}
          >
            Signup now{" "}
          </AppText>
        </TouchableOpacity>
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
    fontSize: 40,
    fontWeight: "bold",
  },

  secondaryText: {
    //Styling for text below main header
    paddingHorizontal: 8,
    fontWeight: "200",
  },

  form: {
    //Styling for the login form view component
    flex: 2,
    flexDirection: "column",
    marginTop: 25,
    paddingHorizontal: 30,
    paddingBottom: 15,
    justifyContent: "space-evenly",
  },

  loginButton: {
    //Styling for the button view component
    flex: 1,
    marginBottom: 5, //Pushes the login button up and makes the email and password fields closer (moves password upwards)
    paddingHorizontal: 30, //Reducing login button horizontal width
  },

  textContainer: {
    flex: 1.5,
    alignItems: "center",
  },

  bottomText: {
    fontSize: 15,
  },

  bottomTextLink: {
    fontSize: 15,
    color: AppColors.primaryColor,
  },
});

export default LoginScreen;
