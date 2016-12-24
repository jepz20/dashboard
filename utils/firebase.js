import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyDVSXB67f4u5mEGjWpsGbSlQfdU0LiHde8',
  authDomain: 'dashboard-a6fd6.firebaseapp.com',
  databaseURL: 'https://dashboard-a6fd6.firebaseio.com',
  storageBucket: 'dashboard-a6fd6.appspot.com',
  messagingSenderId: '633311476348',
};

export const firebaseApp = firebase.initializeApp(config);
export const firebaseDb = firebase.database();
