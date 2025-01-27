import React, { useState } from "react";
import styled from "styled-components/native";
import { Alert, ActivityIndicator } from "react-native";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "./../../firebase/firebaseConfig";

const AuthScreen = ({ navigation, route }) => {
  const { role } = route.params; // "usuario" o "conductor"
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    phone: "",
    dni: "",
    taxiId: "",
    license: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const validateInputs = () => {
    const { email, password, confirmPassword, name, phone } = formData;

    if (!email || !password) {
      Alert.alert("Error", "Todos los campos son obligatorios.");
      return false;
    }

    if (!isLogin && password.length < 6) {
      Alert.alert("Error", "La contraseña debe tener al menos 6 caracteres.");
      return false;
    }

    if (!isLogin && password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return false;
    }

    if (!isLogin && role === "conductor") {
      const { dni, taxiId, license } = formData;
      if (!name || !phone || !dni || !taxiId || !license) {
        Alert.alert("Error", "Todos los campos de conductor son obligatorios.");
        return false;
      }
    }

    if (!isLogin && role === "usuario" && (!name || !phone)) {
      Alert.alert("Error", "Todos los campos de usuario son obligatorios.");
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
        // Lógica para iniciar sesión
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        Alert.alert("Inicio de Sesión", "Has iniciado sesión correctamente.");
        navigation.navigate(role === "usuario" ? "UserNavigator" : "DriverNavigator");
      } else {
        // Lógica para registro
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        // Guardar datos adicionales en Firestore
        await setDoc(doc(db, role === "usuario" ? "usuarios" : "conductores", userCredential.user.uid), {
          ...profileData,
          role,
          email,
          createdAt: new Date().toISOString(),
        });

        Alert.alert("Registro Exitoso", "Tu cuenta ha sido creada.");
        navigation.navigate(role === "usuario" ? "UserNavigator" : "DriverNavigator");
      }
    } catch (error) {
      console.error("Error durante el registro/inicio de sesión:", error);
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
      Alert.alert("Error", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Title>{isLogin ? "Iniciar Sesión" : `Registro como ${role === "usuario" ? "Usuario" : "Conductor"}`}</Title>

      {!isLogin && (
        <>
          <Input
            placeholder="Nombre"
            value={formData.name}
            onChangeText={(value) => handleInputChange("name", value)}
          />
          <Input
            placeholder="Teléfono"
            value={formData.phone}
            onChangeText={(value) => handleInputChange("phone", value)}
            keyboardType="phone-pad"
          />
        </>
      )}
      {role === "conductor" && !isLogin && (
        <>
          <Input
            placeholder="Apellido"
            value={formData.lastName}
            onChangeText={(value) => handleInputChange("lastName", value)}
          />
          <Input
            placeholder="DNI/NIE"
            value={formData.dni}
            onChangeText={(value) => handleInputChange("dni", value)}
          />
          <Input
            placeholder="Número de Carnet de Taxista"
            value={formData.taxiId}
            onChangeText={(value) => handleInputChange("taxiId", value)}
          />
          <Input
            placeholder="Número de Licencia"
            value={formData.license}
            onChangeText={(value) => handleInputChange("license", value)}
          />
        </>
      )}

      <Input
        placeholder="Correo Electrónico"
        value={formData.email}
        onChangeText={(value) => handleInputChange("email", value)}
        keyboardType="email-address"
      />
      <Input
        placeholder="Contraseña"
        value={formData.password}
        onChangeText={(value) => handleInputChange("password", value)}
        secureTextEntry
      />
      {!isLogin && (
        <Input
          placeholder="Confirmar Contraseña"
          value={formData.confirmPassword}
          onChangeText={(value) => handleInputChange("confirmPassword", value)}
          secureTextEntry
        />
      )}

      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title={isLogin ? "Entrar" : "Registrarse"} onPress={handleAuth} />
      )}
      <SwitchButton
        title={isLogin ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}
        onPress={() => setIsLogin(!isLogin)}
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 20px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
`;

const Input = styled.TextInput`
  border-width: 1px;
  border-color: #ccc;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 5px;
`;

const Button = styled.Button``;

const SwitchButton = styled.Button``;

export default AuthScreen;
