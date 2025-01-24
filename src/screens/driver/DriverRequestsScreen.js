/* Archivo: DriverRequestsScreen.js */
import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { FlatList, Text, TouchableOpacity, Alert } from "react-native";
import theme from "../../styles/theme";
import { useNavigation } from "@react-navigation/native";

const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.lightGray};
`;

const Title = styled.Text`
  font-size: 24px;
  font-family: ${theme.fonts.bold};
  color: ${theme.colors.darkBlue};
  text-align: center;
  margin: 20px;
`;

const RequestCard = styled.TouchableOpacity`
  padding: 15px;
  margin: 10px 20px;
  background-color: ${theme.colors.white};
  border-radius: 10px;
  shadow-color: #000;
  shadow-offset: 0 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  elevation: 5;
`;

const RequestText = styled.Text`
  font-size: 18px;
  font-family: ${theme.fonts.medium};
  color: ${theme.colors.black};
`;

const DriverRequestsScreen = () => {
  const [requests, setRequests] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    // Simulación de datos. Reemplaza con tu API o Firebase
    setRequests([
      {
        id: "1",
        user: "Usuario 1",
        distance: "2.5 km",
        destination: "Calle Principal 123",
        fare: "€8.00",
      },
      {
        id: "2",
        user: "Usuario 2",
        distance: "5 km",
        destination: "Avenida Central 456",
        fare: "€12.50",
      },
    ]);
  }, []);

  const handleRequestPress = (request) => {
    Alert.alert(
      "Solicitud Seleccionada",
      `Has seleccionado la solicitud de ${request.user}.`,
      [
        {
          text: "Aceptar",
          onPress: () => navigation.navigate("DriverTripdescriptionScreen", { request }),
        },
        { text: "Cancelar", style: "cancel" },
      ]
    );
  };

  return (
    <Container>
      <Title>Solicitudes Disponibles</Title>
      <FlatList
        data={requests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RequestCard onPress={() => handleRequestPress(item)}>
            <RequestText>Usuario: {item.user}</RequestText>
            <RequestText>Distancia: {item.distance}</RequestText>
            <RequestText>Destino: {item.destination}</RequestText>
            <RequestText>Tarifa: {item.fare}</RequestText>
          </RequestCard>
        )}
      />
    </Container>
  );
};

export default DriverRequestsScreen;
