import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import UserFooter from "./../../components/common/UserFooter";
import ButtonLightDark from "./../../elements/Buttons/buttonLightDark";
import { 
  Container, 
  WelcomeText, 
  ActionText, 
  SearchButton, 
  SearchButtonText 
} from "./../../styles/StyleHomeScreen";  

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
      navigation.navigate("UserGeoLocationScreen");
    }, 2000);
  };

  return (
    <Container>
      {/* Botón de cambio de tema */}
      <ButtonLightDark />

      <View>
        <WelcomeText>¡Hola, {userName}!</WelcomeText>
        <ActionText>¿Necesitas un taxi?</ActionText>

        {searching ? (
          <ActivityIndicator size="large" color="#007bff" />
        ) : (
          <SearchButton onPress={searchTaxi}>
            <SearchButtonText>Buscar Taxi</SearchButtonText>
          </SearchButton>
        )}
      </View>

      {/* Footer del usuario */}
      <UserFooter />
    </Container>
  );
};

export default UserHomeScreen;
