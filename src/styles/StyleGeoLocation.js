import styled from "styled-components/native";

// Contenedor principal
export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.background || "#FFF"};
`;

export const MapContainer = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-family: ${({ theme }) => theme?.fonts?.bold || "System"};
  color: ${({ theme }) => theme?.colors?.primary || "#000"};
  text-align: center;
  margin: ${({ theme }) => (typeof theme?.spacing?.small === "number" ? `${theme.spacing.small}px` : "8px")};
`;

// Contenedor del Input
export const InputContainer = styled.View`
  position: absolute;
  bottom: 20px;
  width: 90%;
  background-color: ${(props) => props.theme.colors.inputBackground || "#FFF"};
  border: 1px solid ${(props) => props.theme.colors.inputBorder || "#000"}; 
  padding: ${({ theme }) => (typeof theme?.spacing?.medium === "number" ? `${theme.spacing.medium}px` : "16px")};
  border-radius: ${({ theme }) => (typeof theme?.borderRadius?.medium === "number" ? `${theme.borderRadius.medium}px` : "8px")};
`;

// ✅ Aquí se corrige el color del texto y el borde en modo oscuro
export const InputText = styled.TextInput`
  background-color: ${(props) => props.theme.colors.inputBackground};
  color: ${(props) => props.theme.colors.inputText}; 
  border-width: 2px;
  border-color: ${(props) => props.theme.colors.inputBorder}; 
  font-size: 16px;
  padding: 10px;
  width: 100%;
  border-radius: 5px;
  placeholderTextColor: ${(props) => props.theme.colors.textSecondary || "#a6adc8"};
`;
