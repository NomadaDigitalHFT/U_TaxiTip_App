import React, { useEffect, useState } from "react";
import { Button, Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getFirestore, doc, onSnapshot } from "firebase/firestore";
import UserFooter from "./../../components/common/UserFooter";
import useTripETA from "./../../hooks/useTripETA"; // Hook para ETA
import { Container, StyledText, DriverName, PriceCircle, PriceText } from "./../../styles/StyleMapViewScreen";

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
    <Container>
      {/* 🔥 Círculo con el precio en el centro */}
      <PriceCircle>
        <PriceText>{tripData?.fare ? `${tripData.fare.toFixed(2)}€` : "N/A"}</PriceText>
      </PriceCircle>

      {/* Nombre del Conductor */}
      <DriverName>👤 Conductor: {tripData?.driverName || "No disponible"}</DriverName>
      
      {/* Dirección de origen */}
      <StyledText>📍 Origen: {tripData?.lastLocation?.address || "No disponible"}</StyledText>
      
      {/* Tiempo estimado de llegada */}
      <StyledText>⏳ Llega en: {eta || "Calculando..."}</StyledText>

      {/* Botón para llamar al conductor */}
      {tripData?.driverPhone && (
        <Button title="Llamar al Conductor" onPress={() => Linking.openURL(`tel:${tripData.driverPhone}`)} />
      )}

      <UserFooter />
    </Container>
  );
};

export default UserMapViewScreen;


