import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";
import "firebase/compat/storage";
import firebase from 'firebase/compat/app';
import "firebase/storage";
import { getStorage } from "firebase/storage";
import "firebase/compat/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAqvbRwHO9HVjVZovUKNe8C7-bHCbul4Xk",
    authDomain: "welocal-933c1.firebaseapp.com",
    projectId: "welocal-933c1",
    storageBucket: "welocal-933c1.appspot.com",
    messagingSenderId: "437647564979",
    appId: "1:437647564979:web:3f329fdd1c94b43764d0c6",
    measurementId: "G-Z76BEJ27HM"
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