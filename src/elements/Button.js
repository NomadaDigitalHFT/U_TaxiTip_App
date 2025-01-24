/* Archivo: Button.js */
import React from "react";
import styled from "styled-components/native";
import theme from "../styles/theme";

const StyledButton = styled.TouchableOpacity`
  background-color: ${({ disabled }) => (disabled ? theme.colors.lightGray : theme.colors.mediumBlue)};
  padding: 15px;
  border-radius: 8px;
  margin: 5px 0;
  align-items: center;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
`;

const ButtonText = styled.Text`
  color: ${({ disabled }) => (disabled ? theme.colors.gray : theme.colors.white)};
  font-size: 16px;
  font-family: ${theme.fonts.bold};
`;

const Button = ({ children, onPress, disabled = false }) => {
  return (
    <StyledButton onPress={!disabled ? onPress : null} disabled={disabled}>
      <ButtonText disabled={disabled}>{children}</ButtonText>
    </StyledButton>
  );
};

export default Button;

