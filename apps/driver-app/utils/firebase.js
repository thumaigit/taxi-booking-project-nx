import localforage from 'localforage';
import firebase from 'firebase/compat/app';
import 'firebase/compat/messaging';
import { getApps } from 'firebase/app';

export const firebaseCloudMessaging = {
  init: async () => {
    if (getApps().length < 1) {
      firebase?.initializeApp({
        apiKey: 'AIzaSyCHPWQlqvYhMx6DNKhtpr_-VKalMKQ_1MY',
        authDomain: 'taxi-booking-nx.firebaseapp.com',
        projectId: 'taxi-booking-nx',
        storageBucket: 'taxi-booking-nx.appspot.com',
        messagingSenderId: '90443000925',
        appId: '1:90443000925:web:545b50d1e0c72ba53831b4',
      });

      try {
        const messaging = firebase.messaging();
        const tokenInLocalForage = await localforage.getItem('fcm_token');
        // Return the token if it is alredy in our local storage
        if (tokenInLocalForage !== null) {
          return tokenInLocalForage;
        }

        // Request the push notification permission from browser
        const status = await Notification.requestPermission();
        if (status === 'denied') {
          alert('Deny pop-up or nitication from browser');
        }
        if (status && status === 'granted') {
          // Get new token from Firebase
          const fcm_token = await messaging.getToken({
            vapidKey:
              'BOuC2coiwhqrSJGV0Zd2YEyAr5m8ehmDHpxWPHJza9EqFClpK7XtHDKFBtqvJJ1tDZ-k8oVjdoiclrnwDOAROzc',
          });

          // Set token in our local storage
          if (fcm_token) {
            localforage.setItem('fcm_token', fcm_token);
            return fcm_token;
          }
        }
      } catch (error) {
        console.error(error);
        return null;
      }
    }
  },
};
