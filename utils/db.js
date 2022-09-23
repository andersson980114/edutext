//import {openDatabase} from 'react-native-sqlite-storage';
import * as SQLITE from 'expo-sqlite'
import * as FileSystem from "expo-file-system";
import {Asset} from "expo-asset";
import { useState } from "react"; 
/*
async function openDB() {
    console.log("entrando")
    const internalDbName = "dataP.db"; // Call whatever you want
    const sqlDir = FileSystem.documentDirectory + ".";
    if (!(await FileSystem.getInfoAsync(sqlDir + internalDbName)).exists) {
        await FileSystem.makeDirectoryAsync(sqlDir, {intermediates: true});
        const asset = Asset.fromModule(require("../dataP.db"));
        await FileSystem.downloadAsync(asset.uri, sqlDir + internalDbName);
    }
    this.db = SQLite.openDatabase(internalDbName);
    console.log("Direccion: ", sqlDir)
    return db;
}

async function openDatabase(pathToDatabaseFile){
    if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
      await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
    }
    await FileSystem.downloadAsync(
      Asset.fromModule(require("./")).uri,
      FileSystem.documentDirectory + '~WWW/testDB.db'
    );
    return SQLite.openDatabase('testDB.db');
  }

*/
export function conectionDb(){
    const path = './SQLite/testDB.db'
    
    var db =SQLITE.openDatabase(path);
      console.log(db)
        return db;
  
}

export function createUserTable(db){ 
    db.transaction((tx) =>{
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, Name VARCHAR(128), LastName  VARCHAR(128), Genero VARCHAR(128))"
        )
    })
}

export function initDb(){
    const db = conectionDb();
    createUserTable(db)
    return db
}

export function insertUsers(db, name, lastName, genero){
    db.transaction((tx) => {
        tx.executeSql(
            "INSERT INTO users (Name, LastName, Genero) VALUES (?,?,?)",
            [name,lastName,genero]
        )
    },
    null)
}

export function countUsers(db){  
    
    db.transaction((tx) => {
        tx.executeSql(
            "SELECT * FROM users", 
            [], 
            (tx, res) => { 
                var len = res.rows.length;
                if (len>0){
                    let resultas = [];
                    for(let i=0; i<len; i++){
                        let item = res.rows.item(i)
                        console.log(item);
                        resultas.push(item)
                    }
                    return(resultas)
                }
            }
        )
    })  
}

/*import { enablePromise, openDatabase } from "react-native-sqlite-storage";

enablePromise(true);

const DATABASE_NAME = "users.db";

export async function getDbConnection(){
    const db = await openDatabase({name: DATABASE_NAME, location: 'default'})
    console.log("db")
    return db
}

export async function createTables(db){
    const query = 
        'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, Name VARCHAR(129), LastName  VARCHAR(129), Genero VARCHAR(129))';
    return db.executeSql(query);
}

export async function initDatadabase(){
    const db = await getDbConnection();
    await createTables(db);
    db.close();
}

export async function insertUser(db, name, lastName, genero){
    const insertQuery = `INSERT INTO users (Name, LastName, Genero) values ('${name}','${lastName}','${genero}')`;
    return db.executeSql(insertQuery);
}

export async function getUsers(db){
    const query = `SELECT count (*) from users`;
    return db.executeSql(query)
}

*/
/*
import SQlite from 'react-native-sqlite-storage'

export async function conectionDb(){
    const db = SQlite.openDatabase(
        {
        main: 'usersDb',
        location: 'default'
        }, 
        () => {},
        error => {console.log(error)}
    );

    return db;
}

export async function createUserTable(db){
    db.transaction((tx) =>{
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS users (ID INTEGER PRIMARY KEY AUTOINCREMENT, Name VARCHAR(129), LastName  VARCHAR(129), Genero VARCHAR(129))"
        )
    })
}

export async function insertUsers(db, name, lastName, genero){
    db.transaction((tx) => {
        tx.executeSql(
            "INSERT INTO users (Name, LastName, Genero) VALUES (?,?,?)",
            [name,lastName,genero]
        )
    })
}
*/