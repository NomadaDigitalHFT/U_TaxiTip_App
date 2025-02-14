import React, { useContext } from "react";
import { Text } from "react-native";
import styled from "styled-components/native";
import UserFooter from "./../../../components/common/UserFooter";
import { ThemeContext } from "./../../../context/ThemeContext";  // Asegúrate de importar el contexto

const Container = styled.View`
  flex: 1;
  padding: ${(props) => props.theme.spacing.medium};
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.background};  // Fondo adaptado al tema
`;

const SettingOption = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.primary};
  padding: ${(props) => props.theme.spacing.medium};
  width: 80%;
  border-radius: ${(props) => props.theme.borderRadius.medium};
  align-items: center;
  margin: 10px 0;
`;

const SettingText = styled.Text`
  color: ${(props) => props.theme.colors.white};
  font-size: 16px;
  font-weight: bold;
`;

const UserSettingScreen = () => {
  const { mode, setThemeMode } = useContext(ThemeContext);  // Utiliza el ThemeContext

  return (
    <Container>
      <SettingOption onPress={() => setThemeMode(mode === "dark" ? "light" : "dark")}>
        <SettingText>Cambiar Tema</SettingText>
      </SettingOption>
      <UserFooter /> {/* Asegúrate de que el UserFooter también esté dentro del contexto de tema */}
    </Container>
  );
};

export default UserSettingScreen;
