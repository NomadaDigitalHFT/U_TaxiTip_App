import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import { getFirestore, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import ButtonCancelCards from "./../../elements/buttonCancelCards";

const UserTripProgressScreen = ({ route }) => {
  const { userCardsId } = route.params || {};
  const db = getFirestore();
  const navigation = useNavigation();
  const [tripData, setTripData] = useState(null);

  useEffect(() => {
    if (!userCardsId) {
      Alert.alert("Error", "ID del viaje no encontrado.");
      navigation.goBack();
      return;
    }

    const requestRef = doc(db, "userCards", userCardsId);
    const unsubscribe = onSnapshot(requestRef, (docSnap) => {
      if (docSnap.exists()) {
        setTripData(docSnap.data());
      } else {
        Alert.alert("Error", "La solicitud fue cancelada.");
        navigation.goBack();
      }
    });

    return () => unsubscribe();
  }, [userCardsId]);

  const confirmarTarifa = async () => {
    if (tripData) {
      await updateDoc(doc(db, "userCards", userCardsId), {
        status: "confirmed",
      });
      navigation.navigate("UserMapViewScreen", { userCardsId });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🚖 Tu Viaje en Progreso</Text>
      <Text>📍 Origen (Usuario): {tripData?.lastLocation?.address || "N/A"}</Text>
      <Text>🎯 Destino (Conductor): {tripData?.driverLocation?.latitude}, {tripData?.driverLocation?.longitude}</Text>
      <Text>⏳ Tiempo Estimado: {tripData?.estimatedTime || "N/A"} min</Text>
      <Text>💰 Tarifa Estimada: {tripData?.fare ? `${tripData.fare}€` : "Calculando..."}</Text>
      <Text>🚖 Ubicación del Conductor en Tiempo Real: {tripData?.driverLocation?.latitude}, {tripData?.driverLocation?.longitude}</Text>
      
      <Button title="ACEPTAR TARIFA" color="green" onPress={confirmarTarifa} />
      <ButtonCancelCards />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
});

export default UserTripProgressScreen;






