import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, Linking } from "react-native";
import { getFirestore, doc, onSnapshot } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import UserFooter from "./../../components/common/UserFooter";
import useTripETA from "./../../hooks/useTripETA"; // Hook para la ETA

const UserMapViewScreen = ({ route }) => {
  const { tripId } = route.params || {};
  const db = getFirestore();
  const navigation = useNavigation();
  const [tripData, setTripData] = useState(null);

  useEffect(() => {
    if (!tripId) {
      navigation.goBack();
      return;
    }

    const requestRef = doc(db, "userCards", tripId);
    const unsubscribe = onSnapshot(requestRef, (docSnap) => {
      if (docSnap.exists()) {
        setTripData(docSnap.data());
      } else {
        navigation.goBack();
      }
    });

    return () => unsubscribe();
  }, [tripId]);

  // Obtener ETA con el hook personalizado
  const eta = useTripETA(tripData?.driverLocation, tripData?.lastLocation);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🗺️ Tu Viaje</Text>
      <Text style={styles.text}>📍 Origen: {tripData?.lastLocation?.address || "No disponible"}</Text>
      <Text style={styles.text}>⏳ Tiempo estimado de llegada: {eta || "Calculando..."}</Text>

      {tripData?.driverPhone && (
        <Button title="Llamar al Conductor" onPress={() => Linking.openURL(`tel:${tripData.driverPhone}`)} />
      )}
      <UserFooter />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  text: { fontSize: 16, marginBottom: 8 },
});

export default UserMapViewScreen;




