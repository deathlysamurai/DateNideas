import { auth, firestore } from "../../database/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, addDoc, setDoc, doc, getDoc } from "firebase/firestore";
import { CLEAR_DATA, USER_STATE_CHANGE, USER_DATES_STATE_CHANGE } from "../constants";

let unsubscribe = [];

export function clearData() {
    return ((dispatch) => {
        for (let i = unsubscribe; i < unsubscribe.length; i++) {
            unsubscribe[i]();
        }
        dispatch({ type: CLEAR_DATA })
    })
}

export function reload() {
    return ((dispatch) => {
        dispatch(clearData())
        dispatch(getCurrentUser())
    })
}

export function loginUser(email, password) {
    signInWithEmailAndPassword(auth, email, password)
    .then((res) => {})
    .catch((err) => { 
        switch(err.code) {
            case "auth/invalid-email":
                alert("Invalid Email, Try Again");
                break;
            case "auth/wrong-password":
                alert("Wrong Password, Try Again");
                break;
            default:
                alert(err);
        }
    });
}

export async function registerUser(email, password, name) {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(firestore, "users", auth.currentUser.uid), {
            email: auth.currentUser.email,
            name: name
        });
    } catch(err) {
        alert(err);
    }
    
}

export function logoutUser() {
    signOut(auth);
}

export function getCurrentUser() {
    return (async (dispatch) => {
        let snapshot = await getDoc(doc(firestore, "users", auth.currentUser.uid));
        if(snapshot.exists) {
            dispatch({ type: USER_STATE_CHANGE, currentUser: { uid: auth.currentUser.uid, ...snapshot.data() } });
        }
        unsubscribe.push(snapshot);
    })


    // try {
    //     const userSnapshot = await getDoc(doc(firestore, "users", auth.currentUser.uid));
    //     console.log(auth.currentUser.uid)
    //     if(userSnapshot.exists()) {
    //         console.log('hello')
    //         return userSnapshot.data();
    //     }
    // } catch(err) {
    //     alert(err);
    //     return null;
    // }
}
