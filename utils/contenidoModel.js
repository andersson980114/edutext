export  function createContenidoTable(db){
    db.transaction((tx) =>{
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS contenido (id INTEGER PRIMARY KEY AUTOINCREMENT, Prueba Boolean, Visto Boolean)",
            [],
            (sqlTxn, res) => {
                console.log("contenido creado")
            },
            error => { console.log(error)}
        )
    })
}

export function insertContenido(db, Prueba, Visto){
    db.transaction((tx) => {
        tx.executeSql(
            "INSERT INTO contenido ( Prueba, Visto)VALUES (?,?)",
            [Prueba, Visto],
            (sqlTxn, res) => {
                console.log("contenido ingresado")
            },
            error => {console.log("no se pudo insert contenido")}
        )
    },
    null)
}

export  function  getContenido(db){
    db.transaction((tx) => {
        tx.executeSql(
            `SELECT * FROM contenido`,
            [],
            (sqlTxn, res) => {
                console.log("contenido obtenida");
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
                    console.log("no hay contenido")
                }
            },
            error => {console.log(error)}
        )
    }
    )
}

export function updateContenido(db, id, Bloqueado){
    db.transaction((tx) => {
        tx.executeSql(
            `UPDATE contenido set Bloqueado = '${Bloqueado}'   where id = '${id}'`,
            [id],
            (sqlTxn, res) => {
                console.log("contenido alterado")
            },
            error => {console.log("no se pudo alterar contenido")}
        )
    },
    null)
}