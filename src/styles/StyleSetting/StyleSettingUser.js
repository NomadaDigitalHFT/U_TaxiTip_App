import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const ProfileImage = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  margin-bottom: 20px;
`;

export const UserInfo = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme.colors.text}; /* Se corrigió de textPrimary a text */ 
  margin-bottom: 5px;
  font-family: ${(props) => props.theme.fonts.regular};
`;
