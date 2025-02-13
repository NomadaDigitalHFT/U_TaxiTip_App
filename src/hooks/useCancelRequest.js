import { useState } from "react";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, deleteDoc, getDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

const useCancelRequest = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const auth = getAuth();
  const db = getFirestore();

  const cancelRequest = async (userCardsId, redirectTo = "UserHomeScreen") => {
    setLoading(true);
    const user = auth.currentUser;

    if (!user) {
      console.log("⚠️ Sesión expirada. Redirigiendo a LoginScreen...");
      navigation.reset({ index: 0, routes: [{ name: "LoginScreen" }] });
      setLoading(false);
      return;
    }

    if (!userCardsId) {
      console.log("⚠️ No se encontró la solicitud de usuario.");
      setLoading(false);
      return;
    }

    try {
      const userDocRef = doc(db, "userCards", userCardsId);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        console.log("⚠️ La solicitud ya fue eliminada.");
        setLoading(false);
        return;
      }

      if (userDocSnap.data().userId !== user.uid) {
        console.log("⛔ No tienes permiso para cancelar esta solicitud.");
        setLoading(false);
        return;
      }

      await deleteDoc(userDocRef);
      console.log(`✅ userCards eliminado correctamente: ${userCardsId}`);

      // 🔹 Reset total del stack para evitar transiciones visuales no deseadas
      navigation.reset({
        index: 0,
        routes: [{ name: redirectTo }],
      });
      
    } catch (error) {
      console.log(`❌ Error al eliminar la solicitud: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return { cancelRequest, loading };
};

export default useCancelRequest;




