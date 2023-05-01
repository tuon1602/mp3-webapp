import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY || "AIzaSyB_qN0sNsH-eiMpUWQhFKb22IBh6ktDEb0",
    authDomain: import.meta.env.VITE_AUTH_DOMAIN || "mp3app-c08c3.firebaseapp.com",
    projectId: import.meta.env.VITE_PROJECT_ID || "mp3app-c08c3",
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET || "mp3app-c08c3.appspot.com",
    messagingSenderId:import.meta.env.VITE_MESSAGING_SENDER_ID || "264687204874",
    appId: import.meta.env.VITE_APP_ID || "1:264687204874:web:4a2ec8907d240bd16ffdf3",
    measurementId: import.meta.env.VITE_MEASUREMENT_ID || "G-NWFJBJS54C"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app)