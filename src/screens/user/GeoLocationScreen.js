/* Archivo: GeoLocationScreen.js */
import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import theme from "../../styles/theme";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.lightBlue};
`;

const MapContainer = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
`;

const Title = styled.Text`
  font-size: 24px;
  font-family: ${theme.fonts.bold};
  color: ${theme.colors.darkBlue};
  text-align: center;
  margin: 10px;
`;

const GeoLocationScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permiso de ubicación denegado.");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    })();
  }, []);

  const region = location
    ? {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
    : null;

  return (
    <Container>
      <Title>Geolocalización</Title>
      {region ? (
        <MapContainer>
          <MapView style={{ flex: 1 }} initialRegion={region}>
            <Marker
              coordinate={{
                latitude: region.latitude,
                longitude: region.longitude,
              }}
              title="Tu ubicación"
            />
          </MapView>
        </MapContainer>
      ) : (
        <Title>{errorMsg || "Cargando ubicación..."}</Title>
      )}
    </Container>
  );
};

export default GeoLocationScreen;
