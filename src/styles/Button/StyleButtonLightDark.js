import styled from "styled-components/native";

export const ThemeButton = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: ${(props) => props.theme.colors.primary};
  align-items: center;
  justify-content: center;
  shadow-color: ${(props) => props.theme.colors.shadow};
  shadow-offset: 0px 2px; /* ✅ Corregido */
  shadow-opacity: 0.3;
  shadow-radius: 2px;
  elevation: 5;
  flex-direction: row;
  padding: 5px;
`;

export const PrimaryButton = styled.TouchableOpacity`
  padding: 12px 20px;
  border-radius: ${(props) => props.theme.borderRadius.medium};
  background-color: ${(props) => props.theme.colors.primary};
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  color: ${(props) => props.theme.colors.buttonText};
  font-size: ${(props) => props.theme.spacing.medium};
  font-family: ${(props) => props.theme.fonts.bold};
  margin-left: 8px;
`;
