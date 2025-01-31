// UserTripProgressScreen.js - Manejo de confirmación, rechazo y cancelación automática
import React, { useEffect, useState } from "react";
import { View, Text, Button, Alert, StyleSheet } from "react-native";
import { getFirestore, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

const UserTripProgressScreen = ({ route }) => {
  const { requestId, userName, userAddress, tip, distance, eta } = route.params;
  const db = getFirestore();
  const navigation = useNavigation();
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    const autoCancel = setTimeout(() => {
      cancelTrip();
    }, 60000);

    return () => {
      clearInterval(timer);
      clearTimeout(autoCancel);
    };
  }, []);

  const acceptTrip = async () => {
    try {
      await updateDoc(doc(db, "requests", requestId), { status: "confirmed" });
      Alert.alert("Viaje confirmado", "Tu conductor está en camino.");
      navigation.navigate("TripTrackingScreen");
    } catch (error) {
      console.error("Error confirmando viaje:", error);
      Alert.alert("Error", "No se pudo confirmar el viaje.");
    }
  };

  const cancelTrip = async () => {
    try {
      await deleteDoc(doc(db, "requests", requestId));
      Alert.alert("Viaje cancelado", "La solicitud ha sido eliminada.");
      navigation.navigate("HomeScreen");
    } catch (error) {
      console.error("Error cancelando viaje:", error);
      Alert.alert("Error", "No se pudo cancelar el viaje.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Hola, {userName}!</Text>
      <Text style={styles.subtitle}>Tu taxi está en camino a:</Text>
      <Text style={styles.address}>{userAddress}</Text>
      <Text style={styles.info}>💰 Propina: {tip ? `${tip}€` : "No especificada"}</Text>
      <Text style={styles.info}>📏 Distancia: {distance ? `${distance} km` : "N/A"}</Text>
      <Text style={styles.info}>⏳ Tiempo estimado: {eta ? `${eta} min` : "N/A"}</Text>
      <Text style={styles.timer}>Tiempo restante: {timeLeft} segundos</Text>
      <Button title="Aceptar" onPress={acceptTrip} />
      <Button title="Rechazar" onPress={cancelTrip} color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold" },
  subtitle: { fontSize: 18, marginTop: 10 },
  address: { fontSize: 16, marginTop: 5, fontStyle: "italic" },
  info: { fontSize: 16, marginTop: 5 },
  timer: { fontSize: 18, color: "red", marginTop: 20 },
});

export default UserTripProgressScreen;




