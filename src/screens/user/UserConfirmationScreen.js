import React, { useEffect, useState } from "react";
import { View, Text, Button, Alert, StyleSheet, ActivityIndicator } from "react-native";
import { getFirestore, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import ButtonCancelCards from "./../../elements/buttonCancelCards";

const UserConfirmationScreen = ({ route }) => {
  const { userCardsId } = route.params || {}; // Asegurar que no sea undefined
  const db = getFirestore();
  const navigation = useNavigation();
  const [tripData, setTripData] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log("🔍 userCardsId recibido en UserConfirmationScreen:", userCardsId);

  useEffect(() => {
    if (!userCardsId) {
      Alert.alert("Error", "No se encontró la solicitud.");
      navigation.goBack();
      return;
    }

    const requestRef = doc(db, "userCards", userCardsId);
    const unsubscribe = onSnapshot(requestRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setTripData(data);
        
        if (data.status === "waiting_user_confirmation") {
          Alert.alert("🚕 Un conductor ha aceptado tu viaje.");
        }

        if (data.status === "fare_confirmed") {
          console.log("✅ Tarifa confirmada, redirigiendo a UserTripProgressScreen...");
          navigation.navigate("UserTripProgressScreen", { userCardsId });
        }
      } else {
        Alert.alert("❌ Error", "La solicitud fue cancelada.");
        navigation.goBack();
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userCardsId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#007bff" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Esta pantalla esta a la escucha de la confirmación del conductor y una vez aceptada se redirigirá a la pantalla de UserTripProgressScreen</Text>
      <Text style={styles.title}>¡Genial, {tripData?.name || "Usuario"}!</Text>
      <Text style={styles.subtitle}>Esperando confirmación...</Text>
      <Text style={styles.address}>📍 Dirección: {tripData?.lastLocation?.address || "Ubicación desconocida"}</Text>
      {/* <Button title="Aceptar Tarifa" onPress={() => navigation.navigate("UserTripProgressScreen", { userCardsId })} color="green" /> */}
      <ButtonCancelCards />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold" },
  subtitle: { fontSize: 18, marginTop: 10 },
  address: { fontSize: 16, marginTop: 5, fontStyle: "italic" },
});

export default UserConfirmationScreen;

















// import React from "react";
// import { View, Text, StyleSheet } from "react-native";
// import ButtonCancelCards from "./../../elements/buttonCancelCards";

// const ConfirmationScreen = ({ route, navigation }) => {
//   const { userName, userAddress } = route.params;

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>¡Genial, {userName}!</Text>
//       <Text style={styles.subtitle}>Estas UserConfirmationScreen:</Text>
//       <Text style={styles.address}>{userAddress}</Text>
//       <ButtonCancelCards />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//   },
//   subtitle: {
//     fontSize: 18,
//     marginTop: 10,
//   },
//   address: {
//     fontSize: 16,
//     marginTop: 5,
//     fontStyle: "italic",
//   },
// });

// export default ConfirmationScreen;