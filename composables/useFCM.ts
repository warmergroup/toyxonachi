// composables/useFCM.ts
import { getToken, onMessage } from 'firebase/messaging'
import { messaging } from '@/utils/firebase'

export const useFCM = () => {
  const requestToken = async () => {
    try {
      const permission = await Notification.requestPermission()
      if (permission !== 'granted') {
        console.warn('Notification ruxsat berilmadi.')
        return null
      }

      let token: string | null = null;
      if (messaging) {
        token = await getToken(messaging, {
          vapidKey: 'YOUR_PUBLIC_VAPID_KEY_HERE'
        });
        console.log('FCM Token:', token);
      } else {
        console.warn('messaging null, FCM client faqat browserda ishlaydi.');
      }
      return token;
    } catch (error) {
      console.error('Token olishda xatolik:', error)
      return null
    }
  }

  const listenToMessages = () => {
    if (messaging) {
      onMessage(messaging, (payload) => {
        console.log('Push keldi:', payload)
        if (Notification.permission === 'granted') {
          new Notification(payload.notification?.title || '', {
            body: payload.notification?.body || '',
            icon: payload.notification?.icon || undefined
          })
        }
      })
    } else {
      console.warn('messaging null, FCM client faqat browserda ishlaydi.');
    }
  }

  return {
    requestToken,
    listenToMessages
  }
}
