export  function createNivelTable(db){
    db.transaction((tx) =>{
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS nivel (id INTEGER PRIMARY KEY AUTOINCREMENT, Progreso INTEGER)",
            [],
            (sqlTxn, res) => {
                console.log("nivel creado")
            },
            error => { console.log(error)}
        )
    })
}


export function insertNivel(db, Progreso){
    db.transaction((tx) => {
        tx.executeSql(
            "INSERT INTO nivel ( Progreso)VALUES (?)",
            [Progreso],
            (sqlTxn, res) => {
                console.log("nivel ingresado")
            },
            error => {console.log("no se pudo insert nivel")}
        )
    },
    null)
}


export  function  getNivel(db){
    db.transaction((tx) => {
        tx.executeSql(
            `SELECT * FROM nivel`,
            [],
            (sqlTxn, res) => {
                console.log("nivel obtenida");
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
                    console.log("no hay nivel")
                }
            },
            error => {console.log(error)}
        )
    }
    )
}

export function updateNivel(db, id,Progreso){
    db.transaction((tx) => {
        tx.executeSql(
            `UPDATE nivel set Progreso = '${Progreso}' where id = '${id}'`,
            [id],
            (sqlTxn, res) => {
                console.log("nivel alterado")
            },
            error => {console.log("no se pudo alterar nivel")}
        )
    },
    null)
}