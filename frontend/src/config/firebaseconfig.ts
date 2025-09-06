// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBX0tJiGKvdUBiyeNBI9z_Y-dKEOkkA47I",
  authDomain: "bhandara-2b04c.firebaseapp.com",
  projectId: "bhandara-2b04c",
  storageBucket: "bhandara-2b04c.firebasestorage.app",
  messagingSenderId: "768417537843",
  appId: "1:768417537843:web:7b17ba374271c5802fe846"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp)
export const auth = getAuth(firebaseApp)