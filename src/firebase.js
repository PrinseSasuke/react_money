import { initializeApp } from "firebase/app";

import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "react-money-8f0ba.firebaseapp.com",
  databaseURL: "https://react-money-8f0ba-default-rtdb.firebaseio.com",
  projectId: "react-money-8f0ba",
  storageBucket: "react-money-8f0ba.firebasestorage.app",
  messagingSenderId: "654995636214",
  appId: "1:654995636214:web:37a2fdf6e7c4e3426391d7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const login = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("Вход выполнен:", result.user); // Отладка
  } catch (error) {
    alert(error);
  }
};
const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    alert(error);
  }
};
export {
  db,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  auth,
  login,
  logout,
};
