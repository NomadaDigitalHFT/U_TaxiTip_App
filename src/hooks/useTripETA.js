import { useEffect, useState } from "react";
import axios from "axios";
import { GOOGLE_MAPS_API_KEY } from "@env"; // 🔑 Importa desde el archivo .env

const useTripETA = (driverLocation, userLocation) => {
  const [eta, setETA] = useState(null);

  useEffect(() => {
    const fetchETA = async () => {
      if (!driverLocation || !userLocation) return;

      console.log("Google Maps API Key:", GOOGLE_MAPS_API_KEY); // 🔍 Para verificar si la clave se carga correctamente

      const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${driverLocation.latitude},${driverLocation.longitude}&destinations=${userLocation.latitude},${userLocation.longitude}&key=${GOOGLE_MAPS_API_KEY}`;

      try {
        const response = await axios.get(url);
        if (response.data.rows[0].elements[0].status === "OK") {
          const duration = response.data.rows[0].elements[0].duration.text; // Tiempo estimado
          setETA(duration);
        } else {
          console.warn("Google API error:", response.data.rows[0].elements[0].status);
          setETA("No disponible");
        }
      } catch (error) {
        console.error("Error obteniendo ETA:", error);
        setETA("Error en API");
      }
    };

    fetchETA();
  }, [driverLocation, userLocation]);

  return eta;
};

export default useTripETA;

