import { useEffect, useState } from "react";
import * as Location from "expo-location";

export const useGeoLocation = () => {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState("Cargando dirección...");
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permiso de ubicación denegado. Ingresa tu dirección manualmente.");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      let userCoords = {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      };

      // Restringir ubicación a Palma de Mallorca
      const isInsidePalma = userCoords.latitude >= 39.5 && userCoords.latitude <= 39.7 &&
                            userCoords.longitude >= 2.6 && userCoords.longitude <= 2.8;

      if (isInsidePalma) {
        setLocation(userCoords);
      } else {
        setErrorMsg("Ubicación fuera de Palma de Mallorca. Selecciona un lugar dentro del área permitida.");
        setLocation({ latitude: 39.5758519, longitude: 2.6528385 }); // Plaza España
      }

      let reverseGeocode = await Location.reverseGeocodeAsync(userCoords);
      if (reverseGeocode.length > 0) {
        const { street, name, streetNumber } = reverseGeocode[0];
        setAddress(`${street || name} ${streetNumber ? streetNumber : ''}`.trim());
      }
    })();
  }, []);

  const handleDragEnd = async (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setLocation({ latitude, longitude });

    let reverseGeocode = await Location.reverseGeocodeAsync({ latitude, longitude });
    if (reverseGeocode.length > 0) {
      const { street, name, streetNumber } = reverseGeocode[0];
      setAddress(`${street || name} ${streetNumber ? streetNumber : ''}`.trim());
    }
  };

  return { location, address, setAddress, handleDragEnd, errorMsg };
};
