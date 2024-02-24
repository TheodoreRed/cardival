import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "cardival-a7276.firebaseapp.com",
  projectId: "cardival-a7276",
  storageBucket: "cardival-a7276.appspot.com",
  messagingSenderId: "657865679817",
  appId: "1:657865679817:web:34d5f7ed5650374c2bbe18",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const authProvider = new GoogleAuthProvider();

export function signInWithGoogle(): void {
  signInWithPopup(auth, authProvider);
}
export function signOut(): void {
  auth.signOut();
}
