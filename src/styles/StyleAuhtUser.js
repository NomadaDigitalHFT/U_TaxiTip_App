import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.background};
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 20px;
`;

export const Input = styled.TextInput`
  width: 100%;
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.inputBorder};
  padding: 12px;
  margin-bottom: 15px;
  border-radius: 8px;
  font-size: 16px;
  background-color: ${(props) => props.theme.colors.inputBackground};  /* ✅ Fondo más visible */
  color: ${(props) => props.theme.colors.inputText};  /* ✅ Texto visible */
  placeholderTextColor: ${(props) => props.theme.colors.placeholder || "#B0B0B0"};  /* 🔥 Color más claro */
`;

export const StyledButton = styled.TouchableOpacity`
  width: 100%;
  background-color: ${(props) => props.theme.colors.primary};
  padding: 15px;
  border-radius: 8px;
  align-items: center;
  margin-top: 10px;
`;

export const ButtonText = styled.Text`
  color: ${(props) => props.theme.colors.buttonText};
  font-size: 16px;
  font-weight: bold;
`;

export const SwitchButton = styled.TouchableOpacity`
  margin-top: 15px;
`;

export const SwitchButtonText = styled.Text`
  color: ${(props) => props.theme.colors.secondary};
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  text-decoration: underline;
`;
