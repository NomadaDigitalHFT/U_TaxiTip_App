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
  padding: 25px;
  border-radius: 15px;
  width: 90%;
  max-width: 400px;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  elevation: 8;
`;

export const Title = styled.Text`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 15px;
  text-align: center;
`;

export const StyledText = styled.Text`
  font-size: 16px;
  margin-top: 5px;
  margin-bottom: 5px;
  text-align: center;
`;
