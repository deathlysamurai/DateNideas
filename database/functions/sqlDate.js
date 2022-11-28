import { localDB } from ".";
import axios from 'axios';
import { IMGUR_CLIENT_ID, IMGUR_BEARER } from "../../static/constants";

export default class dateFunctions {
    static async getCurrentUserDates() {
        return new Promise((resolve, reject) => {
            localDB.transaction((tx) => {
                tx.executeSql("select * from dates", [], (_, { rows: { _array } }) =>
                    {
                        resolve(_array);
                    }
                );
            });
        });
    }

    static async addDate(title, image) {
        const formData = new FormData();
        formData.append("image", {
            uri: image,
            type: 'image/jpg',
            name: 'test.jpg'
        });

        const response = await axios.post('https://api.imgur.com/3/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': IMGUR_CLIENT_ID,
            },
        });
        const link = response.data.data.link;

        localDB.transaction((tx) => {
            tx.executeSql("insert into dates (title, image) values (?, ?)", [title, link]);
        });
    }

    static async getRandomDate() {
        const dates = await this.getCurrentUserDates();
        const randIndex = Math.floor(Math.random() * dates.length);
        return dates[randIndex];
    }

    static async deleteDate(id) {
        localDB.transaction(
            (tx) => {
                tx.executeSql(`delete from dates where id = ?;`, [id]);
            },
        )
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