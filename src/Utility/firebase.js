// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4Yy-laBi9Qx2Je9NRTnYVXGz-rgJSqjA",
  authDomain: "e-clone-project-3d22e.firebaseapp.com",
  projectId: "e-clone-project-3d22e",
  storageBucket: "e-clone-project-3d22e.firebasestorage.app",
  messagingSenderId: "485108096411",
  appId: "1:485108096411:web:e58f3559387a1d5cf0953e",
  measurementId: "G-8ZR325S07V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
