import React from 'react';
import MapView, { Marker, Polyline } from 'react-native-maps';
import styled from 'styled-components/native';

const MapContainer = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
`;

const UserMapView = ({ userLocation, driverLocation, route }) => {
  return (
    <MapContainer>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker
          coordinate={userLocation}
          title="Tu ubicación"
          pinColor={props => props.theme.colors.primary}
        />
        {driverLocation && (
          <Marker
            coordinate={driverLocation}
            title="Conductor"
            pinColor={props => props.theme.colors.secondary}
          />
        )}
        {route && (
          <Polyline
            coordinates={route}
            strokeColor={props => props.theme.colors.accent}
            strokeWidth={4}
          />
        )}
      </MapView>
    </MapContainer>
  );
};

export default UserMapView;





