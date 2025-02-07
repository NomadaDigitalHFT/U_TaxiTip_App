import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, Alert, ActivityIndicator } from "react-native";
import { getFirestore, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import ButtonCancelCards from "./../../elements/Buttons/buttonCancelCards";

const UserTripProgressScreen = ({ route }) => {
  const { userCardsId } = route.params || {};
  const db = getFirestore();
  const navigation = useNavigation();
  const [tripData, setTripData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userCardsId) {
      Alert.alert("Error", "No se recibió el ID del viaje.");
      navigation.goBack();
      return;
    }
  
    const requestRef = doc(db, "userCards", userCardsId);
    const unsubscribe = onSnapshot(requestRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setTripData(data);
        console.log("📡 Datos recibidos en UserTripProgressScreen:", data);
  
        // 🔹 Si el status cambia a "completed", terminar el seguimiento del viaje
        if (data.status === "completed") {
          console.log("✅ Viaje finalizado. Redirigiendo...");
          unsubscribe();
          navigation.reset({ index: 0, routes: [{ name: "UserHomeScreen" }] });
        }
      } else {
        Alert.alert("Error", "No se encontró la solicitud en Firestore.");
        navigation.goBack();
      }
      setLoading(false);
    });
  
    return () => unsubscribe();
  }, [userCardsId]);
  

  const confirmarTarifa = async () => {
    if (!tripData) {
      Alert.alert("Espera", "Todavía estamos obteniendo los datos del viaje.");
      return;
    }

    try {
      await updateDoc(doc(db, "userCards", userCardsId), { status: "confirmed" });
      navigation.navigate("UserMapViewScreen", { userCardsId });
    } catch (error) {
      Alert.alert("Error", "No se pudo confirmar la tarifa. Intenta de nuevo.");
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando detalles del viaje...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🚖 Tu Viaje en Progreso</Text>
      <Text>📍 Origen (Usuario): {tripData?.lastLocation?.address || "N/A"}</Text>
      <Text>🎯 Destino (Conductor): {tripData?.driverLocation?.latitude}, {tripData?.driverLocation?.longitude}</Text>
      <Text>⏳ Tiempo Estimado: {tripData?.estimatedTime || "N/A"} min</Text>
      <Text>💰 Tarifa Estimada: {tripData?.fare ? `${tripData.fare}€` : "Calculando..."}</Text>
      <Text>🚖 Ubicación del Conductor en Tiempo Real: {tripData?.driverLocation?.latitude}, {tripData?.driverLocation?.longitude}</Text>

      <Button title="ACEPTAR TARIFA" color="green" onPress={confirmarTarifa} />

      {/* 🔹 Ahora pasamos el userCardsId correctamente al botón de cancelar */}
      <ButtonCancelCards userCardsId={userCardsId} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
});

export default UserTripProgressScreen;















