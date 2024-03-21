import { initializeApp } from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQnEpm9BWSkPbG-8rB6ufthH1AYT-S82E",
  authDomain: "chatter-fb3bd.firebaseapp.com",
  projectId: "chatter-fb3bd",
  databaseURL: "https://chatter-fb3bd-default-rtdb.firebaseio.com",
  storageBucket: "chatter-fb3bd.appspot.com",
  messagingSenderId: "668927333810",
  appId: "1:668927333810:web:c017d49a10e1ad8983c0ab",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const fb = getDatabase(app);
