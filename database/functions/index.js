import userFunctions from './user';
import dateFunctions from './date';
import sqlUserFunctions from './sqlUser';
import sqlDateFunctions from './sqlDate';
import { Platform } from "react-native";
import * as SQLite from "expo-sqlite";

export let localDB = null;
export let currentUserID = null;
let firebaseUser = null;
export function setFirebaseUser(user) {
  firebaseUser = user;
}
export function getFirebaseUser() {
  return firebaseUser;
}

export const firebase = {
    user: userFunctions,
    date: dateFunctions
}
export const sql = {
    user: sqlUserFunctions,
    date: sqlDateFunctions,
}

export function setupLocalDatabase() {
    if (Platform.OS === "web") {
        return {
          transaction: () => {
            return {
              executeSql: () => {},
            };
          },
        };
      }
    
    localDB = SQLite.openDatabase("db.db");

    localDB.transaction((tx) => {
        // tx.executeSql(
        //     "drop table dates;"
        // );
        // tx.executeSql(
        //     "drop table users;"
        // );
        tx.executeSql(
            "create table if not exists dates (id integer primary key not null, title text, image text, userID integer, price text);"
        );
        tx.executeSql(
            "create table if not exists users (id integer primary key not null, uniqueID text);"
        );
    });

    sql.user.FindOrCreateCurrentUser().then((user) => { 
        currentUserID = user.id;
    });
}