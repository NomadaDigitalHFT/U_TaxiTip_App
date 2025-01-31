// buttonBuildCards.js - Corrigiendo la navegación a UserConfirmationScreen.js
import React from "react";
import { Button, Alert } from "react-native";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

const ButtonBuildCards = ({ address, location }) => {
  const navigation = useNavigation();
  const auth = getAuth();
  const db = getFirestore();

  const saveUserCard = async () => {
    const user = auth.currentUser;
  
    if (!user) {
      Alert.alert("Error", "Usuario no autenticado. Intenta iniciar sesión nuevamente.");
      return;
    }
  
    if (!location || !location.coords) {
      Alert.alert("Error", "Ubicación no disponible.");
      return;
    }
  
    try {
      const userDocRef = doc(db, "userCards", user.uid);
  
      const newCard = {
        userId: user.uid,
        id: user.uid,
        number: `N°${String(Date.now()).slice(-5)}`,
        name: user.displayName || "Usuario",
        phone: user.phoneNumber || "",
        createdAt: new Date().toISOString(),
        lastLocation: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          address: address,
        },
      };
  
      await setDoc(userDocRef, newCard, { merge: true });
  
      Alert.alert("Ubicación guardada", "Tu dirección ha sido guardada en userCards.");
      
      console.log("Navegando a UserConfirmationScreen con datos:", newCard);
      navigation.navigate("UserConfirmationScreen", { userName: newCard.name, userAddress: address });
  
    } catch (error) {
      console.error("Error guardando la tarjeta:", error);
      Alert.alert("Error", "No se pudo guardar la tarjeta. Verifica tu conexión y permisos.");
    }
  };
  
  return <Button title="Confirmar ubicación" onPress={saveUserCard} />;
};

export default ButtonBuildCards;
