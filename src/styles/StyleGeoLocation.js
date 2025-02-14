import styled from "styled-components/native";

// Usamos props.theme para los colores, fuentes, espaciados y bordes
export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme?.colors?.background || "#FFF"};  /* ✅ Fondo con fallback */
`;

export const MapContainer = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-family: ${({ theme }) => theme?.fonts?.bold || "System"}; /* ✅ Fallback a "System" */
  color: ${({ theme }) => theme?.colors?.primary || "#000"}; /* ✅ Fallback a negro */
  text-align: center;
  margin: ${({ theme }) => (typeof theme?.spacing?.small === "number" ? `${theme.spacing.small}px` : "8px")}; /* ✅ Evitar errores */
`;

export const InputContainer = styled.View`
  position: absolute;
  bottom: 20px;
  width: 90%;
  background-color: ${(props) => props.theme?.colors?.card || "#FFF"}; /* ✅ Fondo con fallback */
  padding: ${(props) => (typeof props.theme?.spacing?.medium === "number" ? `${props.theme.spacing.medium}px` : "16px")}; /* ✅ Evitar errores */
  border-radius: ${(props) => (typeof props.theme?.borderRadius?.medium === "number" ? `${props.theme.borderRadius.medium}px` : "8px")}; /* ✅ Evitar errores */
`;
