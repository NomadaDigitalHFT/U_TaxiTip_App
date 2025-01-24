import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";

const DriverHistoryScreen = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    // Aquí se simula la obtención de datos. Reemplazar con Firebase u otra API.
    setTrips([
      {
        id: "1",
        date: "2025-01-20",
        time: "10:30 AM",
        client: "Juan Pérez",
        pickup: "Calle Principal 123",
        destination: "Avenida Central 456",
        fare: "€15.00",
      },
      {
        id: "2",
        date: "2025-01-19",
        time: "2:15 PM",
        client: "María López",
        pickup: "Plaza Mayor",
        destination: "Estación Norte",
        fare: "€10.50",
      },
    ]);
  }, []);

  const renderTrip = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleTripDetails(item)}>
      <Text style={styles.title}>Viaje del {item.date}</Text>
      <Text style={styles.details}>Hora: {item.time}</Text>
      <Text style={styles.details}>Cliente: {item.client}</Text>
      <Text style={styles.details}>Recogida: {item.pickup}</Text>
      <Text style={styles.details}>Destino: {item.destination}</Text>
      <Text style={styles.details}>Tarifa: {item.fare}</Text>
    </TouchableOpacity>
  );

  const handleTripDetails = (trip) => {
    // Lógica para navegar a una pantalla de detalles del viaje.
    console.log("Detalles del viaje seleccionado:", trip);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Historial de Viajes</Text>
      <FlatList
        data={trips}
        keyExtractor={(item) => item.id}
        renderItem={renderTrip}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  details: {
    fontSize: 14,
    color: "#555",
    marginBottom: 3,
  },
});

export default DriverHistoryScreen;
