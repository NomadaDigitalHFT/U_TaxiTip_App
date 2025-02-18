import styled from "styled-components/native";

// Contenedor principal
export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.background}; /* ✅ Modo oscuro/claro */
  padding: ${(props) =>
    typeof props.theme?.spacing?.medium === "number"
      ? `${props.theme.spacing.medium}px`
      : "16px"};
`;

// Estilo para el nombre del conductor
export const DriverName = styled.Text`
  font-size: 20px;
  font-family: ${(props) => props.theme?.fonts?.bold || "System"};
  color: ${(props) => props.theme?.colors?.text || "#FFFFFF"};
  margin-bottom: ${(props) =>
    typeof props.theme?.spacing?.small === "number"
      ? `${props.theme.spacing.small}px`
      : "8px"};
`;

// Texto general
export const StyledText = styled.Text`
  font-size: 16px;
  margin-bottom: ${(props) =>
    typeof props.theme?.spacing?.small === "number"
      ? `${props.theme.spacing.small}px`
      : "8px"};
  color: ${(props) => props.theme?.colors?.textSecondary || "#666"};
`;

// 🔥 Círculo con el precio
export const PriceCircle = styled.View`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  background-color: ${(props) => props.theme.colors.accent}; /* ✅ Usa el color dinámico del tema */
  justify-content: center;
  align-items: center;
  margin-bottom: ${(props) =>
    typeof props.theme?.spacing?.large === "number"
      ? `${props.theme.spacing.large}px`
      : "24px"};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  elevation: 8;
`;

// 🔥 Texto dentro del círculo (100% blanco para mejor visibilidad)
export const PriceText  = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #FFFFFF; /* ✅ Ahora 100% blanco */
  text-align: center;
`;
