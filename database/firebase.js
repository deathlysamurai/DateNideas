import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC0lRB2fCqsZazmSuTm7GEBWjaiaoHQ-D4",
    authDomain: "date-nideas.firebaseapp.com",
    projectId: "date-nideas",
    storageBucket: "date-nideas.appspot.com",
    messagingSenderId: "680789314434",
    appId: "1:680789314434:web:aee76087022fd6d8e7dd9b",
    measurementId: "G-8741Q49S0Q"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const firestore = getFirestore(app);

export { auth, firestore };