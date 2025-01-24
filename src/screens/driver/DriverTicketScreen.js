import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import MapView, { Marker } from "react-native-maps";

const DriverTicketScreen = ({ route, navigation }) => {
  const { ticket } = route.params || {};

  const handleAccept = () => {
    navigation.navigate("DriverTripdescriptionScreen", { ticket });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalle del Ticket</Text>
      <Text style={styles.details}>
        Usuario: {ticket?.user || "Cliente Desconocido"}{"\n"}
        Recogida: {ticket?.pickup || "Ubicación no especificada"}{"\n"}
        Destino: {ticket?.destination || "Destino no especificado"}{"\n"}
        Tarifa: {ticket?.fare || "€0.00"}
      </Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: ticket?.pickupLocation?.latitude || 0,
          longitude: ticket?.pickupLocation?.longitude || 0,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker
          coordinate={ticket?.pickupLocation || { latitude: 0, longitude: 0 }}
          title="Recogida"
        />
        <Marker
          coordinate={ticket?.destinationLocation || { latitude: 0, longitude: 0 }}
          title="Destino"
        />
      </MapView>
      <View style={styles.buttonContainer}>
        <Button title="Aceptar" onPress={handleAccept} />
        <Button
          title="Rechazar"
          color="red"
          onPress={() => navigation.goBack()}
        />
      </View>
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
    height: 200,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default DriverTicketScreen;
