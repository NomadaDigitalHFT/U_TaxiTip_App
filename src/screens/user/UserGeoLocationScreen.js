import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { TextInput } from "react-native";
import ButtonBuildCards from "./../../elements/Buttons/buttonBuildCards";

import { Container, MapContainer, Title, InputContainer } from "./../../styles/StyleGeoLocation";

const UserGeoLocationScreen = () => {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState("Cargando dirección...");
  const [errorMsg, setErrorMsg] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permiso de ubicación denegado. Ingresa tu dirección manualmente.");
        setLocation({ coords: { latitude: 0, longitude: 0 } });
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);

      try {
        let reverseGeocode = await Location.reverseGeocodeAsync({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        });

        if (reverseGeocode.length > 0) {
          const { street, name, streetNumber } = reverseGeocode[0];
          setAddress(`${street || name} ${streetNumber ? streetNumber : ''}`.trim());
        }
      } catch (error) {
        setErrorMsg("No se pudo obtener la dirección.");
      }
    })();
  }, []);

  return (
    <Container>
      <Title>UserGeoLocationScreen.js</Title>
      {location && location.coords ? (
        <MapContainer>
          <MapView
            provider={PROVIDER_GOOGLE} // ✅ Se fuerza a usar Google Maps
            style={{ flex: 1 }}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title={address}
            />
          </MapView>
        </MapContainer>
      ) : (
        <Title>{errorMsg || "Cargando ubicación..."}</Title>
      )}

      <InputContainer>
        <StyledInput
          placeholder="Confirma o edita tu dirección"
          value={address}
          onChangeText={setAddress}
          placeholderTextColor="#B0B0B0" // ✅ Mejor visibilidad en modo oscuro
        />
        <ButtonBuildCards address={address} location={location} />
      </InputContainer>
    </Container>
  );
};

const StyledInput = styled(TextInput)`
  margin-bottom: 10px;
  padding: 10px;
  border-width: 1px;
  border-radius: 5px;
  border-color: ${(props) => props.theme.colors.border || "#DDD"};
  background-color: ${(props) => props.theme.colors.inputBackground || "#FFF"};
  color: ${(props) => props.theme.colors.text || "#000"};
`;

export default UserGeoLocationScreen;








