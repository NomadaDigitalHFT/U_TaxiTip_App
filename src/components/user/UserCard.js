import React from 'react';
import styled from 'styled-components/native'; // Usamos styled-components
import { TouchableOpacity } from 'react-native';

const CardContainer = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.card};
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
  shadow-color: ${(props) => props.theme.colors.shadow};
  shadow-offset: { width: 0, height: 2 };
  shadow-opacity: 0.1;
  shadow-radius: 4;
  elevation: 3;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  color: ${(props) => props.theme.colors.text};
`;

const InfoText = styled.Text`
  font-size: 16px;
  margin-bottom: 5px;
  color: ${(props) => props.theme.colors.textSecondary};
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
`;

const CancelButton = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.error};
  padding: 10px;
  border-radius: 5px;
  flex: 1;
  margin-right: 5px;
`;

const SearchButton = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.primary};
  padding: 10px;
  border-radius: 5px;
  flex: 1;
  margin-left: 5px;
`;

const ButtonText = styled.Text`
  color: ${(props) => props.theme.colors.white};
  text-align: center;
  font-weight: bold;
`;

const UserCard = ({ tripDetails, onCancel, onSearch }) => {
  return (
    <CardContainer>
      <Title>Detalles del Viaje</Title>
      <InfoText>Nº Ticket: {tripDetails.ticketNumber}</InfoText>
      <InfoText>Nombre: {tripDetails.name}</InfoText>
      <InfoText>Licencia: {tripDetails.license}</InfoText>
      <InfoText>Teléfono: {tripDetails.phone}</InfoText>
      <InfoText>Distancia: {tripDetails.distance} km</InfoText>
      <InfoText>Aprox. Tip: €{tripDetails.price}</InfoText>
      <ButtonContainer>
        <CancelButton onPress={onCancel}>
          <ButtonText>Cancelar Viaje</ButtonText>
        </CancelButton>
        <SearchButton onPress={onSearch}>
          <ButtonText>Busca mi Taxi</ButtonText>
        </SearchButton>
      </ButtonContainer>
    </CardContainer>
  );
};

export default UserCard;














/*
UserCard.js aqui podemos colocar la informacion que cera el usuario una vez el conductor aya aceptado su viaje. 
Nº ticke 00125
nombre: Carlos 
licencia: 1254
telefono: +34 123 456 789
distancia: km
aprox Tip: €  (este precio va a variar ya que la posicion del Taxi se actualiza en tiempo real) y se fija cuando el conductor acepta el viaje.)
esta informacion se muestra abajo utilizando un 1/4 de la pantalla

y en la otra 3/4 se muestra el mapa con los puntos de conductor y pasajero
*/ 