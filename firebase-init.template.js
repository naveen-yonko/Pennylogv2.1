import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth, onAuthStateChanged, setPersistence, browserLocalPersistence, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { getFirestore, doc, setDoc, onSnapshot, enableIndexedDbPersistence } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

// These placeholders are replaced at build time by build.js, using
// environment variables you set in Vercel — never edit real values in here.
// For local testing without Vercel, copy this file to firebase-init.js and
// fill in real values by hand (firebase-init.js is gitignored, so it never
// gets committed).
const firebaseConfig = {
  apiKey: "__FIREBASE_API_KEY__",
  authDomain: "__FIREBASE_AUTH_DOMAIN__",
  projectId: "__FIREBASE_PROJECT_ID__",
  storageBucket: "__FIREBASE_STORAGE_BUCKET__",
  messagingSenderId: "__FIREBASE_MESSAGING_SENDER_ID__",
  appId: "__FIREBASE_APP_ID__",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const dbFs = getFirestore(app);

// Explicit local persistence: stay logged in until the user taps Sign out,
// even after closing the browser or the app.
setPersistence(auth, browserLocalPersistence).catch(() => {});

try { await enableIndexedDbPersistence(dbFs); } catch (e) { /* multi-tab or unsupported, fine */ }

window.__fb = { auth, dbFs, doc, setDoc, onSnapshot, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, sendPasswordResetEmail };

onAuthStateChanged(auth, (user) => {
  if (window.onAuthChange) window.onAuthChange(user);
});
