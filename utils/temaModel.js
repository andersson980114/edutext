import * as data from '../Data/wordTemas.json';

//modelo de Tema
export  function createTemaTable(db){
    db.transaction((tx) =>{
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS tema ( id INTEGER PRIMARY KEY AUTOINCREMENT, Opcion INTEGER, Nivel INTEGER,  Nombre VARCHAR(128), Favorito Boolean,  Visto Boolean, Completado Boolean )",
            [],
            (sqlTxn, res) => {
                //console.log("tabla Tema creado")
            },
            error => { console.log(error)}
        )
    })
    llenar(db)
}

export function insertTema(db, Opcion , Nivel ,  Nombre , Favorito ,  Visto , Completado  ){
    db.transaction((tx) => {
        tx.executeSql(
            "INSERT INTO tema ( Opcion , Nivel ,  Nombre , Favorito ,  Visto , Completado  )VALUES (?,?,?,?,?,?)",
            [Opcion , Nivel ,  Nombre , Favorito ,  Visto , Completado  ],
            (sqlTxn, res) => {
               // console.log("tema ingresado")
            },
            error => {console.log("no se pudo insert tema")}
        )
    },
    null)
}

function llenar(db){
    const temas = data.Temas
    
    temas.map((item) =>{
           insertTema(db, item.Opcion , item.Nivel ,  item.Nombre , item.Favorito ,  item.Visto , item.Completado )
        }
    ) 
}

export  function  getTema(db, setTemas){
    db.transaction((tx) => {
        tx.executeSql(
            `SELECT * FROM tema `,
            [],
            (sqlTxn, res) => { 
                let len  = res.rows.length;
                if(len > 0){
                    let results =[]
                    for(let i =0; i<len; i++){
                        let item =   res.rows.item(i);
                        //console.log(item) 
                        results.push({id: item.id, Opcion: item.Opcion , Nivel: item.Nivel ,  Nombre: item.Nombre , Favorito: item.Favorito , Visto: item.Visto , Completado: item.Completado})
                    }  
                    //console.log(results) 
                    setTemas(results)
                    return results;
                }else{
                    console.log("no hay tema")
                }
            },
            error => {console.log("error")}
        )
    }
    )
}


export function updateTema(db, id,Favorito, Visto, Completado){
    //console.log("cambio");
    //console.log(id,"  - Fav:",Favorito,"  - vis:", Visto, "  - com:",Completado)
    try {
        db.transaction((tx) => {
            tx.executeSql(
                `UPDATE tema set Favorito = '${Favorito}' , 
                                 Visto = '${Visto}',
                                 Completado = '${Completado}'
                        where id = '${id}'  `,
                [],
                (sqlTxn, res) => {
                    console.log("Favorito alterado: ", Favorito, Visto, Completado)
                },
                error => {console.log("no se pudo alterar tema - Favorito")}
            )
        },
        null)
    } catch (error) {
        console.log("error update");
    } 
    
} 


export function completeTema(db, id, Completado){
    try {
        db.transaction((tx) => {
            tx.executeSql(
                `UPDATE tema set Completado = '${Completado}'
                        where id = '${id}'  `,
                [],
                (sqlTxn, res) => {
                   // console.log("Favorito Completado: ", Completado)
                },
                error => {console.log("no se pudo alterar tema - Favorito")}
            )
        },
        null)
    } catch (error) {
        console.log("error complete");
    } 
    
} 

export  function  infoTema(db, id, setInfo){
    db.transaction((tx) => {
        tx.executeSql(
            `SELECT * FROM tema `,
            [],
            (sqlTxn, res) => { 
                let len  = res.rows.length;
                if(len > 0){
                    let results =[]
                    for(let i =0; i<len; i++){
                        let item =   res.rows.item(i);
                        console.log(item) 
                        results.push({id: item.id, Opcion: item.Opcion , Nivel: item.Nivel ,  Nombre: item.Nombre , Favorito: item.Favorito , Visto: item.Visto , Completado: item.Completado})
                    }  
                    //console.log(results) 
                    setInfo(results)
                    return results;
                }else{
                    console.log("no hay Infotema")
                }
            },
            error => {console.log("error")}
        )
    }
    )
}

