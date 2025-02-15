import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut 
} from "firebase/auth";
import { 
  getFirestore, 
  enableIndexedDbPersistence, 
  collection, 
  addDoc, 
  getDoc, 
  getDocs, 
  doc, 
  setDoc, 
  updateDoc 
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

enableIndexedDbPersistence(db)
  .then(() => console.log("Offline mode enabled"))
  .catch((err) => {
    if (err.code === "failed-precondition") {
      console.warn("Persistence failed: Multiple tabs open.");
    } else if (err.code === "unimplemented") {
      console.warn("Persistence is not supported by the browser.");
    } else {
      console.error("Failed to enable offline persistence:", err);
    }
  });

export { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut };
export { collection, addDoc, getDoc, getDocs, doc, setDoc, updateDoc };
