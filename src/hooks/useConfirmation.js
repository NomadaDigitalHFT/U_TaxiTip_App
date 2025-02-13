import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { getFirestore, doc, onSnapshot } from "firebase/firestore";

export const useConfirmation = (userCardsId) => {
  const navigation = useNavigation();
  const firestore = getFirestore();
  const [tripData, setTripData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userCardsId) return;

    const tripRef = doc(firestore, "userCards", userCardsId);
    const unsubscribe = onSnapshot(tripRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        setTripData(data);
        setLoading(false);

        // Si el estado cambia a "fare_confirmed", navegar automáticamente
        if (data.status === "fare_confirmed") {
          navigation.replace("UserTripProgressScreen", { userCardsId });
        }
      }
    });

    return () => unsubscribe(); // Limpiar la escucha al desmontar el componente
  }, [userCardsId, navigation]);

  return { tripData, loading };
};
