import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
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

// Verifica si ya hay una app inicializada
let app;
if (!global.firebaseApp) {
  app = initializeApp(firebaseConfig);
  global.firebaseApp = app; // Guarda la app globalmente para evitar inicializaciones múltiples
} else {
  app = global.firebaseApp;
}

// Configura la persistencia con AsyncStorage
let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (error) {
  console.warn("Firebase Auth ya está inicializado:", error.message);
  auth = global.firebaseAuth || null;
}

if (!global.firebaseAuth) {
  global.firebaseAuth = auth;
}

// Inicializa Firestore
const db = getFirestore(app);

export { app, auth, db };
