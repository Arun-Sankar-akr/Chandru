import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Paste your Firebase web config here (Firebase console > Project settings > Your apps).
// Leave apiKey empty to keep using the local-only fallback.
const config = {
  apiKey: "AIzaSyCKbpHC7GM21v5V0kU4v6_sCIbDD3EuAkY",
  authDomain: "wedding-5a8a4.firebaseapp.com",
  projectId: "wedding-5a8a4",
  storageBucket: "wedding-5a8a4.firebasestorage.app",
  messagingSenderId: "73153854991",
  appId: "1:73153854991:web:f6aec198a97c9d9fdead7a"
};

export const db = config.apiKey ? getFirestore(initializeApp(config)) : null;