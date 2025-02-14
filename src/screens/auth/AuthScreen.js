import React, { useState } from "react";
import { ActivityIndicator } from "react-native";
import {
  Container,
  Title,
  Input,
  StyledButton,
  ButtonText,
  SwitchButton,
  SwitchButtonText,
} from "./../../styles/StyleAuhtUser"; // Importamos los estilos

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "./../../firebase/firebaseConfig";
import Alertas from "./../../elements/Alertas/Alertas"; // Componente de alertas

const AuthScreen = ({ navigation }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [alertVisible, setAlertVisible] = useState(false);

  // Función para mostrar alertas
  const showAlert = (message, type = "success") => {
    setAlertMessage(message);
    setAlertType(type);
    setAlertVisible(true);
  };

  const closeAlert = () => setAlertVisible(false);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const validateInputs = () => {
    const { email, password, confirmPassword, name, lastName, phone } = formData;

    if (!email || !password) {
      showAlert("Todos los campos son obligatorios.", "error");
      return false;
    }

    if (!isLogin && password.length < 6) {
      showAlert("La contraseña debe tener al menos 6 caracteres.", "error");
      return false;
    }

    if (!isLogin && password !== confirmPassword) {
      showAlert("Las contraseñas no coinciden.", "error");
      return false;
    }

    if (!isLogin && (!name || !lastName || !phone)) {
      showAlert("Todos los campos de usuario son obligatorios.", "error");
      return false;
    }

    return true;
  };

  const handleAuth = async () => {
    if (!validateInputs()) return;

    setIsLoading(true);
    const { email, password, confirmPassword, ...profileData } = formData;

    try {
      if (isLogin) {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        showAlert("Has iniciado sesión correctamente.", "success");
        navigation.navigate("UserNavigator");
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, "usuarios", userCredential.user.uid), {
          ...profileData,
          email,
          createdAt: new Date().toISOString(),
        });
        showAlert("Tu cuenta ha sido creada con éxito.", "success");
        navigation.navigate("UserNavigator");
      }
    } catch (error) {
      console.error("Error en autenticación:", error);
      let errorMessage = "Ocurrió un error inesperado.";

      if (error.code === "auth/email-already-in-use") {
        errorMessage = "Este correo ya está registrado.";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "La contraseña debe tener al menos 6 caracteres.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "El correo electrónico no es válido.";
      } else if (error.code === "auth/user-not-found") {
        errorMessage = "No se encontró una cuenta con este correo.";
      } else if (error.code === "auth/wrong-password") {
        errorMessage = "La contraseña es incorrecta.";
      }

      showAlert(errorMessage, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      {/* Componente de Alertas */}
      <Alertas
        message={alertMessage}
        type={alertType}
        visible={alertVisible}
        onClose={closeAlert}
      />

      <Title>{isLogin ? "Iniciar Sesión" : "Registro como Usuario"}</Title>

      {!isLogin && (
        <>
          <Input placeholder="Nombre" value={formData.name} onChangeText={(value) => handleInputChange("name", value)} />
          <Input placeholder="Apellidos" value={formData.lastName} onChangeText={(value) => handleInputChange("lastName", value)} />
          <Input placeholder="Teléfono" value={formData.phone} keyboardType="phone-pad" onChangeText={(value) => handleInputChange("phone", value)} />
        </>
      )}

      <Input placeholder="Correo Electrónico" value={formData.email} onChangeText={(value) => handleInputChange("email", value)} keyboardType="email-address" />
      <Input placeholder="Contraseña" value={formData.password} onChangeText={(value) => handleInputChange("password", value)} secureTextEntry />
      {!isLogin && <Input placeholder="Confirmar Contraseña" value={formData.confirmPassword} onChangeText={(value) => handleInputChange("confirmPassword", value)} secureTextEntry />}

      {isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : (
        <StyledButton onPress={handleAuth}>
          <ButtonText>{isLogin ? "Entrar" : "Registrarse"}</ButtonText>
        </StyledButton>
      )}

      <SwitchButton onPress={() => setIsLogin(!isLogin)}>
        <SwitchButtonText>{isLogin ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}</SwitchButtonText>
      </SwitchButton>
    </Container>
  );
};

export default AuthScreen;
