// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAflOp4Z1DTNA9qYVwEiLeQb72p787HH3s",
  authDomain: "fbclone-f9186.firebaseapp.com",
  projectId: "fbclone-f9186",
  storageBucket: "fbclone-f9186.appspot.com",
  messagingSenderId: "43317436789",
  appId: "1:43317436789:web:565b4e8d6c1817ee5cb33c",
  measurementId: "G-XV4DEYCNS9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
