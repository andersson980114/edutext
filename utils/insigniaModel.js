import * as data from '../Data/insignias.json';

export  function createInsigniaTable(db){
    db.transaction((tx) =>{
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS insignia (id INTEGER PRIMARY KEY AUTOINCREMENT, Bloqueado BOOLEAN, Descripcion VARCGAR(128))",
            [],
            (sqlTxn, res) => {
               // console.log("tabla Insignia creada")
            },
            error => { console.log(error)}
        )
    })
    llenar(db)
}

export function insertInsignia(db, bloqueado, Descripcion){
    db.transaction((tx) => {
        tx.executeSql(
            "INSERT INTO insignia (Bloqueado,Descripcion)VALUES (?,?)",
            [bloqueado,Descripcion],
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
                insertInsignia(db, false, item.Descripcion)

            }else{
                insertInsignia(db, true, item.Descripcion)
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
                        results.push({id:item.id, Bloqueado: item.Bloqueado, Descripcion: item.Descripcion})
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
            `UPDATE insignia set Bloqueado = '${Bloqueado}' where id = '${id}'`,
            [],
            (sqlTxn, res) => {
               // console.log("insignia alterado",id,Bloqueado )
            },
            error => {
                console.log("no se pudo alterar insignia",id,Bloqueado)
            }
        )
    },
    null)
}

export  function  getDescripcion(db, id, setDescripcion){
    db.transaction((tx) => {
        tx.executeSql(
            `SELECT * from insignia
                    where id = '${id}'`,
            [],
            (sqlTxn, res) => {
                const item = res.rows.item(0)
                setDescripcion(item.Descripcion) 
                console.log(item.Descripcion)
                //console.log(res.rows.item(0).Nombre)
            },
            error => {console.log("no se pudo obtener la descripción de la insignia", id)}
        )
    }
    )
}