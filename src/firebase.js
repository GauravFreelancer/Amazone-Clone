import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDwYM3g4JUu05iP6yb9338Guk1vJXAG4Bo",
  authDomain: "challenge-b6081.firebaseapp.com",
  projectId: "challenge-b6081",
  storageBucket: "challenge-b6081.appspot.com",
  messagingSenderId: "378122949166",
  appId: "1:378122949166:web:f3db35c0d1db5f4c2605bf",
  measurementId: "G-6NVPQ23PV1",
})

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };