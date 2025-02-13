/* Archivo: Alertas.js */
import React, { useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import styled from "styled-components/native";
import theme from "./../../styles/theme"; // Corrige la ruta del theme si es necesario
import { TouchableOpacity } from "react-native";
import { XCircle } from "lucide-react-native"; // Asegúrate de tener instalada la dependencia

const Alertas = ({ message, type = "success", visible = false, onClose }) => {
  // Se definen dos valores compartidos para la animación:
  // - translateY: para mover la alerta verticalmente
  // - opacity: para lograr el efecto de desvanecimiento
  const translateY = useSharedValue(-200);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      // Animación de entrada: baja la alerta hasta su posición (translateY: 0) y aumenta la opacidad (0 -> 1)
      translateY.value = withTiming(0, { duration: 500 });
      opacity.value = withTiming(1, { duration: 500 });

      // Ocultar la alerta automáticamente después de 3 segundos
      const timer = setTimeout(() => {
        // Animación de salida: se sube la alerta y se desvanece
        translateY.value = withTiming(-200, { duration: 500 });
        opacity.value = withTiming(0, { duration: 500 });
        onClose && onClose();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [visible, onClose, opacity, translateY]);

  // Se combinan las animaciones de traslación y opacidad
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  // Función que retorna el color de fondo según el tipo de alerta
  const getBackgroundColor = () => {
    switch (type) {
      case "success":
        return theme.colors.lightGreen;
      case "error":
        return theme.colors.lightRed;
      case "warning":
        return theme.colors.lightOrange;
      default:
        return theme.colors.mediumBlue;
    }
  };

  return (
    <AlertContainer
      style={[animatedStyle, { backgroundColor: getBackgroundColor() }]}
    >
      <AlertText>{message}</AlertText>
      <CloseButton onPress={onClose}>
        <XCircle size={20} color={theme.colors.white} />
      </CloseButton>
    </AlertContainer>
  );
};

// ==========================
// ESTILOS CON STYLED COMPONENTS
// ==========================
const AlertContainer = styled(Animated.View)`
  position: absolute;
  top: 50%; /* Ubica la alerta en la mitad de la pantalla */
  left: 10px;
  right: 10px;
  padding: 15px;
  border-radius: 20px; /* Esquinas más redondeadas */
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  z-index: 1000;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  elevation: 5;
`;

const AlertText = styled.Text`
  color: ${theme.colors.white};
  font-size: 16px;
  font-family: ${theme.fonts.bold};
  flex: 1;
`;

const CloseButton = styled(TouchableOpacity)`
  margin-left: 10px;
`;

export default Alertas;

