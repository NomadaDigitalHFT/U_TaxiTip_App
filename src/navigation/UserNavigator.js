// UserNavigator.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import UserHomeScreen from "./../screens/user/UserHomeScreen";
import UserGeoLocationScreen from "./../screens/user/UserGeoLocationScreen";
import UserConfirmationScreen from "./../screens/user/UserConfirmationScreen";
import UserTripProgressScreen from "./../screens/user/UserTripProgressScreen";
import UserMapViewScreen from "./../screens/user/UserMapViewScreen";
import UserSettingScreen from "./../screens/user/setting/UserSettingScreen";

const Stack = createStackNavigator();

const UserNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    {/* Pantallas del flujo del usuario */}
    <Stack.Screen name="UserHomeScreen" component={UserHomeScreen} />
    <Stack.Screen name="UserGeoLocationScreen" component={UserGeoLocationScreen} />
    <Stack.Screen name="UserConfirmationScreen" component={UserConfirmationScreen} />
    <Stack.Screen name="UserTripProgressScreen" component={UserTripProgressScreen} />
    <Stack.Screen name="UserMapViewScreen" component={UserMapViewScreen} />
    <Stack.Screen name="UserSettingScreen" component={UserSettingScreen} />
  </Stack.Navigator> 
);

export default UserNavigator;


