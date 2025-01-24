// DriverNavigator.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DriverRequestsScreen from "../screens/driver/DriverRequestsScreen";
import DriverTicketScreen from "../screens/driver/DriverTicketScreen";
import DriverTripDescriptionScreen from "../screens/driver/DriverTripdescriptionScreen";
import DriverHistoryScreen from "../screens/driver/DriverHistoryScreen";
import DriverProfileScreen from "../screens/driver/DriverProfileScreen";

const Stack = createStackNavigator();

const DriverNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    {/* Pantallas del flujo del conductor */}
    <Stack.Screen name="DriverRequestsScreen" component={DriverRequestsScreen} />
    <Stack.Screen name="DriverTicketScreen" component={DriverTicketScreen} />
    <Stack.Screen name="DriverTripDescriptionScreen" component={DriverTripDescriptionScreen} />
    <Stack.Screen name="DriverHistoryScreen" component={DriverHistoryScreen} />
    <Stack.Screen name="DriverProfileScreen" component={DriverProfileScreen} />
  </Stack.Navigator>
);

export default DriverNavigator;

