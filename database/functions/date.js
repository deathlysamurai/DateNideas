import { auth, firestore } from "../../database/firebase";
import { collection, addDoc, setDoc, doc, getDoc, getDocs, deleteDoc, updateDoc } from "firebase/firestore";
import { firebaseUser } from ".";

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

    static async getRandomDate() {
        const dates = await this.getCurrentUserDates();
        const randIndex = Math.floor(Math.random() * dates.length);
        return dates[randIndex];
    }

    static async deleteDate(id) {
        const userRef = doc(firestore, "users", auth.currentUser.uid);
        const userDatesRef = collection(userRef, "dates");
        const dateSnapshot = await getDoc(doc(firestore, userDatesRef.path, id));
        if(dateSnapshot.exists()) {
            await deleteDoc(dateSnapshot.ref);
        } else {
            alert("Date not found.");
        }
    }

    static async editDate(id, title) {
        const userRef = doc(firestore, "users", auth.currentUser.uid);
        const userDatesRef = collection(userRef, "dates");
        const dateRef = doc(firestore, userDatesRef.path, id);
        try {
            await updateDoc(dateRef, {
                title: title,
            });
        } catch(err) {
            alert(err);
        }
    }
}