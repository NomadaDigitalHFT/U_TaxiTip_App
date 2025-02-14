import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "styled-components/native";
import { lightTheme, darkTheme } from "./src/styles/theme"; 
import RootStack from "./src/navigation/RootStack";
import { auth } from "./src/firebase/firebaseConfig";
import { TripProvider } from "./src/context/TripContext";
import { UserProvider } from "./src/context/UserContext";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false); // Estado de inicio del tema


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#1E88E5" />
      </View>
    );
  }

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <UserProvider>
        <TripProvider>
          <NavigationContainer>
            <RootStack />
          </NavigationContainer>
        </TripProvider>
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;

