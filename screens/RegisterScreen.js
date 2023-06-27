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
import { useNavigation } from "@react-navigation/native";
import DataManager from "../config/DataManager";

function RegisterScreen({ navigation }) {
  const validateSchema = yup.object().shape(
    //Adding validation rules using yup
    {
      name: yup.string().required().min(4).max(10).label("Name"),
      email: yup.string().required().email().label("Email"),
      password: yup.string().required().min(4).max(10).label("Password"),
      passwordConfirmation: yup
        .string()
        .required("Please re-enter your password")
        .oneOf([yup.ref("password"), null], "Passwords must match"),
    }
  );

  const [registeredUserInfo, setRegisteredUser] = useState(null);

  //For user registration using DATA MANAGER:
  const dataManager = DataManager.getInstance();

  return (
    <AppScreen>
      <View style={styles.heading}>
        <AppText style={styles.mainHeader}> Create Acount </AppText>
        <AppText style={styles.secondaryText}>
          {" "}
          Register to get started{" "}
        </AppText>
      </View>

      <Formik //Using Formik for form handling:
        initialValues={{
          name: "",
          email: "",
          password: "",
          passwordConfirmation: "",
        }}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          // setRegisteredUser({email: values.email, password: values.password}); //Passing values through routes
          dataManager.createUser(values.name, values.email, values.password);
          console.log(dataManager);
          resetForm();
          navigation.navigate("LoginScreen"); //, { registeredUserInfo: { email: values.email, password: values.password } }); //Pass user info to login screen
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
              <TextInputField //For user's name fied
                iconSelect={"account"}
                placeholder={"Name"}
                textContentType="givenName"
                maxLength={15} /*Setting a max character limit */
                onBlur={() => setFieldTouched("name")}
                value={values.name}
                onChangeText={handleChange("name")}
              />
              {touched.name && errors.name && (
                <ErrorAlert> {errors.name} </ErrorAlert>
              )}

              <TextInputField //For users email field
                iconSelect={"email-outline"}
                placeholder={"Email"}
                textContentType="emailAddress"
                maxLength={30} /*Setting a max character limit */
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

              <TextInputField //For users password confirmation field
                iconSelect={"lock-check"}
                placeholder={"Re-enter password"}
                autoCaptilize="none"
                secureTextEntry
                textContentType="newPassword"
                maxLength={20}
                value={values.passwordConfirmation}
                onBlur={() => setFieldTouched("passwordConfirmation")}
                onChangeText={handleChange("passwordConfirmation")}
              />
            </View>
            {touched.passwordConfirmation && errors.passwordConfirmation && (
              <ErrorAlert style={{ paddingLeft: 30 }}>
                {" "}
                {errors.passwordConfirmation}{" "}
              </ErrorAlert>
            )}

            <View style={styles.loginButton}>
              <AppButton
                title="Register"
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
        <AppText style={styles.bottomText}> Already have an account? </AppText>
        <TouchableOpacity>
          <AppText
            style={styles.bottomTextLink}
            onPress={() => navigation.navigate("LoginScreen")}
          >
            {" "}
            Login now{" "}
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
    //Styling for the register form view component
    flex: 4,
    flexDirection: "column",
    marginTop: 3,
    paddingHorizontal: 30,
    justifyContent: "space-evenly",
  },

  loginButton: {
    //Styling for the button view component
    flex: 1,
    marginBottom: 10, //Pushes the login button up and makes the email and password fields closer (moves password upwards)
    paddingHorizontal: 30, //Reducing login button horizontal width
  },

  textContainer: {
    flex: 1.5,
    alignItems: "center",
    paddingTop: 10, //Pushing bottom text downwards
  },

  bottomText: {
    fontSize: 15,
  },

  bottomTextLink: {
    fontSize: 15,
    color: AppColors.primaryColor,
  },
});

export default RegisterScreen;
