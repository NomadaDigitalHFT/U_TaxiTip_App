import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ConfirmationScreen = () => {
  const navigation = useNavigation();

  const handleProceed = () => {
    // Aquí verificamos si GeoLocation está disponible
    navigation.navigate("GeoLocation");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirmación del Servicio</Text>
      <Text style={styles.subtitle}>
        Tu servicio ha sido confirmado exitosamente.
      </Text>
      <Text style={styles.details}>
        Tu conductor llegará en breve. Por favor, espera mientras lo buscamos.
      </Text>
      <Button title="Continuar" onPress={handleProceed} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
    textAlign: "center",
  },
  details: {
    fontSize: 14,
    color: "#777",
    marginBottom: 40,
    textAlign: "center",
  },
});

export default ConfirmationScreen;
