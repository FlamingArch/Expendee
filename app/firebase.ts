import { initializeApp, getApps } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth/cordova";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

let firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];


const auth = getAuth(firebaseApp)
const googleProvider = new GoogleAuthProvider()

export function signInGoogle() {
    return signInWithPopup(auth, googleProvider)
}

export function signInEmail(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
}

export function signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
}

export function getCurrentUser() {
    return auth.currentUser
}

export default firebaseApp;