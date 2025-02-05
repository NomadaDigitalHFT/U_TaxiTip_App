import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, Linking } from "react-native";
import { getFirestore, doc, onSnapshot } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

const UserMapViewScreen = ({ route }) => {
  const { userCardsId } = route.params || {};
  const db = getFirestore();
  const navigation = useNavigation();
  const [tripData, setTripData] = useState(null);

  useEffect(() => {
    if (!userCardsId) {
      navigation.goBack();
      return;
    }

    const requestRef = doc(db, "userCards", userCardsId);
    const unsubscribe = onSnapshot(requestRef, (docSnap) => {
      if (docSnap.exists()) {
        setTripData(docSnap.data());
      } else {
        navigation.goBack();
      }
    });

    return () => unsubscribe();
  }, [userCardsId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🗺️ Mapa de Viaje</Text>
      <Text>📍 Origen (Usuario): {tripData?.lastLocation?.address || "N/A"}</Text>
      <Text>🎯 Destino (Conductor): {tripData?.driverLocation?.latitude}, {tripData?.driverLocation?.longitude}</Text>
      <Text>☎️ Teléfono del Conductor: {tripData?.phone || "No disponible"}</Text>

      {tripData?.phone && (
        <Button title="Llamar al Conductor" onPress={() => Linking.openURL(`tel:${tripData.phone}`)} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
});

export default UserMapViewScreen;






/*
UserMapView.js en este archivo podemos manejar la logica del mapa del usuario.

*/