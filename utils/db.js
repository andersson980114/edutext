import { enablePromise, openDatabase } from "react-native-sqlite-storage";

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