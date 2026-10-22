import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth, onAuthStateChanged, setPersistence, browserLocalPersistence, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, sendPasswordResetEmail, GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { getFirestore, doc, setDoc, onSnapshot, enableIndexedDbPersistence, terminate, clearIndexedDbPersistence } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

// These placeholders are replaced at build time by build.js, using
// environment variables you set in Vercel. Never put real values in this file.
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

// Stay logged in until the user taps Sign out, even after closing the browser or app.
setPersistence(auth, browserLocalPersistence).catch(() => {});

try { await enableIndexedDbPersistence(dbFs); } catch (e) { /* multi-tab or unsupported, fine */ }

// Google sign-in: a popup normally; falls back to a full-page redirect where popups are blocked.
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
async function signInWithGoogle() {
  try { return await signInWithPopup(auth, googleProvider); }
  catch (e) {
    if (e.code === "auth/popup-blocked" || e.code === "auth/operation-not-supported-in-this-environment") return signInWithRedirect(auth, googleProvider);
    throw e;
  }
}
getRedirectResult(auth).catch(() => {}); // finishes a redirect sign-in; onAuthStateChanged does the rest

// Used by "Reset this device": stop Firestore, then delete its offline copy.
async function wipeFirestoreCache() {
  try { await terminate(dbFs); await clearIndexedDbPersistence(dbFs); } catch (e) { /* best effort */ }
}

window.__fb = { auth, dbFs, doc, setDoc, onSnapshot, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, sendPasswordResetEmail, signInWithGoogle, wipeFirestoreCache };

onAuthStateChanged(auth, (user) => {
  if (window.onAuthChange) window.onAuthChange(user);
});
