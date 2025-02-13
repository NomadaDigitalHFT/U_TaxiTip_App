import { createContext, useContext, useState } from "react";

const TripContext = createContext();

export const TripProvider = ({ children }) => {
  const [tripData, setTripData] = useState(null);

  return (
    <TripContext.Provider value={{ tripData, setTripData }}>
      {children}
    </TripContext.Provider>
  );
};

// Agregamos validación para evitar errores si el contexto no está disponible
export const useTrip = () => {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error("useTrip debe usarse dentro de un TripProvider");
  }
  return context;
};





