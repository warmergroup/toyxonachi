
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage,isSupported } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDXPRtRax8xNzu4yHe5Lk2Uk4QH-9dw2CY",
  authDomain: "toyxonachi-47293.firebaseapp.com",
  projectId: "toyxonachi-47293",
  storageBucket: "toyxonachi-47293.firebasestorage.app",
  messagingSenderId: "205020384733",
  appId: "1:205020384733:web:76396fc8013eff01de3a34",
  measurementId: "G-GVJ7P9KLHD"
};

const app = initializeApp(firebaseConfig);

let messaging: ReturnType<typeof getMessaging> | null = null;
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  isSupported().then(supported => {
    if (supported) messaging = getMessaging(app);
  });
}

export async function requestFcmToken(vapidKey: string): Promise<string | null> {
  if (!messaging) return null;
  try {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') throw new Error('Notification permission denied');
    const token = await getToken(messaging, { vapidKey });
    if (token) localStorage.setItem('fcm_token', token);
    return token;
  } catch (err) {
    console.error('FCM token error:', err);
    return null;
  }
}

export { messaging, getToken, onMessage };