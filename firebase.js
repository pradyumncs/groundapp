import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";
import "firebase/compat/storage";
import firebase from 'firebase/compat/app';
import "firebase/storage";
import { getStorage } from "firebase/storage";
import "firebase/compat/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAoIKBB850XMtdGuGVPGZe0TfIVhElYjko",
    authDomain: "sincere-25a86.firebaseapp.com",
    projectId: "sincere-25a86",
    storageBucket: "sincere-25a86.appspot.com",
    messagingSenderId: "913038664899",
    appId: "1:913038664899:web:531e7caafc596c3dc52e76",
    measurementId: "G-Z36DCXQKVS"
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