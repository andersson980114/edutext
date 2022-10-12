import * as data from '../Data/avatars.json';

export  function createAvatarTable(db){
    db.transaction((tx) =>{
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS avatar (id INTEGER PRIMARY KEY AUTOINCREMENT,  Bloqueado BOOLEAN, Selected  BOOLEAN, Puntaje INTEGER)",
            [],
            (sqlTxn, res) => {
                //console.log("tabla Avatar creada")
            },
            error => { console.log(error)}
        )
    })
    llenar(db)
}

export function insertAvatar(db, selected, bloqueado,Puntaje){
    db.transaction((tx) => {
        tx.executeSql(
            "INSERT INTO avatar ( Selected, Bloqueado,Puntaje)VALUES (?,?,?)",
            [selected, bloqueado,Puntaje],
            (sqlTxn, res) => {
                //console.log("avatar ingresado")
            },
            error => {console.log("no se pudo insertar avatar")}
        )
    },
    null)
}

function llenar(db){
    const avatar = data.Avatars
    
    avatar.map((item) =>{
            if(item.id<2){
                insertAvatar(db, 0, 0,0)
            }else{
                insertAvatar(db, 0, 1, item.Puntaje)
            }
        }
    )
}

export  function  getAvatar(db, setAvatars){
    db.transaction((tx) => {
        tx.executeSql(
            `SELECT * FROM avatar`,
            [],
            (sqlTxn, res) => {
                //console.log("avatars obtenidos");
                let len  = res.rows.length;
                if(len > 0){
                    let results =[]
                    for(let i =0; i<len; i++){
                        let item =   res.rows.item(i);
                        //console.log(item)
                        results.push({id: item.id ,Selected: item.Selected, Bloqueado: item.Bloqueado, Puntaje: item.Puntaje})
                    }  
                    //console.log(results)
                    setAvatars(results) 
                }else{
                    console.log("no hay avatar")
                }
            },
            error => {console.log(error)}
        )
    }
    )
}

export function updateAvatar(db, id, Bloqueado){
    db.transaction((tx) => {
        tx.executeSql(
            `UPDATE avatar set  Bloqueado = '${Bloqueado}' where id = '${id}'`,
            [id],
            (sqlTxn, res) => {
                console.log("avatar alterado")
            },
            error => {console.log("no se pudo alterar avatar")}
        )
    },
    null)
}


export  function  getAvatarID(db, Puntaje, setAvatars){
    db.transaction((tx) => {
        tx.executeSql(
            `SELECT * FROM avatar where Puntaje <= '${Puntaje}' and Bloqueado= 1`,
            [],
            (sqlTxn, res) => {
                //console.log("avatars obtenidos");
                let len  = res.rows.length;
                if(len > 0){
                    let results =[]
                    for(let i =0; i<len; i++){
                        let item =   res.rows.item(i);
                        console.log(item.id, item.Bloqueado)
                        results.push({id: item.id})
                    }  
                    //console.log(results)
                    setAvatars(results) 
                }else{
                    console.log("no hay avatar puntaje y desbloqueo: ", Puntaje, 1)
                }
            },
            error => {console.log(error)}
        )
    }
    )
}

