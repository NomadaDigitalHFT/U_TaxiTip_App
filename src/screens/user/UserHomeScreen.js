import React, { useEffect, useState } from "react";
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import UserFooter from './../../components/common/UserFooter';
import { ActivityIndicator } from "react-native";


const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const WelcomeText = styled.Text`
  font-size: 26px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
  color: #333;
`;

const ActionText = styled.Text`
  font-size: 18px;
  color: #666;
  text-align: center;
  margin-bottom: 20px;
`;

const SearchButton = styled.TouchableOpacity`
  background-color: #007bff;
  padding: 15px 20px;
  border-radius: 12px;
  shadow-color: #000;
  shadow-offset: 0px 2px;  /* Corrección aquí */
  shadow-opacity: 0.2;
  shadow-radius: 3.84px;
  elevation: 5;
  width: 80%;
  align-items: center;
`;


const SearchButtonText = styled.Text`
  color: #ffffff;
  font-size: 18px;
  font-weight: bold;
`;

const UserHomeScreen = () => {
  const [searching, setSearching] = useState(false);
  const [userName, setUserName] = useState("Usuario");
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserName = async () => {
      const auth = getAuth();
      const db = getFirestore();
      const user = auth.currentUser;

      if (user) {
        try {
          const userRef = doc(db, "usuarios", user.uid);
          const userSnap = await getDoc(userRef);
          
          if (userSnap.exists()) {
            setUserName(userSnap.data().name || "Usuario");
          }
        } catch (error) {
          console.error("Error obteniendo datos del usuario:", error);
        }
      }
    };

    fetchUserName();
  }, []);

  const searchTaxi = () => {
    setSearching(true);
    setTimeout(() => {
      setSearching(false);
      navigation.navigate('UserGeoLocationScreen');
    }, 2000); // Simula un pequeño tiempo de espera
  };

  return (
    <Container>
     
      <WelcomeText>¡Hola, {userName}!</WelcomeText>
      <ActionText>¿Necesitas un taxi?</ActionText>
      
      {searching ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <SearchButton onPress={searchTaxi}>
          <SearchButtonText>Buscar Taxi</SearchButtonText>
        </SearchButton>
      )}

      <UserFooter />
    </Container>
  );
};

export default UserHomeScreen;
