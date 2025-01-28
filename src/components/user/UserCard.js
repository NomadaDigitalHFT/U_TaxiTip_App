import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const UserCard = ({ tripDetails, onCancel, onSearch }) => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.title}>Detalles del Viaje</Text>
      <Text style={styles.info}>Nº Ticket: {tripDetails.ticketNumber}</Text>
      <Text style={styles.info}>Nombre: {tripDetails.name}</Text>
      <Text style={styles.info}>Licencia: {tripDetails.license}</Text>
      <Text style={styles.info}>Teléfono: {tripDetails.phone}</Text>
      <Text style={styles.info}>Distancia: {tripDetails.distance} km</Text>
      <Text style={styles.info}>Aprox. Tip: €{tripDetails.price}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          <Text style={styles.buttonText}>Cancelar Viaje</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.searchButton} onPress={onSearch}>
          <Text style={styles.buttonText}>Busca mi Taxi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
  },
  searchButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default UserCard;













/*
UserCard.js aqui podemos colocar la informacion que cera el usuario una vez el conductor aya aceptado su viaje. 
Nº ticke 00125
nombre: Carlos 
licencia: 1254
telefono: +34 123 456 789
distancia: km
aprox Tip: €  (este precio va a variar ya que la posicion del Taxi se actualiza en tiempo real) y se fija cuando el conductor acepta el viaje.)
esta informacion se muestra abajo utilizando un 1/4 de la pantalla

y en la otra 3/4 se muestra el mapa con los puntos de conductor y pasajero
*/ 