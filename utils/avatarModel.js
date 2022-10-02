
export  function createAvatarTable(db){
    db.transaction((tx) =>{
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS avatar (id INTEGER PRIMARY KEY AUTOINCREMENT,  Bloqueado BOOLEAN, Selected  BOOLEAN)",
            [],
            (sqlTxn, res) => {
                console.log("tabla creada")
            },
            error => { console.log(error)}
        )
    })
}

export function insertAvatar(db, selected, bloqueado){
    db.transaction((tx) => {
        tx.executeSql(
            "INSERT INTO avatar ( Selected, Bloqueado)VALUES (?,?)",
            [selected, bloqueado],
            (sqlTxn, res) => {
                console.log("avatar ingresado")
            },
            error => {console.log("no se pudo insert avatar")}
        )
    },
    null)
}

export  function  getAvatar(db){
    db.transaction((tx) => {
        tx.executeSql(
            `SELECT * FROM avatar`,
            [],
            (sqlTxn, res) => {
                console.log("avatar obtenida");
                let len  = res.rows.length;
                if(len > 0){
                    let results =[]
                    for(let i =0; i<len; i++){
                        let item =   res.rows.item(i);
                        //console.log(item)
                        results.push(item)
                    }  
                    console.log(results)
                    return results;
                }else{
                    console.log("no hay avatar")
                }
            },
            error => {console.log(error)}
        )
    }
    )
}

export function updateAvatar(db, id, Selected, Bloqueado){
    db.transaction((tx) => {
        tx.executeSql(
            `UPDATE avatar set Selected = '${Selected}' Bloqueado = '${Bloqueado}' where id = '${id}'`,
            [id],
            (sqlTxn, res) => {
                console.log("avatar alterado")
            },
            error => {console.log("no se pudo alterar avatar")}
        )
    },
    null)
}