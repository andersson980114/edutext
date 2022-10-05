import * as data from '../Data/wordNiveles.json';

export  function createNivelTable(db){
    db.transaction((tx) =>{
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS nivel (id INTEGER PRIMARY KEY AUTOINCREMENT, Nivel  VARCHAR(128), idNivel  INTEGER, idOpcion INTEGER, Progreso INTEGER)",
            [],
            (sqlTxn, res) => {
              //  console.log("tabla Nivel creado")
            },
            error => { console.log(error)}
        )
    })
    llenar(db)
}


export function insertNivel(db, Nivel , idNivel, idOpcion , Progreso){
    db.transaction((tx) => {
        tx.executeSql(
            "INSERT INTO nivel ( Nivel , idNivel, idOpcion , Progreso)VALUES (?,?,?,?)",
            [Nivel , idNivel, idOpcion , Progreso],
            (sqlTxn, res) => {
              //  console.log("nivel ingresado")
            },
            error => {console.log("no se pudo insert nivel")}
        )
    },
    null)
}

function llenar(db){
    const nivel = data.Niveles
    
    nivel.map((item) =>{ 
            insertNivel(db, item.Nivel, item.idNivel, item.idOpcion, item.Progreso)
        }
    )
      
} 

export  function  getNivel(db, opcion, setNivels){
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
                        results.push({id: item.id, Nivel:item.Nivel, idNivel: item.idNivel, idOpcion: item.idOpcion, Progreso: item.Progreso})
                    }  
                    //console.log(results)
                    setNivels(results)
                    //return results;
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