// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCixy8REUN9GTIJ-4wbh5m0F8qcAoHc83A",
  authDomain: "ytube2024.firebaseapp.com",
  projectId: "ytube2024",
  storageBucket: "ytube2024.appspot.com",
  messagingSenderId: "455186893129",
  appId: "1:455186893129:web:60c545ea67ab719c033298",
  measurementId: "G-9P0G8YZ16N",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();

export const provider = new GoogleAuthProvider();
