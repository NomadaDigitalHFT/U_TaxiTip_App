import styled from 'styled-components/native';

// Usamos props.theme para los colores, fuentes, espaciados, y bordes
export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${(props) => (typeof props.theme?.spacing?.medium === 'number' ? `${props.theme.spacing.medium}px` : '16px')}; /* ✅ Corrección: Asegurar que el valor sea una string con unidad válida */
`;

export const Title = styled.Text`
  font-size: 22px;
  font-family: ${(props) => props.theme?.fonts?.bold || 'System'}; /* ✅ Corrección: Usar font-family en vez de font-weight */
  margin-bottom: ${(props) => (typeof props.theme?.spacing?.small === 'number' ? `${props.theme.spacing.small}px` : '8px')}; /* ✅ Corrección: Asegurar unidad */
  color: ${(props) => props.theme?.colors?.primary || '#000'}; /* ✅ Corrección: Añadir fallback */
`;

export const StyledText = styled.Text`
  font-size: 16px;
  margin-bottom: ${(props) => (typeof props.theme?.spacing?.small === 'number' ? `${props.theme.spacing.small}px` : '8px')}; /* ✅ Corrección */
  color: ${(props) => props.theme?.colors?.textSecondary || '#666'}; /* ✅ Corrección */
`;

