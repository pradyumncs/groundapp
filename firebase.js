import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";
import "firebase/compat/storage";
import firebase from 'firebase/compat/app';
import "firebase/storage";
import { getStorage } from "firebase/storage";
import "firebase/compat/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB4xJXOeZQ-E88p1lfpv2p8sXoV9jhsJ8U",
    authDomain: "franceconnect-754fe.firebaseapp.com",
    projectId: "franceconnect-754fe",
    storageBucket: "franceconnect-754fe.appspot.com",
    messagingSenderId: "511816435178",
    appId: "1:511816435178:web:c4a9cb9da4d088ac489e93",
    measurementId: "G-98HEKH0JLK"
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