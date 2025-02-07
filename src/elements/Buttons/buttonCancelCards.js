import React from "react";
import { Alert, Button } from "react-native";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, deleteDoc, getDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

const ButtonCancelCards = ({ userCardsId }) => {
  console.log("🔍 userCardsId recibido en ButtonCancelCards:", userCardsId);
  const navigation = useNavigation();
  const auth = getAuth();
  const db = getFirestore();

  const cancelRequest = async () => {
    const user = auth.currentUser;

    if (!user) {
      Alert.alert("Error", "Usuario no autenticado. Intenta iniciar sesión nuevamente.");
      navigation.reset({ index: 0, routes: [{ name: "LoginScreen" }] });
      return;
    }

    if (!userCardsId) {
      Alert.alert("Error", "No se encontró la solicitud de usuario.");
      return;
    }

    console.log("✅ Usuario autenticado UID:", user.uid);
    console.log("⏳ Intentando eliminar userCardsId:", userCardsId);

    try {
      const userDocRef = doc(db, "userCards", userCardsId);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        console.log("❌ ERROR: No se encontró userCardsId en Firestore:", userCardsId);
        Alert.alert("Error", "La solicitud de usuario no existe o ya fue eliminada.");
        return;
      }

      // Verificar si el usuario actual es el dueño del userCards
      if (userDocSnap.data().userId !== user.uid) {
        Alert.alert("Error", "No tienes permiso para cancelar esta solicitud.");
        return;
      }

      await deleteDoc(userDocRef);
      console.log("✅ userCards eliminado correctamente:", userCardsId);

      // 🔹 FORZAR REDIRECCIÓN
      setTimeout(() => {
        console.log("🔄 Redirigiendo a UserHomeScreen...");
        navigation.reset({ index: 0, routes: [{ name: "UserHomeScreen" }] });
      }, 500); // Pequeño retraso para asegurar la ejecución

    } catch (error) {
      console.error("❌ Error al eliminar la solicitud:", error.message);
      Alert.alert("Error", `No se pudo eliminar la solicitud: ${error.message}`);
    }
  };

  return <Button title="Cancelar" color="red" onPress={cancelRequest} />;
};

export default ButtonCancelCards;


