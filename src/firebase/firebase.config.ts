// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAflOp4Z1DTNA9qYVwEiLeQb72p787HH3s",
  authDomain: "fbclone-f9186.firebaseapp.com",
  projectId: "fbclone-f9186",
  storageBucket: "fbclone-f9186.appspot.com",
  messagingSenderId: "43317436789",
  appId: "1:43317436789:web:565b4e8d6c1817ee5cb33c",
  measurementId: "G-XV4DEYCNS9",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const signIn = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};
const logoutFirebase = () => {
  return auth.signOut();
};
const signUp = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};
export default app;
export { db, auth, signIn, logoutFirebase, signUp };
