import React, { useState, useEffect } from "react";
import { View, FlatList, Text, ActivityIndicator, Alert } from "react-native";
import styled from "styled-components/native";
import DriverCard from "./../../components/driver/DriverCard";
import { db } from "./../../firebase/firebaseConfig";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { GOOGLE_MAPS_API_KEY } from "@env";

const ListContainer = styled.View`
  flex: 1;
  padding: 10px;
`;

// Función para obtener distancia usando Google Maps API
const fetchDistanceMatrix = async (origin, destination) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${GOOGLE_MAPS_API_KEY}`
    );
    const data = await response.json();
    
    if (data.status !== "OK") {
      console.error("Error en la API de Google Maps:", data);
      return null;
    }

    return data.rows[0].elements[0]; // Retorna distancia y duración
  } catch (error) {
    console.error("Error obteniendo datos de distancia:", error);
    return null;
  }
};

const GalleryCards = ({ navigation }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const requestsCollection = collection(db, "requests");

    const unsubscribe = onSnapshot(
      requestsCollection,
      async (snapshot) => {
        if (snapshot.empty) {
          setRequests([]);
          setLoading(false);
          return;
        }

        try {
          const newRequests = await Promise.all(
            snapshot.docs
              .map((doc) => ({ id: doc.id, ...doc.data() }))
              .filter((request) => request.status === "pending") // Filtrar solicitudes activas
              .map(async (request) => {
                console.log("Solicitud procesada:", request);

                if (request.origin && request.destination) {
                  request.distanceInfo = await fetchDistanceMatrix(
                    request.origin,
                    request.destination
                  ) || { distance: { text: "N/A" }, duration: { text: "N/A" } };
                }

                return request;
              })
          );

          console.log("Solicitudes finales:", newRequests);
          setRequests(newRequests);
          setLoading(false);
        } catch (error) {
          console.error("Error procesando solicitudes:", error);
          setLoading(false);
        }
      },
      (error) => {
        console.error("Error al escuchar Firestore:", error);
        Alert.alert("Error", "No se pudo obtener las solicitudes.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleAccept = async (ticket) => {
    try {
      await updateDoc(doc(db, "requests", ticket.id), { status: "accepted" });
      setRequests((prev) => prev.filter((req) => req.id !== ticket.id));
      navigation.navigate("DriverTicketScreen", { ticket });
    } catch (error) {
      console.error("Error al aceptar la solicitud:", error);
      Alert.alert("Error", "No se pudo aceptar la solicitud.");
    }
  };

  const handleReject = async (ticket) => {
    try {
      await updateDoc(doc(db, "requests", ticket.id), { status: "rejected" });
    } catch (error) {
      console.error("Error al rechazar la solicitud:", error);
      Alert.alert("Error", "No se pudo rechazar la solicitud.");
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#007bff" />;
  }

  return (
    <ListContainer>
      {requests.length > 0 ? (
        <FlatList
          data={requests}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DriverCard
              time={item.requestTime || "N/A"}
              location={item.origin || "Ubicación desconocida"}
              tip={item.tip || "N/A"}
              distance={item.distanceInfo?.distance?.text || item.distance || "N/A"}
              duration={item.distanceInfo?.duration?.text || "N/A"}
              onAccept={() => handleAccept(item)}
              onReject={() => handleReject(item)}
            />
          )}
        />
      ) : (
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          No hay solicitudes disponibles.
        </Text>
      )}
    </ListContainer>
  );
};

export default GalleryCards;



