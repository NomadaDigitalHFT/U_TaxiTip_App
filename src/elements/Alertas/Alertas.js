/* Archivo: Alertas.js */
import React, { useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { XCircle } from "lucide-react-native"; // Asegúrate de tener instalada la dependencia
import { useTheme } from "styled-components/native"; // Para usar el tema dinámico

const Alertas = ({ message, type = "success", visible = false, onClose }) => {
  const translateY = useSharedValue(-200);
  const opacity = useSharedValue(0);
  const theme = useTheme(); // Obtiene el tema activo

  useEffect(() => {
    if (visible) {
      translateY.value = withTiming(0, { duration: 500 });
      opacity.value = withTiming(1, { duration: 500 });

      const timer = setTimeout(() => {
        translateY.value = withTiming(-200, { duration: 500 });
        opacity.value = withTiming(0, { duration: 500 });
        onClose && onClose();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [visible, onClose, opacity, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  const getBackgroundColor = () => {
    switch (type) {
      case "success":
        return theme.colors?.lightGreen || "#4CAF50";
      case "error":
        return theme.colors?.lightRed || "#F44336";
      case "warning":
        return theme.colors?.lightOrange || "#FFC107";
      default:
        return theme.colors?.mediumBlue || "#2196F3";
    }
  };

  return (
    <AlertContainer style={[animatedStyle, { backgroundColor: getBackgroundColor() }]}>
      <AlertText>{message}</AlertText>
      <CloseButton onPress={onClose}>
        <XCircle size={20} color={theme.colors?.white || "#FFF"} />
      </CloseButton>
    </AlertContainer>
  );
};

// ✅ Eliminada la segunda importación de `styled`
const AlertContainer = styled(Animated.View)`
  position: absolute;
  top: 50%;
  left: 10px;
  right: 10px;
  padding: 15px;
  border-radius: 20px;
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
  color: ${(props) => props.theme?.colors?.text || "#FFF"}; /* Usa el color del tema con fallback */
  font-size: 16px;
  font-family: ${(props) => props.theme?.fonts?.bold || "sans-serif"}; /* Usa la fuente del tema */
  flex: 1;
`;

const CloseButton = styled(TouchableOpacity)`
  margin-left: 10px;
`;

// ✅ Ahora exportamos `Alertas` en lugar de `AlertContainer`
export default Alertas;
