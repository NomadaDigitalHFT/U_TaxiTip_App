import { initializeApp } from "firebase/app";
import { initializeAuth, getAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
  MEASUREMENT_ID,
} from "@env"; // Variables de entorno para mayor seguridad

// Configuración de Firebase
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
};

// Inicializar Firebase de forma segura
let app;
if (!global.firebaseApp) {
  console.log("🔵 Inicializando Firebase App...");
  app = initializeApp(firebaseConfig);
  global.firebaseApp = app;
} else {
  console.log("⚠️ Firebase App ya estaba inicializada.");
  app = global.firebaseApp;
}

// Configurar Firebase Auth con persistencia en AsyncStorage
const auth = global.firebaseAuth || initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
global.firebaseAuth = auth;

// Inicializar Firestore
const db = getFirestore(app);

export { app, auth, db };
