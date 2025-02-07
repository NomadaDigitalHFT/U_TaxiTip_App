import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "../screens/auth/WelcomeScreen";
import AuthNavigator from "./AuthNavigator";
import UserNavigator from "./UserNavigator";

const Stack = createStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator initialRouteName="WelcomeScreen" screenOptions={{ headerShown: false }}>
      {/* Pantalla inicial */}
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />

      {/* Flujo de autenticación */}
      <Stack.Screen name="AuthNavigator" component={AuthNavigator} />

      {/* Flujo del usuario */}
      <Stack.Screen name="UserNavigator" component={UserNavigator} />
    </Stack.Navigator>
  );
}

export default RootStack;


