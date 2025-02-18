import React from "react";
import { Button, Alert } from "react-native";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
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
      const userDocRef = doc(db, "usuarios", user.uid);
      const userSnap = await getDoc(userDocRef);
      
      let userName = "Usuario";
      let userPhone = "";

      if (userSnap.exists()) {
        const userData = userSnap.data();
        userName = userData.name || "Usuario";  // ✅ Ahora obtiene el nombre real
        userPhone = userData.phone || "";
      }

      const userCardRef = doc(db, "userCards", user.uid);

      const newCard = {
        userId: user.uid,
        id: user.uid,
        number: `N°${String(Date.now()).slice(-5)}`,
        name: userName,  // ✅ Se guarda el nombre real
        phone: userPhone,  // ✅ Se guarda el teléfono real
        createdAt: new Date().toISOString(),
        lastLocation: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          address: address,
        },
      };

      await setDoc(userCardRef, newCard, { merge: true });

      console.log("Navegando a UserConfirmationScreen con datos:", newCard);

      navigation.navigate("UserConfirmationScreen", {
        userCardsId: newCard.id, 
        userName: newCard.name,
        userAddress: address
      });

    } catch (error) {
      console.error("Error guardando la tarjeta:", error);
      Alert.alert("Error", "No se pudo guardar la tarjeta. Verifica tu conexión y permisos.");
    }
  };

  return <Button title="Confirmar ubicación" onPress={saveUserCard} />;
};

export default ButtonBuildCards;
