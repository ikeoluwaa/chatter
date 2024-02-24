import { initializeApp } from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "chatter-fb3bd.firebaseapp.com",
  projectId: "chatter-fb3bd",
  storageBucket: "chatter-fb3bd.appspot.com",
  messagingSenderId: "668927333810",
  appId: "1:668927333810:web:c017d49a10e1ad8983c0ab",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);