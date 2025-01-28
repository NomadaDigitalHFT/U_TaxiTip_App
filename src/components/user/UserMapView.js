import React from 'react';
import MapView, { Marker, Polyline } from 'react-native-maps';

const UserMapView = ({ userLocation, driverLocation, route }) => {
  return (
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
        pinColor="blue"
      />
      {driverLocation && (
        <Marker
          coordinate={driverLocation}
          title="Conductor"
          pinColor="green"
        />
      )}
      {route && (
        <Polyline
          coordinates={route}
          strokeColor="#007BFF"
          strokeWidth={4}
        />
      )}
    </MapView>
  );
};

export default UserMapView;






/*
UserMapView.js en este archivo podemos manejar la logica del mapa del usuario.

*/