import React from "react";
import { ActivityIndicator } from "react-native";
import { useConfirmation } from "./../../hooks/useConfirmation";
import ButtonCancelCards from "./../../elements/Buttons/buttonCancelCards";
import { Container, Card, Title, StyledText } from "./../../styles/StyleConfirmationScreen"; // Asegúrate de que este archivo esté actualizado

const UserConfirmationScreen = ({ route }) => {
  const { userCardsId } = route.params || {};
  const { tripData, loading } = useConfirmation(userCardsId);

  return (
    <Container>
      <Card>
        <Title>🚖 Tu Viaje</Title>
        <StyledText>📍 Origen: {tripData?.lastLocation?.address || "Ubicación seleccionada"}</StyledText>
        <StyledText>⏳ Un momento por favor, estamos buscando un taxi para ti...</StyledText>
        {loading && <ActivityIndicator size="large" color={(props) => props.theme.colors.primary} />} {/* Color dinámico del tema */}
        
        {/* Solo mostrar el botón de cancelar */}
        <ButtonCancelCards userCardsId={userCardsId} screenName="UserHomeScreen" />
      </Card>
    </Container>
  );
};

export default UserConfirmationScreen;














