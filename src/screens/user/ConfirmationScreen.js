import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import UserMapView from "./../../components/user/UserMapView";
import UserCard from "./../../components/user/UserCard";

const ConfirmationScreen = ({ navigation }) => {
  const [tripDetails, setTripDetails] = useState({
    ticketNumber: "00125",
    name: "Carlos",
    license: "1254",
    phone: "+34 123 456 789",
    distance: "5",
    price: "10",
  });

  const [userLocation] = useState({
    latitude: 37.7749,
    longitude: -122.4194,
  });

  const [driverLocation, setDriverLocation] = useState({
    latitude: 37.7849,
    longitude: -122.4294,
  });

  const handleCancel = () => {
    // Lógica para cancelar el viaje
    console.log("Viaje cancelado");
    navigation.goBack();
  };

  const handleSearch = () => {
    // Lógica para buscar un taxi nuevamente
    console.log("Buscando taxi...");
    setDriverLocation({
      latitude: 37.7899,
      longitude: -122.4394,
    });
  };

  return (
    <View style={styles.container}>
      {/* 3/4 del mapa */}
      <View style={styles.mapContainer}>
        <UserMapView
          userLocation={userLocation}
          driverLocation={driverLocation}
          route={[
            { latitude: userLocation.latitude, longitude: userLocation.longitude },
            { latitude: driverLocation.latitude, longitude: driverLocation.longitude },
          ]}
        />
      </View>

      {/* 1/4 para los detalles */}
      <View style={styles.cardContainer}>
        <UserCard tripDetails={tripDetails} onCancel={handleCancel} onSearch={handleSearch} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 3,
  },
  cardContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
    elevation: 10,
  },
});

export default ConfirmationScreen;
