import React, { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export const ThemeProviderCustom = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
export { ThemeContext }; // ✅ Se exporta correctamente el contexto
