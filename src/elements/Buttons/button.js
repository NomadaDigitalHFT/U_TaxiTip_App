import React from "react";
import styled from "styled-components/native";
import theme from "./../../styles/theme";
import { ActivityIndicator } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

// Función para obtener el color según el tipo de botón
const getColor = (type, disabled) => {
  if (disabled) return theme.colors.lightGray;
  switch (type) {
    case "success":
      return theme.colors.lightGreen;
    case "danger":
      return theme.colors.lightRed;
    case "warning":
      return theme.colors.lightOrange;
    case "primary":
    default:
      return theme.colors.mediumBlue;
  }
};

// Estilo del botón
const StyledButton = styled.TouchableOpacity`
  background-color: ${({ type, disabled }) => getColor(type, disabled)};
  padding: 15px;
  width: 60%;
  border-radius: 8px;
  margin: 5px 0;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
`;

// **Definir ButtonText aquí**
const ButtonText = styled.Text`
  color: ${({ disabled }) => (disabled ? theme.colors.gray : theme.colors.white)};
  font-size: 16px;
  font-family: ${theme.fonts.bold};
  margin-left: ${({ hasIcon }) => (hasIcon ? "8px" : "0")};
`;

// Componente del botón reutilizable
const Button = ({ children, onPress, disabled = false, type = "primary", icon = null, loading = false }) => {
  return (
    <StyledButton onPress={!disabled ? onPress : null} disabled={disabled} type={type} activeOpacity={0.7}>
      {loading ? (
        <ActivityIndicator color={theme.colors.white} />
      ) : (
        <>
          {icon && <MaterialIcons name={icon} size={20} color={theme.colors.white} />}
          <ButtonText hasIcon={!!icon} disabled={disabled}>{children}</ButtonText>
        </>
      )}
    </StyledButton>
  );
};

export default Button;

