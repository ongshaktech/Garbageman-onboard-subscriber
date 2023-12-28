// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, Timestamp } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8IzTaPgMzdTfMl9B1193OEPXreOHYgwc",
  authDomain: "garbageman-550a7.firebaseapp.com",
  projectId: "garbageman-550a7",
  storageBucket: "garbageman-550a7.appspot.com",
  messagingSenderId: "310707112929",
  appId: "1:310707112929:web:5db32b4fc37440605920a0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const timeStamp = Timestamp;
