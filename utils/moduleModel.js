import * as data from '../Data/opciones.json';

//modelo de Modulo : Word o Docs
export  function createModuleTable(db){
    db.transaction((tx) =>{
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS Modulo ( id INTEGER PRIMARY KEY AUTOINCREMENT, Visto Boolean )",
            [],
            (sqlTxn, res) => {
                //console.log("tabla Modulo creado")
            },
            error => { console.log(error)}
        )
    })
    llenar(db)
}

export function insertModulo(db,  Visto  ){
    db.transaction((tx) => {
        tx.executeSql(
            "INSERT INTO Modulo ( Visto )VALUES (?)",
            [Visto ],
            (sqlTxn, res) => {
               // console.log("Modulo ingresado")
            },
            error => {console.log("no se pudo insert Modulo")}
        )
    },
    null)
}

function llenar(db){
    const modulo = data.opciones
    
    modulo.map((item) =>{
           insertModulo(db, false )
        }
    ) 
}

export  function  getModulo(db, setModulos){
    db.transaction((tx) => {
        tx.executeSql(
            `SELECT * FROM Modulo `,
            [],
            (sqlTxn, res) => { 
                let len  = res.rows.length;
                if(len > 0){
                    let results =[]
                    for(let i =0; i<len; i++){
                        let item =   res.rows.item(i);
                        //console.log(item) 
                        results.push({id: item.id, Visto: item.Visto })
                    }  
                    //console.log(results) 
                    setModulos(results)
                    return results;
                }else{
                    console.log("no hay Modulos")
                }
            },
            error => {console.log("error")}
        )
    }
    )
}


export function updateModulo(db, id, Visto){
    //console.log("cambio Modulo");
    //console.log(id,"  - vis:", Visto)
    try {
        db.transaction((tx) => {
            tx.executeSql(
                `UPDATE Modulo set Visto = '${Visto}'
                        where id = '${id}'  `,
                [],
                (sqlTxn, res) => {
                    console.log("Modulo alterado:-------------------- ", Visto)
                },
                error => {console.log("no se pudo alterar Modulo", id, Visto)}
            )
        },
        null)
    } catch (error) {
        console.log("error update");
    } 
    
} 

 

export  function  getVisto(db, id, setVisto){
    db.transaction((tx) => {
        tx.executeSql(
            `SELECT * from Modulo
                    where id = '${id}'`,
            [],
            (sqlTxn, res) => {
                const item = res.rows.item(0)
                setVisto(item.Visto) 
                console.log(item.Visto)
                //console.log(res.rows.item(0).Nombre)
            },
            error => {console.log("no se pudo obtener el Modulo", id)}
        )
    }
    )
}


