import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import UserFooter from './../../components/common/UserFooter';

const Container = styled.View`
  flex: 1;
  background-color: #f2f2f2;
  justify-content: center;
  align-items: center;
`;

const WelcomeText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const ActionText = styled.Text`
  font-size: 16px;
  margin-bottom: 20px;
`;

const SearchButton = styled.TouchableOpacity`
  background-color: #007bff;
  padding: 15px;
  border-radius: 10px;
`;

const SearchButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
`;

const UserHomeScreen = () => {
  const [searching, setSearching] = useState(false);
  const navigation = useNavigation();

  const searchTaxi = () => {
    setSearching(true);
    setTimeout(() => {
      setSearching(false);
      Alert.alert('Taxi Encontrado', 'Tu taxi está en camino. ¡Prepárate!');
      navigation.navigate('ConfirmationScreen');
    }, 3000);
  };

  return (
    <Container>
      {/* Main Content */}
      <WelcomeText>¡Hola, Juan!</WelcomeText>
      <ActionText>¿Necesitas un taxi?</ActionText>
      {searching ? (
        <ActionText>Buscando tu taxi...</ActionText>
      ) : (
        <SearchButton onPress={searchTaxi}>
          <SearchButtonText>Buscar Taxi</SearchButtonText>
        </SearchButton>
      )}

      {/* Footer */}
      <UserFooter />
    </Container>
  );
};

export default UserHomeScreen;
