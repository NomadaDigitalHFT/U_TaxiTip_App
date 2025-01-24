import React, { createContext, useState, useContext } from "react";

// Crear el contexto para el conductor
export const DriverContext = createContext();

// Proveedor del contexto
export const DriverProvider = ({ children }) => {
  const [driver, setDriver] = useState(null);

  return (
    <DriverContext.Provider value={{ driver, setDriver }}>
      {children}
    </DriverContext.Provider>
  );
};

// Hook para usar el contexto del conductor
export const useDriver = () => useContext(DriverContext);
