// src/firebase.js
import { initializeApp } from 'firebase/app'
import type { Messaging } from 'firebase/messaging'
import { getMessaging,getToken,onMessage } from 'firebase/messaging'

const firebaseConfig = {
  apiKey: "AIzaSyBPz6LqUzM3aluyXTwmzwBqGUNNJDN-o2E",
  authDomain: "toyxonachi-e5ab6.firebaseapp.com",
  projectId: "toyxonachi-e5ab6",
  storageBucket: "toyxonachi-e5ab6.appspot.com",
  messagingSenderId: "145501933049",
  appId: "1:145501933049:web:d9242e6e1fca537d720128",
  measurementId: "G-98WGS7RMTM"
}
let messaging: Messaging | null = null;
if (import.meta.client) {
  const { getMessaging } = await import('firebase/messaging');
  const firebaseApp = initializeApp(firebaseConfig);
  messaging = getMessaging(firebaseApp);
}

export { messaging, getToken, onMessage };
