import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  padding: ${(props) => props.theme.spacing.medium};
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.background};
`;

export const Card = styled.View`
  background-color: ${(props) => props.theme.colors.card};
  padding: ${(props) => props.theme.spacing.large};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  width: 90%;
  max-width: 400px;
  align-items: center;
  box-shadow: 0px 4px 10px ${(props) => props.theme.colors.shadow};
  elevation: 5;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: ${(props) => props.theme.spacing.medium};
`;

export const StyledText = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme.colors.textSecondary};
  margin-top: 5px;
  margin-bottom: 5px;
  text-align: center;
`;
