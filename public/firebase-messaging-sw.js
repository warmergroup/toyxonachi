// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js')

firebase.initializeApp({
  apiKey: "AIzaSyBPz6LqUzM3aluyXTwmzwBqGUNNJDN-o2E",
  authDomain: "toyxonachi-e5ab6.firebaseapp.com",
  projectId: "toyxonachi-e5ab6",
  storageBucket: "toyxonachi-e5ab6.appspot.com",
  messagingSenderId: "145501933049",
  appId: "1:145501933049:web:d9242e6e1fca537d720128"
})

const messaging = firebase.messaging()

messaging.onBackgroundMessage(function (payload) {
  console.log('[firebase-messaging-sw.js] Background message:', payload)

  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})
