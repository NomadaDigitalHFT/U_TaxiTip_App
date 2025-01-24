import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "../screens/WelcomeScreen";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import ProfileScreen from "../screens/ProfileScreen";
import GeoLocationScreen from "../screens/GeoLocationScreen";
import { useUser } from "../contexts/UserContext";

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { user } = useUser();

  return (
    <Stack.Navigator initialRouteName={user ? "Home" : "Welcome"}>
      {/* Rutas de autenticación */}
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false, title: "TaxiTip - Bienvenido" }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: "TaxiTip - Iniciar Sesión" }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ title: "TaxiTip - Registrarse" }}
      />

      {/* Rutas principales */}
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "TaxiTip - Inicio" }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: "TaxiTip - Perfil" }}
      />
      <Stack.Screen
        name="GeoLocation"
        component={GeoLocationScreen}
        options={{ title: "TaxiTip - Geolocalización" }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;

