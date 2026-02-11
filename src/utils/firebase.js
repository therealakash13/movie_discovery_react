// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1tKanjNAUADMAaHqay6K3RVWJaltcIwg",
  authDomain: "nflix-f7f4d.firebaseapp.com",
  projectId: "nflix-f7f4d",
  storageBucket: "nflix-f7f4d.firebasestorage.app",
  messagingSenderId: "318390694323",
  appId: "1:318390694323:web:ee64b8db43def861df1bc6",
  measurementId: "G-Z46XT88YJV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
