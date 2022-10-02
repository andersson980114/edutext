export  function createTemaTable(db){
    db.transaction((tx) =>{
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS tema (id INTEGER PRIMARY KEY AUTOINCREMENT, Favorito Boolean, Visto Boolean,  Completado Boolean)",
            [],
            (sqlTxn, res) => {
                console.log("tema creado")
            },
            error => { console.log(error)}
        )
    })
}

export function insertTema(db, Favorito, Visto, Completado){
    db.transaction((tx) => {
        tx.executeSql(
            "INSERT INTO tema ( Favorito, Visto, Completado)VALUES (?,?,?)",
            [Favorito, Visto, Completado],
            (sqlTxn, res) => {
                console.log("tema ingresado")
            },
            error => {console.log("no se pudo insert tema")}
        )
    },
    null)
}

export  function  getTema(db){
    db.transaction((tx) => {
        tx.executeSql(
            `SELECT * FROM tema`,
            [],
            (sqlTxn, res) => {
                console.log("tema obtenida");
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
                    console.log("no hay tema")
                }
            },
            error => {console.log(error)}
        )
    }
    )
}


export function updateTema(db, id,Favorito, Visto, Completado){
    db.transaction((tx) => {
        tx.executeSql(
            `UPDATE tema set Favorito = '${Favorito}' Visto = '${Visto}' Completado = '${Completado}' where id = '${id}'`,
            [id],
            (sqlTxn, res) => {
                console.log("tema alterado")
            },
            error => {console.log("no se pudo alterar tema")}
        )
    },
    null)
}