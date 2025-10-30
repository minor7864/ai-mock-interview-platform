// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJTqK1ezTZvcHQ86tZMNBpzGHaloYzink",
  authDomain: "interviewprep-9e48f.firebaseapp.com",
  projectId: "interviewprep-9e48f",
  storageBucket: "interviewprep-9e48f.firebasestorage.app",
  messagingSenderId: "984644243209",
  appId: "1:984644243209:web:92158a752a28fd95ee0dd8",
  measurementId: "G-Z2YRY3331H",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const analytics = getAnalytics(app);



export const auth = getAuth(app);
export const db = getFirestore(app);