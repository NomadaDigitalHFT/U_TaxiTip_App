import React, { useEffect, useState } from "react";
import { View, Text, Alert, StyleSheet, ActivityIndicator } from "react-native";
import { getFirestore, doc, onSnapshot } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import ButtonCancelCards from "./../../elements/Buttons/buttonCancelCards";

const UserConfirmationScreen = ({ route }) => {
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
    const unsubscribe = onSnapshot(
      requestRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setTripData(data);
          console.log("📡 Datos actualizados en UserConfirmationScreen:", data);

          // 🔹 Si el estado cambia a "fare_confirmed", navegar a UserTripProgressScreen
          if (data.status === "fare_confirmed") {
            console.log("🚀 Viaje confirmado. Navegando a UserTripProgressScreen...");
            unsubscribe();
            navigation.reset({ index: 0, routes: [{ name: "UserTripProgressScreen", params: { userCardsId } }] });
          }
        } else {
          unsubscribe();
          Alert.alert("Error", "La solicitud ha sido eliminada.");
          navigation.goBack();
        }
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [userCardsId]);

  return loading ? <ActivityIndicator size="large" color="#007bff" /> : (
      
    <View style={styles.container}>
      <Text style={styles.subtitle}> Esta pantalla esta a la escucha de la confirmación del conductor y una vez aceptada se redirigirá a la pantalla de UserTripProgressScreen</Text>
      <Text style={styles.title}>¡Genial, {tripData?.name || "Usuario"}!</Text>
      <Text style={styles.subtitle}>Esperando confirmación...</Text>
      <ButtonCancelCards userCardsId={userCardsId} />
      </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
  subtitle: { fontSize: 18, textAlign: "center", marginBottom: 10 },
});

export default UserConfirmationScreen;






// <Text style={styles.subtitle}>Esta pantalla esta a la escucha de la confirmación del conductor y una vez aceptada se redirigirá a la pantalla de UserTripProgressScreen</Text>










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