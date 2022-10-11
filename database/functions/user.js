import { auth, firestore } from "../../database/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, addDoc, setDoc, doc, getDoc } from "firebase/firestore";

export default class userFunctions {
    static loginUser(email, password) {
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

    static async registerUser(email, password, name) {
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

    static logoutUser() {
        signOut(auth);
    }

    static async getCurrentUser() {
        try {
            const userSnapshot = await getDoc(doc(firestore, "users", auth.currentUser.uid));
            if(userSnapshot.exists()) {
                return userSnapshot.data();
            }
        } catch(err) {
            alert(err);
            return null;
        }
    }
}
