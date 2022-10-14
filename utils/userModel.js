
//modelo de Usuario
export  function createUserTable(db){
    db.transaction((tx) =>{
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT, Nombre VARCHAR(128), Apellido  VARCHAR(128), Genero VARCHAR(128), Puntaje INTEGER, Avatar INTEGER)",
            [],
            (sqlTxn, res) => {
              //  console.log("tabla User ccreada")
            },
            error => { console.log(error)}
        )
    })
}

export function insertUsers(db, name, lastName, genero, Avatar){
    db.transaction((tx) => {
        tx.executeSql(
            "INSERT INTO user (Nombre, Apellido, Genero, Puntaje, Avatar) VALUES (?,?,?,?,?)",
            [name,lastName,genero, 0,Avatar],
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
                //console.log("users obtenidos");
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

export function changeAvatar(db, Avatar){
    try {
        db.transaction((tx) => {
            tx.executeSql(
                `UPDATE user set Avatar = '${Avatar}'`,
                [],
                (sqlTxn, res) => {
                    console.log("Avatar Alterado: ", Avatar)
                },
                error => {console.log("no se pudo alterar Avatar -", Avatar)}
            )
        },
        null)
    } catch (error) {
        console.log("error complete");
    } 
    
} 

export  function  getUser(db, setUser, setAvatar, setPuntaje){
    db.transaction((tx) => {
        tx.executeSql(
            `SELECT * from user
            WHERE id = (
                SELECT MAX(id) FROM user
            )`,
            [],
            (sqlTxn, res) => {
                const item = res.rows.item(0)
                setPuntaje(item.Puntaje)
                setUser(item.Nombre)
                setAvatar(item.Avatar-1)
                console.log(item.Nombre, item.Avatar, item.Puntaje)
                //console.log(res.rows.item(0).Nombre)
            },
            error => {console.log(error)}
        )
    }
    )
}

export function updatePuntaje(db,Puntaje ){ 
    try {
        db.transaction((tx) => {
            tx.executeSql(
                `UPDATE user set Puntaje = Puntaje +'${Puntaje}' 
                         `,
                [],
                (sqlTxn, res) => {
                    console.log("Puntaje alterado: ", Puntaje)
                },
                error => {console.log("no se pudo alterar Puntaje")}
            )
        },
        null)
    } catch (error) {
        console.log("error update");
    } 
    
} 

export function  getPuntaje(db, id, setPuntaje){
    db.transaction((tx) => {
        tx.executeSql(
            `SELECT * from user`,
            [],
            (sqlTxn, res) => {
                const item = res.rows.item(0)
                setPuntaje(item.Puntaje)  
                console.log("get puntaje", item.Puntaje)
            },
            error => {console.log("no se pudo obtener el Puntaje del nivel", id)}
        )
    }
    )
}