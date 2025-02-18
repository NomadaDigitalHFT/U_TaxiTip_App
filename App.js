import React from "react";
import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "styled-components/native";
import { lightTheme, darkTheme } from "./src/styles/theme"; 
import RootStack from "./src/navigation/RootStack";
import { TripProvider } from "./src/context/TripContext";
import { UserProvider, useUser } from "./src/context/UserContext";
import { ThemeProviderCustom, useTheme } from "./src/context/ThemeContext";

const AppContent = () => {
  const { isDarkMode } = useTheme();
  const { user } = useUser(); 

  if (user === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#1E88E5" />
      </View>
    );
  }

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <TripProvider>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </TripProvider>
    </ThemeProvider>
  );
};

const App = () => {
  return (
    <ThemeProviderCustom>
      <UserProvider> 
        <AppContent />
      </UserProvider>
    </ThemeProviderCustom>
  );
};

export default App;

