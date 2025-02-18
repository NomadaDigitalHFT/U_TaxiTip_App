import React, { useContext } from "react";
import { ThemeContext } from "./../../context/ThemeContext"; // Conexión con ThemeContext
import { ThemeButton, ButtonText } from "./../../styles/Button/StyleButtonLightDark";
import { Ionicons } from "@expo/vector-icons"; // Importando los iconos de Expo

const ButtonLightDark = () => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    console.error("❌ Error: ThemeContext no está definido. Asegúrate de envolver la App con ThemeProviderCustom.");
    return null; 
  }

  const { isDarkMode, setIsDarkMode } = themeContext;

  return (
    <ThemeButton 
      onPress={() => setIsDarkMode(!isDarkMode)}
      accessibilityLabel="Botón de cambio de tema"
    >
      <Ionicons 
        name={isDarkMode ? "moon" : "sunny"} 
        size={24} 
        color="white" // Puedes cambiar el color según el tema si lo necesitas
      />
    </ThemeButton>
  );

};

export default ButtonLightDark;

