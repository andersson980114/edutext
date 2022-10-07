import * as data from '../Data/insignias.json';

export  function createInsigniaTable(db){
    db.transaction((tx) =>{
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS insignia (id INTEGER PRIMARY KEY AUTOINCREMENT, Bloqueado BOOLEAN)",
            [],
            (sqlTxn, res) => {
               // console.log("tabla Insignia creada")
            },
            error => { console.log(error)}
        )
    })
    llenar(db)
}

export function insertInsignia(db, bloqueado){
    db.transaction((tx) => {
        tx.executeSql(
            "INSERT INTO insignia (Bloqueado)VALUES (?)",
            [bloqueado],
            (sqlTxn, res) => {
               // console.log("Insignia ingresada")
            },
            error => {console.log("no se pudo insertar insignia")}
        )
    },
    null)
}

function llenar(db){
    const insignia = data.Insignias
    
    insignia.map((item) =>{
            if(item.id<1){
                insertInsignia(db, 0)

            }else{
                insertInsignia(db, 1)
            }
        }
    )
}

export  function  getInsignia(db, setInsignias){
    db.transaction((tx) => {
        tx.executeSql(
            `SELECT * FROM insignia`,
            [],
            (sqlTxn, res) => {
                //console.log("Insignias obtenidas");
                let len  = res.rows.length;
                if(len > 0){
                    let results =[]
                    for(let i =0; i<len; i++){
                        let item =   res.rows.item(i);
                        //console.log(item)
                        results.push({id:item.id, Bloqueado: item.Bloqueado})
                    }  
                    //console.log(results)
                    setInsignias(results)
                     
                }else{
                    console.log("no hay Insignia")
                }
            },
            error => {console.log(error)}
        )
    }
    )
}

export function updateInsignia(db, id, Bloqueado){
    db.transaction((tx) => {
        tx.executeSql(
            `UPDATE insignia set Bloqueado = '${Bloqueado}'   where id = '${id}'`,
            [id],
            (sqlTxn, res) => {
                //console.log("insignia alterado")
            },
            error => {console.log("no se pudo alterar insignia")}
        )
    },
    null)
}