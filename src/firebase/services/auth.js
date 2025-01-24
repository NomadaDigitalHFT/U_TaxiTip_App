import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

// Función para registrar un usuario
export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user; // Devuelve el usuario registrado
  } catch (error) {
    console.error("Error en el registro:", error.message);
    throw new Error(error.message); // Lanza un error controlado
  }
};

// Función para iniciar sesión
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user; // Devuelve el usuario logueado
  } catch (error) {
    console.error("Error en el inicio de sesión:", error.message);
    throw new Error(error.message); // Lanza un error controlado
  }
};
