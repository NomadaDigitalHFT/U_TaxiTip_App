import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  padding: ${(props) => props.theme.spacing.medium};
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.background};
`;

export const Title = styled.Text`
  font-size: 24px;
  color: ${({ theme }) => theme?.colors?.text || "#000"}; /* Fallback si theme no está definido */
  font-family: ${({ theme }) => theme?.fonts?.bold || "System"}; /* "System" para mejor compatibilidad */
  margin-bottom: ${({ theme }) => theme?.spacing?.medium || "16px"}; /* Espaciado con fallback */
`;
export const Button = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.primary};
  padding: ${(props) => props.theme.spacing.medium};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  color: ${(props) => props.theme?.colors?.white || "#FFF"}; /* Fallback si theme no está definido */
  font-family: ${(props) => props.theme?.fonts?.bold || "System"}; /* Fallback a "System" para mejor compatibilidad */
  font-size: 16px;
`;

export const ErrorText = styled.Text`
  color: ${(props) => props.theme?.colors?.error || "#FF0000"}; /* Fallback a rojo en caso de error */
  font-size: 12px;
  font-family: ${(props) => props.theme?.fonts?.regular || "System"}; /* Fallback a "System" */
  margin-top: 5px;
`;
