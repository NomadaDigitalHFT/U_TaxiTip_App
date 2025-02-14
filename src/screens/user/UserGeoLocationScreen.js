import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { TextInput } from "react-native";
import ButtonBuildCards from "./../../elements/Buttons/buttonBuildCards";  // Asegúrate de que este componente también use styled-components

import { Container, MapContainer, Title, InputContainer } from "./../../styles/StyleGeoLocation";  // Importamos los estilos actualizados

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
        setLocation({ coords: { latitude: 0, longitude: 0 } }); // Fallback para evitar error de undefined
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);

      let reverseGeocode = await Location.reverseGeocodeAsync({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });

      if (reverseGeocode.length > 0) {
        const { street, name, streetNumber } = reverseGeocode[0];
        setAddress(`${street || name} ${streetNumber ? streetNumber : ''}`.trim());
      }
    })();
  }, []);

  return (
    <Container>
      <Title>UserGeoLocationScreen.js </Title>
      {location && location.coords ? (
        <MapContainer>
          <MapView
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
        <TextInput
          placeholder="Confirma o edita tu dirección"
          value={address}
          onChangeText={setAddress}
          style={{
            marginBottom: 10,
            padding: 10,
            borderWidth: 1,
            borderRadius: 5,
          }}
        />
        <ButtonBuildCards address={address} location={location} />
      </InputContainer>
    </Container>
  );
};

export default UserGeoLocationScreen;








