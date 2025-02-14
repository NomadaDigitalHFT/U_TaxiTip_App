import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme?.colors?.background || "#FFF"}; /* ✅ Agregado fallback */
  padding: ${(props) =>
    typeof props.theme?.spacing?.medium === "number"
      ? `${props.theme.spacing.medium}px`
      : "16px"}; /* ✅ Evita errores */
`;

export const Card = styled.View`
  background-color: ${(props) => props.theme?.colors?.card || "#FFF"}; /* ✅ Fallback */
  padding: ${(props) =>
    typeof props.theme?.spacing?.large === "number"
      ? `${props.theme.spacing.large}px`
      : "24px"}; /* ✅ Corrección */
  border-radius: ${(props) =>
    typeof props.theme?.borderRadius?.large === "number"
      ? `${props.theme.borderRadius.large}px`
      : "12px"}; /* ✅ Evita errores */
  width: 90%;
  max-width: 400px;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 10px
    ${(props) => props.theme?.colors?.shadow || "rgba(0,0,0,0.1)"}; /* ✅ Fallback */
  elevation: 8; /* Para dispositivos Android */
`;

export const Title = styled.Text`
  font-size: 22px;
  font-family: ${(props) => props.theme?.fonts?.bold || "System"}; /* ✅ Corrección */
  margin-bottom: ${(props) =>
    typeof props.theme?.spacing?.medium === "number"
      ? `${props.theme.spacing.medium}px`
      : "16px"}; /* ✅ Evita errores */
  text-align: center;
  color: ${(props) => props.theme?.colors?.text || "#000"}; /* ✅ Fallback */
`;

export const StyledText = styled.Text`
  font-size: 16px;
  margin-top: 5px;
  margin-bottom: 5px;
  text-align: center;
  color: ${(props) => props.theme?.colors?.textSecondary || "#666"}; /* ✅ Fallback */
`;
