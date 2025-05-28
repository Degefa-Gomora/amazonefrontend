
// Import core Firebase SDK functions needed to initialize and use Firebase services
import { initializeApp } from "firebase/app";                // Initializes the Firebase app with provided config
import { getAnalytics } from "firebase/analytics";           // Enables Google Analytics for Firebase
import { getAuth } from "firebase/auth";                     // Provides Firebase Authentication functionality
import { getFirestore } from "firebase/firestore";           // Provides access to Firestore (NoSQL database)

// Firebase configuration using environment variables for security and flexibility
// These variables are defined in your .env file and accessed via Vite's import.meta.env
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,                      // API key to identify your Firebase project
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,              // Domain used for Firebase Authentication
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,                // Unique ID of your Firebase project
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,        // Cloud Storage bucket for storing files
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID, // ID for Firebase Cloud Messaging
  appId: import.meta.env.VITE_FIREBASE_APP_ID,                        // Unique ID for the web app
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,        // ID for Google Analytics tracking
};

// Initialize Firebase app instance using the configuration object
const app = initializeApp(firebaseConfig);

// Enable Firebase Analytics for usage tracking (optional)
const analytics = getAnalytics(app);

// Export initialized Firebase Authentication and Firestore instances
export const auth = getAuth(app);     // Used for user sign-in, sign-up, and auth state management
export const db = getFirestore(app);  // Used to interact with Firestore database (CRUD operations)
