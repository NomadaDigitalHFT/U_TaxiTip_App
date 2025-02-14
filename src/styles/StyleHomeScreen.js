import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme?.colors?.background || "#FFF"};
  justify-content: center;
  align-items: center;
  padding: ${(props) => (typeof props.theme?.spacing?.medium === "number" ? `${props.theme.spacing.medium}px` : "16px")}; /* ✅ Solución */
`;

export const WelcomeText = styled.Text`
  font-size: 26px;
  font-family: ${(props) => props.theme?.fonts?.bold || "System"};
  text-align: center;
  margin-bottom: ${(props) => (typeof props.theme?.spacing?.small === "number" ? `${props.theme.spacing.small}px` : "8px")}; /* ✅ Corrección */
  color: ${(props) => props.theme?.colors?.primary || "#000"};
`;

export const ActionText = styled.Text`
  font-size: 18px;
  color: ${(props) => props.theme?.colors?.textSecondary || "#666"};
  text-align: center;
  margin-bottom: ${(props) => (typeof props.theme?.spacing?.large === "number" ? `${props.theme.spacing.large}px` : "24px")}; /* ✅ Evita errores */
`;

export const SearchButton = styled.TouchableOpacity`
  background-color: ${(props) => props.theme?.colors?.primary || "#1565D6"};
  padding: 15px;
  border-radius: ${(props) => (typeof props.theme?.borderRadius?.medium === 'number' ? `${props.theme.borderRadius.medium}px` : "8px")}; /* ✅ Solución */
  align-items: center;
`;

export const SearchButtonText = styled.Text`
  color: ${(props) => props.theme?.colors?.white || "#FFF"};
  font-size: 18px;
  font-family: ${(props) => props.theme?.fonts?.bold || "System"};
`;
