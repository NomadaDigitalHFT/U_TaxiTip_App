import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../contexts/UserContext";
import styled from "styled-components/native";
import theme from "./../styles/theme";

const ButtonEntrar = ({ onPress }) => {
  const navigation = useNavigation();
  const { setUser } = useUser();

  const handlePress = async () => {
    try {
      const user = await onPress();
      if (user) {
        setUser(user);
        navigation.navigate("GeoLocation");
      } else {
        alert("Usuario o contraseña incorrectos.");
      }
    } catch (error) {
      console.error("Error al autenticar:", error.message);
      alert("No se pudo iniciar sesión. Inténtalo de nuevo.");
    }
  };

  return (
    <Button onPress={handlePress}>
      <ButtonText>Entrar</ButtonText>
    </Button>
  );
};

const Button = styled.TouchableOpacity`
  background-color: ${theme.colors.mediumBlue};
  padding: 15px;
  border-radius: 10px;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: ${theme.colors.white};
  font-size: 16px;
  font-family: ${theme.fonts.bold};
`;

export default ButtonEntrar;
