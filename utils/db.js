import { enablePromise, openDatabase } from "react-native-sqlite-storage";

enablePromise(true);

const DATABASE_NAME = "task.db";

export async function getDbConnection(){
    const db = await openDatabase({name: DATABASE_NAME, location: 'default'})
    return db
}

export async function createTables(db){
    const query = 
        'CREATE TABLE IF NOT EXISTS users (ID INTEGER PRIMARY KEY AUTOINCREMENT, Name VARCHAR(129), LastName  VARCHAR(129), Genero INTEGER)';
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