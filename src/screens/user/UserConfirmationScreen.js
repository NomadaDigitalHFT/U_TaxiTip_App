import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ButtonCancelCards from "./../../elements/buttonCancelCards";

const ConfirmationScreen = ({ route, navigation }) => {
  const { userName, userAddress } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Genial, {userName}!</Text>
      <Text style={styles.subtitle}>Estas UserConfirmationScreen:</Text>
      <Text style={styles.address}>{userAddress}</Text>
      <ButtonCancelCards />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 18,
    marginTop: 10,
  },
  address: {
    fontSize: 16,
    marginTop: 5,
    fontStyle: "italic",
  },
});

export default ConfirmationScreen;




/*

Primero tenemos que hacer que el boton de cofirmar Ubicación funcione y guarde la información
en Firestore database en la coleccion llamada userCars y el documento con el id del usuario.

id: U6cXAw1NEVSF6vwoKMOrjyM7qTu1
createdAt
"2025-01-29T14:25:37.270Z"
(cadena)
name
"user05"
phone
"658996587"
mas la geolocalizacion que que recogimos en GeoLocationScreen.js  todo esto compone una cards. se entiende? 

En este punto venimos desde GeoLocationscreen y y jemos reunido la informacion deu Usuario asi que le mostraremos en pantalla un ¡Genial ${nombre}! vamos a buscar tu Taxi mas cercano.
debajo pordemos colocar su direccion de recojida y debajo un boton de Buscar Taxi. .. esto nos servira en un siguiente paso para buscar un taxi cercano y crear la cards en el GalleryCard.js que verá el conductor.







*/