importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCHPWQlqvYhMx6DNKhtpr_-VKalMKQ_1MY",
  authDomain: "taxi-booking-nx.firebaseapp.com",
  projectId: "taxi-booking-nx",
  storageBucket: "taxi-booking-nx.appspot.com",
  messagingSenderId: "90443000925",
  appId: "1:90443000925:web:545b50d1e0c72ba53831b4"
});

const messaging = firebase.messaging();