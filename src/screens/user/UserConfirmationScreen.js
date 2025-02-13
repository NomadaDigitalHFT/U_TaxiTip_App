import React from "react";
import { ActivityIndicator } from "react-native";
import { useConfirmation } from "./../../hooks/useConfirmation";
import ButtonCancelCards from "./../../elements/Buttons/buttonCancelCards";
import { Container, Card, Title, StyledText } from "./../../styles/StyleConfirmationScreen";

const UserConfirmationScreen = ({ route }) => {
  const { userCardsId } = route.params || {};
  const { tripData, loading } = useConfirmation(userCardsId);

  return (
    <Container>
      <Card>
        <Title>🚖 Tu Viaje</Title>
        <StyledText>📍 Origen: Ubicación seleccionada</StyledText>
        <StyledText>⏳ Un momento por favor, estamos buscando un taxi para ti...</StyledText>
        {loading && <ActivityIndicator size="large" color="#1E88E5" />}
        
        {/* Solo mostrar el botón de cancelar */}
        <ButtonCancelCards userCardsId={userCardsId} screenName="UserHomeScreen" />
      </Card>
    </Container>
  );
};

export default UserConfirmationScreen;













