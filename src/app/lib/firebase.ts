import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDVz9g0WesvUfvwpiqvUIR1W54EPtf56O8",
  authDomain: "chavda-os.firebaseapp.com",
  projectId: "chavda-os",
  storageBucket: "chavda-os.firebasestorage.app",
  messagingSenderId: "568301204676",
  appId: "1:568301204676:web:2498a75008394f5e10c591",
  measurementId: "G-FPR9KE594H",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();