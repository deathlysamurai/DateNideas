import { auth, firestore } from "../../database/firebase";
import { collection, addDoc, setDoc, doc, getDoc, getDocs } from "firebase/firestore";

export default class dateFunctions {
    static async getCurrentUserDates() {
        const userRef = doc(firestore, "users", auth.currentUser.uid);
        const userDatesRef = collection(userRef, "dates");
        const datesSnapshot = await getDocs(userDatesRef);
        return datesSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data() }));
    }

    static async addDate(title) {
        const userRef = doc(firestore, "users", auth.currentUser.uid);
        const userDatesRef = collection(userRef, "dates");
        await addDoc(userDatesRef, {
            title: title,
        })
    }
}