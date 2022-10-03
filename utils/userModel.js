export  function createUserTable(db){
    db.transaction((tx) =>{
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT, Nombre VARCHAR(128), Apellido  VARCHAR(128), Genero VARCHAR(128))",
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
            "INSERT INTO user (Nombre, Apellido, Genero) VALUES (?,?,?)",
            [name,lastName,genero],
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
                console.log("data obtenida");
                let len  = res.rows.length;
                if(len > 0){
                    let results =[]
                    for(let i =0; i<len; i++){
                        let item =   res.rows.item(i);
                        //console.log(item)
                        setData()
                        results.push(item)
                    }  
                   
                    //console.log(results)
                    return results;
                }else{
                    //console.log("no hay data")
                }
                setData(len)
            },
            error => {console.log(error)}
        )
    }
    )
}