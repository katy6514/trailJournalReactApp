// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6hBUA1ozxc1tLRTpA53neg7qPgF_-48Y",
  authDomain: "cdthike-4d736.firebaseapp.com",
  projectId: "cdthike-4d736",
  storageBucket: "cdthike-4d736.firebasestorage.app",
  messagingSenderId: "294460743992",
  appId: "1:294460743992:web:55546921f8150a705721cd",
  measurementId: "G-P6KL5FWRXS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export { onAuthStateChanged };
// const analytics = getAnalytics(app);
