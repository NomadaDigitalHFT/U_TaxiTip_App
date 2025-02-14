import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${(props) => props.theme.spacing.medium};
  background-color: ${(props) => props.theme.colors.background};
`;

export const Title = styled.Text`
  font-size: 26px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.text};
  text-align: center;
  margin-bottom: ${(props) => props.theme.spacing.medium};
`;

export const Subtitle = styled.Text`
  font-size: 18px;
  color: ${(props) => props.theme.colors.textSecondary};
  text-align: center;
  margin-bottom: ${(props) => props.theme.spacing.large};
`;

export const StyledButton = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.primary};
  padding: ${(props) => props.theme.spacing.medium};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  align-items: center;
  width: 80%;
`;

export const ButtonText = styled.Text`
  color: ${(props) => props.theme.colors.card};
  font-size: 16px;
  font-weight: bold;
`;

export const SwitchButton = styled.TouchableOpacity`
  margin-top: ${(props) => props.theme.spacing.medium};
`;

export const SwitchButtonText = styled.Text`
  color: ${(props) => props.theme.colors.secondary};
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  text-decoration: underline;
`;
