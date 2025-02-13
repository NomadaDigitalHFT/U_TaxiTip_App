import styled from "styled-components/native";
import theme from "./theme";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.lightBlue};
`;

const MapContainer = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
`;

const Title = styled.Text`
  font-size: 24px;
  font-family: ${theme.fonts.bold};
  color: ${theme.colors.darkBlue};
  text-align: center;
  margin: 10px;
`;

const InputContainer = styled.View`
  position: absolute;
  bottom: 20px;
  width: 90%;
  background-color: white;
  padding: 10px;
  border-radius: 10px;
`;

export { Container, MapContainer, Title, InputContainer };
