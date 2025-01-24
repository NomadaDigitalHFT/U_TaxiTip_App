import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";

const ReviewScreen = ({ route }) => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = () => {
    if (rating < 0 || rating > 5) {
      Alert.alert("Error", "Por favor ingresa una calificación válida (0-5).");
      return;
    }
    if (!review.trim()) {
      Alert.alert("Error", "Por favor ingresa una reseña.");
      return;
    }

    // Lógica para guardar en Firebase
    console.log("Reseña enviada:", { rating, review });
    Alert.alert("Gracias", "Tu reseña ha sido enviada.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Revisión del Servicio</Text>
      <Text style={styles.subtitle}>
        Por favor, califica tu experiencia.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Escribe tu reseña aquí..."
        value={review}
        onChangeText={setReview}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Calificación (0-5)"
        value={String(rating)}
        onChangeText={(value) => setRating(Number(value))}
        keyboardType="numeric"
        maxLength={1}
      />
      <Button title="Enviar Reseña" onPress={handleSubmit} />
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
    marginBottom: 20,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
});

export default ReviewScreen;

