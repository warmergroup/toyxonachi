
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage, isSupported } from "firebase/messaging";

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

// Firebase messaging'ni ishga tushirish
const initializeMessaging = async () => {
  // Faqat client-side'da ishlaydi
  if (process.client && typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    try {
      const supported = await isSupported();
      if (supported) {
        messaging = getMessaging(app);
        
      } else {
        console.warn('Firebase messaging qo\'llab-quvvatlanmaydi');
      }
    } catch (error) {
      console.warn('Firebase messaging ishga tushirilmadi:', error);
    }
  }
};

// FCM token olish funksiyasi
export async function getFCMToken(vapidKey?: string): Promise<string | null> {
  // Faqat client-side'da ishlaydi
  if (!process.client) {
    console.warn('FCM token faqat client-side\'da olinadi');
    return null;
  }

  if (!messaging) {
    await initializeMessaging();
  }
  
  if (!messaging) {
    console.warn('Firebase messaging mavjud emas');
    return null;
  }

  try {
    // Notification permission so'rash
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      console.warn('Notification permission berilmadi');
      return null;
    }

    // VAPID key mavjud bo'lsa FCM token olish
    if (vapidKey) {
      const token = await getToken(messaging, { vapidKey });
      if (token) {
        localStorage.setItem('fcm_token', token);
        return token;
      }
    } else {
      console.warn('VAPID key mavjud emas, FCM token olinmaydi');
    }
    
    return null;
  } catch (error) {
    console.error('FCM token olishda xatolik:', error);
    return null;
  }
}

// Foreground message'lar uchun listener
export function setupForegroundListener() {
  // Faqat client-side'da ishlaydi
  if (!process.client) {
    console.warn('Foreground listener faqat client-side\'da o\'rnatiladi');
    return;
  }

  if (!messaging) {
    console.warn('Messaging mavjud emas, foreground listener o\'rnatilmaydi');
    return;
  }

  onMessage(messaging, (payload) => {
    console.log('🔔 Notification kelgan:', payload);
    
    if (Notification.permission === 'granted' && payload.notification) {
      new Notification(
        payload.notification.title ?? 'Yangi xabar',
        {
          body: payload.notification.body ?? '',
          icon: payload.notification.icon ?? '/logo-splash.svg'
        }
      );
    }
  });
}

// Messaging'ni export qilish
export { messaging, getToken, onMessage };