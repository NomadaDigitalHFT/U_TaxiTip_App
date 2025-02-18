import React from "react";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  Container,
  Title,
  Subtitle,
  StyledButton,
  ButtonText,
  SwitchButton,
  SwitchButtonText
} from "./../../styles/StyleWelcomeUser";  // Importamos los estilos actualizados

const WelcomeScreen = () => {
  const navigation = useNavigation();

  const handleNavigation = (role) => {
    navigation.navigate("AuthNavigator", { role });
  };

  return (
    <Container>
      <Image source={require("./../../../assets/Moneda_taxitip.png")} style={{ width: 100, height: 100, borderRadius: 50, margin: 20 }} />
      <Title>¡Bienvenido a TaxiTip!</Title>
   

      <StyledButton onPress={() => handleNavigation("usuario")}>
        <ButtonText>Usuario</ButtonText>
      </StyledButton>

 
    </Container>
  );
};

export default WelcomeScreen;




