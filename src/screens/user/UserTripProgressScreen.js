import React from "react";
import { ActivityIndicator } from "react-native";
import { useRoute } from "@react-navigation/native";
import useTripProgress from "./../../hooks/useTripProgress";
import ButtonAcceptTrip from "./../../elements/Buttons/buttonAcceptTrip";
import ButtonCancelCards from "./../../elements/Buttons/buttonCancelCards";
import { Container, Card, Title, StyledText } from "./../../styles/StyleTirpProgressScreen";

const UserTripProgressScreen = () => {
  const route = useRoute();
  const { userCardsId } = route.params || {};
  const { tripData, loading } = useTripProgress(userCardsId);

  if (loading) {
    return (
      <Container>
        <StyledText>Buscando un taxi...</StyledText>
        <ActivityIndicator size="large" color="#1E88E5" />
      </Container>
    );
  }

  if (!tripData || tripData.status !== "fare_confirmed") {
    return (
      <Container>
        <StyledText>No se ha confirmado la tarifa aún.</StyledText>
      </Container>
    );
  }

  // ✅ Asegurar que distance y fare son valores numéricos antes de llamar toFixed(2)
  const distance = tripData.distance ? tripData.distance.toFixed(2) : "0.00";
  const fare = tripData.fare ? tripData.fare.toFixed(2) : "0.00";

  return (
    <Container>
      <Card>
        <Title>🚖 Tu Viaje</Title>
        <StyledText>📍 Dirección del Usuario: {tripData.lastLocation?.address || "Desconocida"}</StyledText>
        <StyledText>📏 Tu Conductor está a: {distance} km</StyledText>
        <StyledText>💰 Tarifa Estimada: {fare}€</StyledText>

        {/* Botones de acción */}
        <ButtonAcceptTrip tripId={userCardsId} />
        <ButtonCancelCards userCardsId={userCardsId} screenName="UserHomeScreen" />
      </Card>
    </Container>
  );
};

export default UserTripProgressScreen;




























