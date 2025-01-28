// UserNavigator.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import UserHome from "../screens/user/UserHomeScreen";
import GeoLocationScreen from "../screens/user/GeoLocationScreen";
import ConfirmationScreen from "../screens/user/ConfirmationScreen";
import TripProgressScreen from "../screens/user/TripProgressScreen";
import ReviewScreen from "../screens/user/ReviewScreen";
import UserProfileScreen from "../screens/user/UserProfileScreen";

const Stack = createStackNavigator();

const UserNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    {/* Pantallas del flujo del usuario */}
    <Stack.Screen name="UserHome" component={UserHome} />
    <Stack.Screen name="ConfirmationScreen" component={ConfirmationScreen} />
    <Stack.Screen name="GeoLocationScreen" component={GeoLocationScreen} />
    <Stack.Screen name="TripProgressScreen" component={TripProgressScreen} />
    <Stack.Screen name="ReviewScreen" component={ReviewScreen} />
    <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} />
  </Stack.Navigator>
);

export default UserNavigator;

