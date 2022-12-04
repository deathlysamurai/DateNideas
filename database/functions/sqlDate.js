import { localDB, currentUserID } from ".";
import axios from 'axios';
import { IMGUR_CLIENT_ID, IMGUR_BEARER } from "../../static/constants";

export default class dateFunctions {
    static async getCurrentUserDates() {
        return new Promise((resolve, reject) => {
            localDB.transaction((tx) => {
                tx.executeSql("select * from dates where userID = ?", [currentUserID], (_, { rows: { _array } }) =>
                    {
                        resolve(_array);
                    }
                );
            });
        });
    }

    static async addDate(title, image, price) {
        let link;
        if(image) {
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
            link = response.data.data.link;
        }

        localDB.transaction((tx) => {
            tx.executeSql("insert into dates (title, image, userID, price) values (?, ?, ?, ?)", [title, link, currentUserID, price]);
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

    static async editDate(id, title, image, newImage) {
        if(newImage) {
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
            image = response.data.data.link;
        }

        localDB.transaction(
            (tx) => {
              tx.executeSql(`update dates set title = ?, image = ? where id = ?;`, [title, image, id]);
            }
        )
    }

    static async getAllDates() {
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

    static async filterByPrice(price) {
        return new Promise((resolve, reject) => {
            localDB.transaction((tx) => {
                // [currentUserID].concat(params);
                // var queryString = "select * from dates where userID = ?";
                // columns.forEach(column => queryString += " and "+column+" = ?")
                tx.executeSql("select * from dates where userID = ? and price = ?", [currentUserID, price], (_, { rows: { _array } }) =>
                    {
                        resolve(_array);
                    }
                );
            });
        });
    }
}