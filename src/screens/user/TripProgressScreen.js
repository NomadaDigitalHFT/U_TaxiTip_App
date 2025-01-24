import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import MapView, { Polyline, Marker } from "react-native-maps";

const DriverTripdescriptionScreen = ({ route, navigation }) => {
  const { trip } = route.params || {};

  const handleFinishTrip = () => {
    Alert.alert(
      "Viaje Completado",
      "El viaje ha sido finalizado.",
      [{ text: "Aceptar", onPress: () => navigation.navigate("DriverHistoryScreen") }]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalles del Viaje</Text>
      <Text style={styles.details}>
        Cliente: {trip?.user || "Cliente desconocido"}{"\n"}
        Recogida: {trip?.pickup || "No especificada"}{"\n"}
        Destino: {trip?.destination || "No especificado"}
      </Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: trip?.pickupLocation?.latitude || 0,
          longitude: trip?.pickupLocation?.longitude || 0,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker
          coordinate={trip?.pickupLocation || { latitude: 0, longitude: 0 }}
          title="Recogida"
        />
        <Marker
          coordinate={trip?.destinationLocation || { latitude: 0, longitude: 0 }}
          title="Destino"
        />
        <Polyline
          coordinates={[
            trip?.pickupLocation || { latitude: 0, longitude: 0 },
            trip?.destinationLocation || { latitude: 0, longitude: 0 },
          ]}
          strokeColor="#000"
          strokeWidth={3}
        />
      </MapView>
      <Button title="Finalizar Viaje" onPress={handleFinishTrip} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  details: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  map: {
    flex: 1,
    height: 300,
    marginBottom: 20,
  },
});

export default DriverTripdescriptionScreen;


