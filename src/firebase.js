// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCkLJZS5Eq4b94efjg2OBKYsSQYgt6-EMQ",
    authDomain: "nodal-isotope-378414.firebaseapp.com",
    projectId: "nodal-isotope-378414",
    storageBucket: "nodal-isotope-378414.appspot.com",
    messagingSenderId: "1073663785169",
    appId: "1:1073663785169:web:2ed6c4709bab247a38adf0",
    measurementId: "G-DJD24CD4FN"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()