import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DriverHomeScreen from "../screens/driver/DriverHomeScreen";
// import DriverTicketScreen from "../screens/driver/DriverTicketScreen";

const Stack = createStackNavigator();

const DriverNavigator = () => (
  <Stack.Navigator initialRouteName="DriverHomeScreen" screenOptions={{ headerShown: false }}>
    {/* Pantallas del flujo del conductor */}
    <Stack.Screen name="DriverHomeScreen" component={DriverHomeScreen} />
    {/* <Stack.Screen name="DriverTicketScreen" component={DriverTicketScreen} /> */}
  </Stack.Navigator>
);

export default DriverNavigator;

