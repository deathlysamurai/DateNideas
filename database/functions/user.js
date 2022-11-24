import { auth, firestore } from "../../database/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, addDoc, setDoc, doc, getDoc, query, where, getDocs } from "firebase/firestore";

export default class userFunctions {
    static loginUser(email, password) {
        signInWithEmailAndPassword(auth, email.trim(), password)
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

    static async getPartner() {
        try {
            const userRef = doc(firestore, "users", auth.currentUser.uid);
            const userPartnersRef = collection(userRef, "partners");
            const partnersSnapshot = await getDocs(userPartnersRef);
            const partner =  partnersSnapshot.docs.map((doc) => ({
                                id: doc.id,
                                ...doc.data() }));
            if(partner.length > 0) {
                const partnerSnapshot = await getDoc(doc(firestore, "users", partner[0].partnerID));
                if(partnerSnapshot.exists()) {
                    return partnerSnapshot.data();
                } else {
                    return null;
                }
            } else {
                return null;
            }
        } catch(err) {
            alert(err);
            return null;
        }
    }

    static async setPartner(email) {
        const q = query(collection(firestore, "users"), where("email", "==", email));
        const querySnapshot = await getDocs(q);
        if(!querySnapshot.empty) {
            let partnerID = null;
            let partner = null;
            querySnapshot.forEach((doc) => {
                partnerID = doc.id;
                partner = doc.data();
                return false;
            });
            
            if(partnerID) { 
                const userRef = doc(firestore, "users", auth.currentUser.uid);
                const userPartnersRef = collection(userRef, "partners");
                await addDoc(userPartnersRef, {partnerID: partnerID}); 
            }
            return partner;
        }
        else {
            alert("Email not found.")
            return null;
        }
    }

    static async requestPartner(email) {
        const q = query(collection(firestore, "users"), where("email", "==", email));
        const querySnapshot = await getDocs(q);
        if(!querySnapshot.empty) {
            let partnerID = null;
            let partner = null;
            querySnapshot.forEach((doc) => {
                partnerID = doc.id;
                partner = doc.data();
                return false;
            });
            if(partnerID) { 
                const userRef = doc(firestore, "users", partnerID);
                const userRequestsRef = collection(userRef, "requests");
                await addDoc(userRequestsRef, {partnerID: auth.currentUser.uid}); 
            }
            return partner;
        }
        else {
            alert("Email not found.")
            return null;
        }
    }

    static async getRequests() {
        const userRef = doc(firestore, "users", auth.currentUser.uid);
        const userRequestsRef = collection(userRef, "requests");
        const requestsSnapshot = await getDocs(userRequestsRef);
        if(!requestsSnapshot.empty) {
            let partners = [];
            const partnerRequests = requestsSnapshot.docs.map((doc) => ({ ...doc.data() }));
            for (let i = 0; i < partnerRequests.length; i++) {
                const partner = await getDoc(doc(firestore, "users", partnerRequests[i].partnerID));
                partners.push(partner.data());
            };
            return partners;
        } else {
            return null;
        }
    }
}
