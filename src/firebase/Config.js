// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import { getStorage } from "firebase/storage";



const firebaseConfig = {
  apiKey: "AIzaSyA8f2UvK7G_9zYtft_se3xXSX9LlrkGUaY",
  authDomain: "olx-e8017.firebaseapp.com",
  projectId: "olx-e8017",
  storageBucket: "olx-e8017.appspot.com",
  messagingSenderId: "40648946923",
  appId: "1:40648946923:web:568224e2d9f2323cfebaae",
  measurementId: "G-YLRF4R5JNR"
};

// Initialize Firebase
export const FireBase= initializeApp(firebaseConfig);
export const db = getFirestore(FireBase);
export const storageDb = getStorage(FireBase, "gs://olx-e8017.appspot.com");