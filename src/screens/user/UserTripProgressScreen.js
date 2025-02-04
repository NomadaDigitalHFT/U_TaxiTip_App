import React, { useEffect, useState } from "react";
import { View, Text, Button, Alert, StyleSheet, Linking } from "react-native";
import { getFirestore, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import ButtonCancelCards from "./../../elements/buttonCancelCards"; // Integración del botón

const UserTripProgressScreen = ({ route }) => {
  const { requestId } = route.params;
  const db = getFirestore();
  const navigation = useNavigation();
  const [tripData, setTripData] = useState(null);
  const [calculatedFare, setCalculatedFare] = useState(null);

  useEffect(() => {
    const requestRef = doc(db, "userCards", requestId);

    const unsubscribe = onSnapshot(requestRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setTripData(data);

        // Cálculo de la tarifa: (Distancia del conductor hasta el usuario * 1.5€) + 2€
        if (data.driverDistance) {
          const fare = data.driverDistance * 1.5 + 2;
          setCalculatedFare(fare.toFixed(2));
        }
      } else {
        Alert.alert("Error", "La solicitud ha sido cancelada.");
        navigation.navigate("UserHomeScreen");
      }
    });

    return () => unsubscribe();
  }, []);

  const confirmFare = async () => {
    try {
      await updateDoc(doc(db, "userCards", requestId), { status: "fare_confirmed" });
      Alert.alert("Tarifa confirmada", "Tu conductor está en camino.");
    } catch (error) {
      console.error("Error confirmando tarifa:", error);
      Alert.alert("Error", "No se pudo confirmar la tarifa.");
    }
  };

  const callDriver = () => {
    if (tripData?.driverPhone) {
      Linking.openURL(`tel:${tripData.driverPhone}`);
    } else {
      Alert.alert("Error", "No se encontró el número del conductor.");
    }
  };

  if (!tripData) {
    return <Text>Cargando datos del viaje...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Tu viaje está en marcha!</Text>
      <Text style={styles.subtitle}>Detalles del viaje:</Text>
      <Text style={styles.info}>🚖 Conductor: {tripData.driverName || "Desconocido"}</Text>
      <Text style={styles.info}>📞 Teléfono: {tripData.driverPhone || "No disponible"}</Text>
      <Text style={styles.info}>🚗 Vehículo: {tripData.carModel || "No especificado"} - {tripData.carPlate || "Sin placa"}</Text>
      <Text style={styles.info}>📏 Distancia del conductor: {tripData.driverDistance || "N/A"} km</Text>
      <Text style={styles.info}>⏳ Tiempo estimado: {tripData.eta || "N/A"} min</Text>
      <Text style={styles.fare}>💰 Tarifa estimada: {calculatedFare ? `${calculatedFare}€` : "Calculando..."}</Text>
      <Button title="Confirmar Tarifa" onPress={confirmFare} />
      <Button title="Llamar al Conductor" onPress={callDriver} color="green" />
      <ButtonCancelCards /> {/* Integración del botón para cancelar */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold" },
  subtitle: { fontSize: 18, marginTop: 10 },
  info: { fontSize: 16, marginTop: 5 },
  fare: { fontSize: 18, fontWeight: "bold", marginTop: 10 },
});

export default UserTripProgressScreen;




