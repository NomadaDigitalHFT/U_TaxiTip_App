import React, { useEffect, useState } from "react";
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
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
  const [userName, setUserName] = useState("Usuario");
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserName = async () => {
      const auth = getAuth();
      const db = getFirestore();
      const user = auth.currentUser;

      if (user) {
        const userRef = doc(db, "usuarios", user.uid);
        const userSnap = await getDoc(userRef);
        
        if (userSnap.exists()) {
          setUserName(userSnap.data().name || "Usuario");
        }
      }
    };

    fetchUserName();
  }, []);

  const searchTaxi = () => {
    navigation.navigate('UserGeoLocationScreen'); // Ahora lleva a la pantalla de geolocalización
  };  

  return (
    <Container>
      {/* Main Content */}
      <WelcomeText>¡Hola, {userName}!</WelcomeText>
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

