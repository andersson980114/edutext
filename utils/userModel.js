export  function createUserTable(db){
    db.transaction((tx) =>{
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT, Nombre VARCHAR(128), Apellido  VARCHAR(128), Genero VARCHAR(128), Puntaje INTEGER)",
            [],
            (sqlTxn, res) => {
              //  console.log("tabla User ccreada")
            },
            error => { console.log(error)}
        )
    })
}

export function insertUsers(db, name, lastName, genero){
    db.transaction((tx) => {
        tx.executeSql(
            "INSERT INTO user (Nombre, Apellido, Genero, Puntaje) VALUES (?,?,?,?)",
            [name,lastName,genero, 0],
            (sqlTxn, res) => {
                console.log("user ingresado")
            },
            error => {console.log(error)}
        )
    },
    null)
}

export  function  getUsers(db, setData){
    db.transaction((tx) => {
        tx.executeSql(
            `SELECT * FROM user`,
            [],
            (sqlTxn, res) => {
                console.log("users obtenidos");
                let len  = res.rows.length;
                setData(len) 
                if(len > 0){
                    let results =[]
                    for(let i =0; i<len; i++){
                        let item =   res.rows.item(i);
                        //console.log(item) 
                        results.push(item)
                    }  
                   
                    //console.log(results)
                    return results;
                }else{
                    //console.log("no hay data")
                }
                
            },
            error => {console.log(error)}
        )
    }
    )
}

export  function  getUser(db, setUser){
    db.transaction((tx) => {
        tx.executeSql(
            `SELECT * from user
            WHERE id = (
                SELECT MAX(id) FROM user
            )`,
            [],
            (sqlTxn, res) => {
                setUser(res.rows.item(0).Nombre)
                console.log(res.rows.item(0).Nombre)
            },
            error => {console.log(error)}
        )
    }
    )
}