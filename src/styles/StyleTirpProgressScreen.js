import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme?.colors?.background || "#121212"}; 
  padding: ${(props) =>
    typeof props.theme?.spacing?.medium === "number"
      ? `${props.theme.spacing.medium}px`
      : "16px"}; /* ✅ Corrección eliminando pxpx */
`;

export const Card = styled.View`
  background-color: ${(props) => props.theme?.colors?.card || "#1E1E1E"}; 
  padding: ${(props) =>
    typeof props.theme?.spacing?.large === "number"
      ? `${props.theme.spacing.large}px`
      : "24px"}; /* ✅ Evita error similar */
  border-radius: ${(props) =>
    typeof props.theme?.borderRadius?.large === "number"
      ? `${props.theme.borderRadius.large}px`
      : "12px"}; /* ✅ Corrección extra */
  width: 90%;
  max-width: 400px;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 10px
    ${(props) => props.theme?.colors?.shadow || "rgba(255,255,255,0.1)"};
  elevation: 8;
`;

export const Title = styled.Text`
  font-size: 22px;
  font-family: ${(props) => props.theme?.fonts?.bold || "System"};
  margin-bottom: ${(props) =>
    typeof props.theme?.spacing?.medium === "number"
      ? `${props.theme.spacing.medium}px`
      : "16px"}; /* ✅ Misma corrección */
  text-align: center;
  color: ${(props) => props.theme?.colors?.text || "#FFFFFF"};
`;

export const StyledText = styled.Text`
  font-size: 16px;
  margin-top: 5px;
  margin-bottom: 5px;
  text-align: center;
  color: ${(props) => props.theme?.colors?.textSecondary || "#B0B0B0"};
`;
