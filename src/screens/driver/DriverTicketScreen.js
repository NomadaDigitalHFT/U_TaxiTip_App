import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import DriverFooter from './../../components/common/DriverFooter';

const DriverTicketScreen = ({ route }) => {
  const { ticket } = route.params;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 39.5764915,
          longitude: 2.6509438,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {/* Marcador de recogida */}
        <Marker
          coordinate={{ latitude: 39.5764915, longitude: 2.6509438 }}
          title="Recogida"
        />
        
        {/* Marcador de destino */}
        <Marker
          coordinate={{ latitude: 39.5778671, longitude: 2.6282131 }}
          title="Destino"
        />
        
        {/* Línea entre los dos puntos */}
        <Polyline
          coordinates={[
            { latitude: 39.5764915, longitude: 2.6509438 }, // Recogida
            { latitude: 39.5778671, longitude: 2.6282131 }, // Destino
          ]}
          strokeColor="#0000FF" // Color de la línea
          strokeWidth={3} // Ancho de la línea
        />
      </MapView>
      
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>Detalles del Usuario</Text>
        <Text style={styles.text}>Nombre: {ticket.user}</Text>
        <Text style={styles.text}>Teléfono: {ticket.phone}</Text>
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => console.log('Llamar al usuario')}
          >
            <Text style={styles.buttonText}>Llamar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => console.log('Abrir chat')}
          >
            <Text style={styles.buttonText}>Chat</Text>
          </TouchableOpacity>
        </View>
      </View>
      <DriverFooter />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 3,
  },
  detailsContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default DriverTicketScreen;
