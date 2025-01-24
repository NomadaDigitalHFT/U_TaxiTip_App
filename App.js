import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { UserProvider } from "./src/contexts/UserContext"; // Contexto del usuario
import { DriverProvider } from "./src/contexts/DriverContext"; // Contexto del conductor
import RootStack from "./src/navigation/RootStack"; // Importa el navegador raíz

const App = () => {
  return (
    <UserProvider>
      <DriverProvider>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </DriverProvider>
    </UserProvider>
  );
};

export default App;
