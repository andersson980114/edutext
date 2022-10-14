
import { Contenido } from '../Data/imagenes';

//modelo de contenido
export  function createContenidoTable(db){
    db.transaction((tx) =>{
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS contenido (id INTEGER PRIMARY KEY AUTOINCREMENT, Prueba Boolean, Visto Boolean)",
            [],
            (sqlTxn, res) => {
               // console.log("tabla Contenido creado")
            },
            error => { console.log(error)}
        )
    })
    llenar(db)
}

export function insertContenido(db, Prueba, Visto){
    db.transaction((tx) => {
        tx.executeSql(
            "INSERT INTO contenido ( Prueba, Visto)VALUES (?,?)",
            [Prueba, Visto],
            (sqlTxn, res) => {
               // console.log("contenido ingresado")
            },
            error => {console.log("no se pudo insert contenido")}
        )
    },
    null)
}

function llenar(db){ 
    
    Contenido.map((item) =>{
            insertContenido(db, item.Prueba, item.Visto)
        }
    )
}

export  function  getContenido(db, setContenido){
    db.transaction((tx) => {
        tx.executeSql(
            `SELECT * FROM contenido`,
            [],
            (sqlTxn, res) => {
                //console.log("contenido obtenido");
                let len  = res.rows.length;
                if(len > 0){
                    let results =[]
                    for(let i =0; i<len; i++){
                        let item =   res.rows.item(i);
                        //console.log(item)
                        results.push({id: item.id, Prueba: item.Prueba, Visto: item.Visto})
                    }  
                    //console.log(results)
                    setContenido(results)
                    return results;
                }else{
                    console.log("no hay contenido")
                }
            },
            error => {console.log(error)}
        )
    }
    )
}

export function updateContenido(db, id, Visto){
    db.transaction((tx) => {
        tx.executeSql(
            `UPDATE contenido set Visto = '${Visto}' where id = '${id}'`,
            [id],
            (sqlTxn, res) => {
                console.log("contenido alterado")
            },
            error => {console.log("no se pudo alterar contenido")}
        )
    },
    null)
}