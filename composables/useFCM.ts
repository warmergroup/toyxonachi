// composables/useFCM.ts
import { messaging, onMessage } from '~/utils/firebase'

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