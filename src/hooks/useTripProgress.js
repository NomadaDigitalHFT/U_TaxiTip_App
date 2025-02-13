import { useState, useEffect } from "react";
import { db } from "./../firebase/firebaseConfig"; 
import { doc, onSnapshot } from "firebase/firestore";

const useTripProgress = (tripId) => {
  const [tripData, setTripData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tripId) return;

    console.log(`📡 Escuchando cambios en Firestore para el tripId: ${tripId}`);

    const tripRef = doc(db, "userCards", tripId);
    const unsubscribe = onSnapshot(tripRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        console.log("📡 Datos actualizados en tiempo real:", data);

        // Solo actualiza si el estado es "fare_confirmed"
        if (data.status === "fare_confirmed") {
          setTripData(data);
          setLoading(false);
        }
      } else {
        console.warn("⚠️ No se encontró la solicitud de usuario.");
      }
    });

    return () => unsubscribe();
  }, [tripId]);

  return { tripData, loading };
};

export default useTripProgress;







