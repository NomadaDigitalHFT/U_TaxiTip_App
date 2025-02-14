import React from "react";
import styled from "styled-components/native";
import { ActivityIndicator } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "styled-components/native"; // Importa useTheme para obtener el tema correctamente

// Función para obtener el color según el tipo de botón
const getColor = (theme, type, disabled) => {
  if (disabled) return theme.colors?.lightGray || "#D3D3D3";
  switch (type) {
    case "success":
      return theme.colors?.lightGreen || "#90EE90";
    case "danger":
      return theme.colors?.lightRed || "#FF7F7F";
    case "warning":
      return theme.colors?.lightOrange || "#FFA500";
    case "primary":
    default:
      return theme.colors?.mediumBlue || "#0000CD";
  }
};

// Estilo del botón
const StyledButton = styled.TouchableOpacity`
  background-color: ${({ theme, type, disabled }) => getColor(theme, type, disabled)};
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
  color: ${({ theme, disabled }) => (disabled ? theme.colors?.gray || "#B0B0B0" : theme.colors?.white || "#FFF")};
  font-size: 16px;
  font-family: ${({ theme }) => theme?.fonts?.bold || "sans-serif"};
  margin-left: ${({ hasIcon }) => (hasIcon ? "8px" : "0")};
`;

// Componente del botón reutilizable
const Button = ({ children, onPress, disabled = false, type = "primary", icon = null, loading = false }) => {
  const theme = useTheme(); // Obtiene el tema actual correctamente desde ThemeProvider

  return (
    <StyledButton onPress={!disabled ? onPress : null} disabled={disabled} type={type} activeOpacity={0.7}>
      {loading ? (
        <ActivityIndicator color={theme.colors?.white || "#FFF"} />
      ) : (
        <>
          {icon && <MaterialIcons name={icon} size={20} color={theme.colors?.white || "#FFF"} />}
          <ButtonText hasIcon={!!icon} disabled={disabled}>{children}</ButtonText>
        </>
      )}
    </StyledButton>
  );
};

export default Button;
