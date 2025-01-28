import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

const CardContainer = styled.View`
  background-color: #fff;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 10px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 3;
`;

const InfoText = styled.Text`
  font-size: 16px;
  margin-bottom: 5px;
`;

const ButtonContainer = styled.View`
  margin-top: 10px;
`;

const ActionButton = styled.TouchableOpacity`
  padding: 10px 15px;
  border-radius: 5px;
  background-color: #28a745;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
`;

const DriverCard = ({ time, location, tip, distance, onAccept }) => {
  return (
    <CardContainer>
      <InfoText>Hora: {time}</InfoText>
      <InfoText>Ubicación: {location}</InfoText>
      <InfoText>Propina: {tip}</InfoText>
      <InfoText>Distancia: {distance}</InfoText>
      <ButtonContainer>
        <ActionButton onPress={onAccept}>
          <ButtonText>Aceptar</ButtonText>
        </ActionButton>
      </ButtonContainer>
    </CardContainer>
  );
};

export default DriverCard;
