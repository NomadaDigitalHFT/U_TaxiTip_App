import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import theme from "../../styles/theme";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { TextInput } from "react-native";
import ButtonBuildCards from "./../../elements/buttonBuildCards"; // Importamos el nuevo componente

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

const InputContainer = styled.View`
  position: absolute;
  bottom: 20px;
  width: 90%;
  background-color: white;
  padding: 10px;
  border-radius: 10px;
`;

const UserGeoLocationScreen = () => {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState("Cargando dirección...");
  const [errorMsg, setErrorMsg] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permiso de ubicación denegado.");
        return;
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
      <Title>Confirma tu dirección de recogida</Title>
      {location ? (
        <MapContainer>
          <MapView style={{ flex: 1 }} initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
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
          style={{ marginBottom: 10, padding: 10, borderWidth: 1, borderRadius: 5 }}
        />
        {/* Se usa el nuevo componente para guardar la ubicación */}
        <ButtonBuildCards address={address} location={location} />
      </InputContainer>
    </Container>
  );
};

export default UserGeoLocationScreen;



/*
una vez esta en la pantalla Buscar Taxi al presionar el Boton debe pasar al una pantalla de "Confirma tu dirección de recogida" Esto puede ser en modo autonmatico o manual ya que utilizaremos la geolocalizacion para obtener la ubicacion actual del usuario. y le podemos dar la opcion de cambiar la direccion manualmente.

te paso los archivos involucrados y por favor me dices si necesitas algo mas y dame   sugerencias para mejorar el codigo.

una vez confirmada su posicion podemos guardarla tambien el su perfil de usuario para futuras busquedas de taxi.

la Api de google maps ya esta configurada en el proyecto. en el Archivo de firebaseConfig.js

*/