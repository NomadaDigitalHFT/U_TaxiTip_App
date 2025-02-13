import { useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { Alert } from "react-native";

const useAcceptTrip = () => {
  const navigation = useNavigation();
  const auth = getAuth();
  const db = getFirestore();

  const acceptTrip = async (tripId) => {
    const driver = auth.currentUser;
    if (!driver) {
      Alert.alert("Error", "Conductor no autenticado. Intenta iniciar sesión nuevamente.");
      return;
    }
  
    try {
      const tripRef = doc(db, "userCards", tripId);
      await updateDoc(tripRef, {
        driverId: driver.uid,
        driverName: driver.displayName || "Conductor",
        driverPhone: driver.phoneNumber || "No disponible",
        status: "trip_started",
      });

      console.log("✅ Tarifa aceptada, redirigiendo a UserMapViewScreen con tripId:", tripId);

      // 🔹 Usa `setTimeout` para asegurar que Firestore actualice antes de navegar
      setTimeout(() => {
        navigation.navigate("UserMapViewScreen", { tripId });
      }, 1000); 

    } catch (error) {
      console.error("❌ Error al aceptar la tarifa:", error);
      Alert.alert("Error", "No se pudo aceptar la tarifa. Verifica tu conexión.");
    }
  };

  return { acceptTrip };
};

export default useAcceptTrip;

