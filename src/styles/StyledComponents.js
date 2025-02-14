import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
  padding: ${(props) => props.theme.spacing.medium};
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  color: ${(props) => props.theme.colors.text};
  font-size: 24px;
  font-weight: bold;
`;

export const Button = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.primary};
  padding: ${(props) => props.theme.spacing.medium};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;
