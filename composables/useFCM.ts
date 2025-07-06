// composables/useFCM.ts
import { messaging, getToken, onMessage } from '~/utils/firebase'

export async function requestFcmToken(vapidKey: string) {
  try {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      console.warn('Notification ruxsat berilmadi.');
      return null;
    }
    if (messaging) { 
      const fcmToken = await getToken(messaging, { vapidKey });
      return fcmToken;
    }
  } catch (err) {
    console.error('FCM token olishda xatolik:', err);
    return null;
  }
}

export function listenToMessages() {
  if (messaging) {
    onMessage(messaging, (payload) => {
      if (Notification.permission === 'granted' && payload.notification) {
        new Notification(payload.notification.title ?? 'Yangi xabar', {
          body: payload.notification.body ?? '',
          icon: payload.notification.icon ?? undefined
        });
      }
    });
  }
}