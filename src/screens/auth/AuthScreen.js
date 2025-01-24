import React, { useState } from "react";
import styled from "styled-components/native";
import {
  View,
  TextInput,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";
import { auth, db } from "../../firebase/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";

const AuthScreen = ({ navigation, route }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const role = route?.params?.role;

  if (!role) {
    Alert.alert("Error crítico", "El rol no está definido. Por favor, regresa e inténtalo de nuevo.");
    navigation.goBack();
    return null;
  }

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setPassword("");
    setConfirmPassword("");
  };

  const validateInputs = () => {
    if (!email || !password) {
      Alert.alert("Error", "Completa todos los campos.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert("Error", "Correo inválido.");
      return false;
    }
    if (password.length < 6) {
      Alert.alert("Error", "La contraseña debe tener al menos 6 caracteres.");
      return false;
    }
    if (!isLogin && password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return false;
    }
    return true;
  };

  const handleAuth = async () => {
    if (!validateInputs()) return;

    setIsLoading(true);
    try {
      if (isLogin) {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
        if (userDoc.exists() && userDoc.data().role === role) {
          navigation.navigate(role === "usuario" ? "UserNavigator" : "DriverNavigator");
        } else {
          throw new Error("Acceso denegado para este rol.");
        }
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, "users", userCredential.user.uid), { email, role });
        Alert.alert("Éxito", "Registro completado. Ahora puedes iniciar sesión.");
        toggleAuthMode();
      }
    } catch (error) {
      const errorMessage =
        error.code === "auth/email-already-in-use"
          ? "El correo ya está en uso."
          : error.code === "auth/user-not-found"
          ? "Usuario no encontrado."
          : error.code === "auth/wrong-password"
          ? "Contraseña incorrecta."
          : error.message || "Error inesperado.";
      Alert.alert("Error", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Title>{isLogin ? "Iniciar Sesión" : "Registro"} como {role === "usuario" ? "Usuario" : "Conductor"}</Title>
      <Input
        placeholder="Correo Electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <Input
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {!isLogin && (
        <Input
          placeholder="Confirmar Contraseña"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
      )}
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
          
        <Button title={isLogin ? "Entrar" : "Registrarse"} onPress={handleAuth} />
      )}
      <Button
        title={isLogin ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}
        onPress={toggleAuthMode}
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

export default AuthScreen;



