import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const FooterContainer = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: ${(props) => props.theme.colors.background}; /* Ahora usa el theme para el fondo */
  border-top-width: 1px;
  border-top-color: ${(props) => props.theme.colors.border}; /* Uso de theme para bordes */
`;

const FooterButton = styled(TouchableOpacity)`
  align-items: center;
  justify-content: center;
`;

const FooterText = styled.Text`
  font-size: 12px;
  color: ${(props) => props.theme.colors.text}; /* Uso del theme para el color del texto */
`;

const Footer = () => {
  const navigation = useNavigation();

  return (
    <FooterContainer>
      {/* Home Button */}
      <FooterButton onPress={() => navigation.navigate('UserHomeScreen')}>
        <Ionicons name="home" size={24} color={props => props.theme.colors.primary} />
        <FooterText>Home</FooterText>
      </FooterButton>

      {/* Action Button (Center) */}
      <FooterButton onPress={() => console.log('Center Action Pressed')}>
        <Ionicons name="add-circle" size={36} color={props => props.theme.colors.primary} />
      </FooterButton>

      {/* Settings Button */}
      <FooterButton onPress={() => navigation.navigate('SettingsScreen')}>
        <Ionicons name="settings" size={24} color={props => props.theme.colors.primary} />
        <FooterText>Configuración</FooterText>
      </FooterButton>
    </FooterContainer>
  );
};

export default Footer;
