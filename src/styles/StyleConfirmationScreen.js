import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  padding: 20px;
`;

export const Card = styled.View`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  align-items: center;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  elevation: 5;
`;

export const Title = styled.Text`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const StyledText = styled.Text`
  font-size: 16px;
  margin-top: 5px;
  margin-bottom: 5px;
  text-align: center;
`;

export const Button = styled.TouchableOpacity`
  width: 100%;
  padding: 15px;
  border-radius: 8px;
  margin-top: 10px;
  align-items: center;
`;


export const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;
