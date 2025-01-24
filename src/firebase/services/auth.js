import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebaseConfig";
import { doc, setDoc } from "firebase/firestore"; // Para guardar datos en Firestore

// Función para registrar un usuario
export const registerUser = async (email, password, additionalData = {}) => {
  if (!email || !password) {
    throw new Error("Todos los campos son obligatorios.");
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Guarda datos adicionales en Firestore
    const userDocRef = doc(db, "usuarios", user.uid);
    await setDoc(userDocRef, {
      email,
      ...additionalData,
    });

    return user; // Devuelve el usuario registrado
  } catch (error) {
    console.error("Error en el registro:", error.message);
    if (error.code === "auth/email-already-in-use") {
      throw new Error("El correo ya está en uso. Intenta con otro.");
    }
    throw new Error("Error durante el registro: " + error.message);
  }
};

// Función para iniciar sesión
export const loginUser = async (email, password) => {
  if (!email || !password) {
    throw new Error("Todos los campos son obligatorios.");
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user; // Devuelve el usuario logueado
  } catch (error) {
    console.error("Error en el inicio de sesión:", error.message);
    if (error.code === "auth/wrong-password") {
      throw new Error("Contraseña incorrecta.");
    } else if (error.code === "auth/user-not-found") {
      throw new Error("Usuario no encontrado.");
    }
    throw new Error("Error durante el inicio de sesión: " + error.message);
  }
};
