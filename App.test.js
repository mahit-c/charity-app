import React from "react";
import renderer from "react-test-renderer";
import AppButton from "./components/AppButton";
import { TouchableOpacity } from "react-native";
import DataManager from "./config/DataManager";

//First testing whether the AppButton onPress functionality works as required (Important because the onPress funcitoanlity is important across the app as buttons use it to execute critical tasks such as navigating to login/register screens, logging in and out, creating collections and charities,etc.):
// Unit test because it specifically targets the AppButton component's onPress functionality. Unit test target the behaviours of the small pieces of code in isolation.

test("AppButton is able to handle onPress functionalities correctly", () => {
  const mockPress = jest.fn(); //Mock function to be executed when App Button is pressed
  const customComponent = renderer.create(
    <AppButton title="Submit" color={"green"} onPress={mockPress} />
  ); //Creating a AppButton component to be tested

  const button = customComponent.root.findByType(TouchableOpacity); //Finding the touchable opacity instance in the button (since it represents the button)
  button.props.onPress(); //Execute the onPress
  expect(mockPress).toHaveBeenCalled(); //Test whether the mockPress function is called when the onPress event is executed
});

//Testing whether the Datamanager class can create a new user object which has the required information (name,email,password,emtpy set of collections) using the createUser() method:
//This is an important test to execute as creating a new user is the first critical part of the application. This info is used later throughout the app for all of its purposes (login validation, creating and assigning collections and charities to users account, etc)

test("DataManager is able to create a new user object consisting of all required information", () => {
  const dataManagerTest = DataManager.getInstance();
  console.log(dataManagerTest);

  //Creating a test user:
  const name = "User 1";
  const email = "User1@gmail.com";
  const password = "12345";

  //Pushing user details to dataManager class
  dataManagerTest.createUser(name, email, password);

  //Testing:
  expect(dataManagerTest.users.length).toBe(1);
  expect(dataManagerTest.users[0].name).toBe(name);
  expect(dataManagerTest.users[0].email).toBe(email);
  expect(dataManagerTest.users[0].password).toBe(password);
});
