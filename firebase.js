import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";
import "firebase/compat/storage";
import firebase from 'firebase/compat/app';
import "firebase/storage";
import { getStorage } from "firebase/storage";
import "firebase/compat/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBnbLZLi-ARlM7d7y9qE2dvg4iRuhZ3-X4",
    authDomain: "switzerlandsocial-65d1a.firebaseapp.com",
    projectId: "switzerlandsocial-65d1a",
    storageBucket: "switzerlandsocial-65d1a.appspot.com",
    messagingSenderId: "195210156102",
    appId: "1:195210156102:web:899aa7f795e769a0cb1247",
    measurementId: "G-4FM95F3ZVW"
  };



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = initializeFirestore(app, {
    experimentalForceLongPolling: true,
});


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}


const storage = getStorage(app);

//export { auth, db, storage, firebase };
export { auth, db, firebase, storage };