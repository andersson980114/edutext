import * as SQLite from "expo-sqlite"; 
import { createAvatarTable } from "./avatarModel";
import { createContenidoTable } from "./contenidoModel";
import { createInsigniaTable } from "./insigniaModel"; 
import { createNivelTable } from "./nivelModel";
import { createTemaTable } from "./temaModel";
import { createUserTable } from "./userModel";

//Iniciar la conexión a la db
export function conectionDb(){
    const db = SQLite.openDatabase('main');
    return db;
}

export function initDb(){
    const db = conectionDb();
    createUserTable(db)
    return db
}

export function setDB(db){
    createAvatarTable(db)
    createContenidoTable(db)
    createInsigniaTable(db)
    createNivelTable(db)
    createTemaTable(db)
}